import { OrderRepository } from './repository/sqlite/Order.repository';
import logger from './util/logger';
import { CakeOrderRepository } from './repository/file/Cake.order.repository';
import config from './config';
import { CakeRepository } from './repository/sqlite/Cake.order.repository';
import { CakeBuilder, IdentifiableCakeBuilder } from './model/builders/cake.builder';
import { IdentifiableOrderItemBuilder, OrderBuilder } from './model/builders/order.builder';

async function main() {

    const path = config.paths.data.cakeOrders;

    const repository = new CakeOrderRepository(path);
    const cakeData = await repository.get("17");


    logger.info("List of cake orders: \n %o", cakeData);
}

async function DBSandBox() {
    const dbOrder = new OrderRepository(new CakeRepository());  
    await dbOrder.init();

    // create identifiable cake
    const cake = CakeBuilder.newBuilder().setType("chocolate")
                .setFlavor("vanilla").setFilling("cream")
                .setSize(2).setLayers(2)
                .setFrostingType("buttercream")
                .setFrostingFlavor("chocolate")
                .setDecorationType("sprinkles")
                .setDecorationColor("red")
                .setCustomMessage("Happy Birthday!")
                .setShape("round").setAllergies("nuts")
                .setSpecialIngredients("none")
                .setPackagingType("box")
                .build();

    const idCake = IdentifiableCakeBuilder.newBuilder()
                .setCake(cake)
                .setId(Math.random().toString(36).substring(2, 15))
                .build();

    
    // create identifiable order
    const order = OrderBuilder.newBuilder()
                .setItem(cake)
                .setPrice(20)
                .setQuantity(2)
                .setId(Math.random().toString(36).substring(2, 15))
                .build();
    const idOrder = IdentifiableOrderItemBuilder.newBuilder()
                .setItem(idCake)
                .setOrder(order)
                .build();
    await dbOrder.create(idOrder);

    await dbOrder.delete(idOrder.getId());

    await dbOrder.update(idOrder);

    console.log((await dbOrder.getAll()).length);
}

//main();

DBSandBox().catch((error)=> logger.error("error in DBSandBox", error as Error));
