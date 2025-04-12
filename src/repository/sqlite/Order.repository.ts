import { id, Initializable } from './../IRepository';
import logger from "../../util/logger";
import { IIdentifiableOrderItem } from "../../model/IOrder";
import { IRepository } from "../../repository/IRepository";
import { DbException, InitializationException } from 'util/exceptions/repositoryExceptions';
import { ConnectionManager } from './ConnectionManager';
import { IIdentifiableItem } from 'model/IItem';

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS order (
    id TEXT PRIMARY KEY,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    item_category TEXT NOT NULL,
    item_id TEXT NOT NULL
);`;

const INSERT_ORDER = `INSERT INTO order (id, quantity, price, item_category, item_id) VALUES (?, ?, ?, ?, ?);`;

export class OrderRepository implements IRepository<IIdentifiableOrderItem>, Initializable {
    constructor(private readonly itemRepository: IRepository<IIdentifiableItem> & Initializable) {}

    async init() {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.exec(CREATE_TABLE);
            this.itemRepository.init();
            logger.info("order table initialized");
        } catch (error: unknown) {
            logger.error("Failed to initialize the order table", error as Error);
            throw new InitializationException("Failed to initialize the order table", error as Error);
        }
    }

    async create(order: IIdentifiableOrderItem): Promise<id> {
        let conn;
        try {
            conn = await ConnectionManager.getConnection(); 
            conn.exec("BEGIN TRANSACTION;");
            const item_id = await this.itemRepository.create(order.getItem());
            conn.run(INSERT_ORDER, [
                order.getId(),
                order.getQuantity(),
                order.getPrice(),
                order.getItem().getCategory(),
                item_id
            ]);
            conn.exec("COMMIT;");
            return order.getId();
        } catch (error: unknown) {
            logger.error("Failed to create order", error as Error);
            conn && conn.exec("ROLLBACK;");
            throw new DbException("Failed to create order", error as Error);
        }
    }

    get(id: id): Promise<IIdentifiableOrderItem> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<IIdentifiableOrderItem[]> {
        throw new Error("Method not implemented.");
    }

    update(item: IIdentifiableOrderItem): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(id: id): Promise<void> {
        throw new Error("Method not implemented.");
    }
}