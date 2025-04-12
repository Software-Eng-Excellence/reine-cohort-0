import { OrderRepository } from './repository/sqlite/Order.repository';
import logger from './util/logger';
import { CakeOrderRepository } from './repository/file/Cake.order.repository';
import config from './config';
import { CakeRepository } from './repository/sqlite/Cake.order.repository';

async function main() {

    const path = config.paths.data.cakeOrders;

    const repository = new CakeOrderRepository(path);
    const cakeData = await repository.get("17");


    logger.info("List of cake orders: \n %o", cakeData);
}

async function DBSandBox() {
    const dbOrder = new OrderRepository(new CakeRepository());  
    dbOrder.init();

    // create identifiable cake

    // create identifiable order
    
}

//main();

DBSandBox();
