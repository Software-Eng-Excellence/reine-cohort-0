import logger from './util/logger';
import { CakeOrderRepository } from './repository/file/Cake.order.repository';
import config from './config';
import { Database } from 'sqlite3';
import { open } from 'sqlite';

async function main() {

    const path = config.paths.data.cakeOrders;

    const repository = new CakeOrderRepository(path);
    const cakeData = await repository.get("17");


    logger.info("List of cake orders: \n %o", cakeData);
}

async function DBSandBox() {
    const db = await open({
        filename: "src/data/orders.db",
        driver: Database
    })
    await db.exec(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            cake_type TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            order_date TEXT NOT NULL
        );
    `);

    const orders = [
        { customer_name: 'Alice', cake_type: 'Chocolate', quantity: 2, order_date: '2023-10-01' },
        { customer_name: 'Bob', cake_type: 'Vanilla', quantity: 1, order_date: '2023-10-02' },
        { customer_name: 'Charlie', cake_type: 'Red Velvet', quantity: 3, order_date: '2023-10-03' }
    ];

    for (const order of orders) {
        await db.run(
            `INSERT INTO orders (customer_name, cake_type, quantity, order_date) VALUES (?, ?, ?, ?)`,
            order.customer_name,
            order.cake_type,
            order.quantity,
            order.order_date
        );
    }

    const allOrders = await db.all(`SELECT * FROM orders`);
    logger.info("All orders: %o", allOrders);
}

//main();

DBSandBox();
