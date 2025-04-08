import logger from './util/logger';
import { CakeOrderRepository } from './repository/file/Cake.order.repository';
import config from './config';

async function main() {

    const path = config.paths.data.cakeOrders;

    const repository = new CakeOrderRepository(path);
    const cakeData = await repository.get("17");


    logger.info("List of cake orders: \n %o", cakeData);
}

main();
