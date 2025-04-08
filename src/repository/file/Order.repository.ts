import { InvalidItemException, ItemNotFoundException } from '../../util/exceptions/repositoryExceptions';
import { id, IRepository } from '../IRepository';
import logger from '../../util/logger';
import { IOrder } from '../../model/IOrder';


export abstract class OrderRepository implements IRepository<IOrder> {

    protected abstract load(): Promise<IOrder[]>;
    protected abstract save(orders: IOrder[]): Promise<void>;


    async create(item: IOrder): Promise<id> {
        // validate the order
        if (!item) {
            throw new InvalidItemException("order cannot be null");
        }
        // load all orders
        const orders = await this.load();
        // add a new order
        orders.push(item);
        // retrieve the ID from the item
        const id = item.getId();
        // save all orders
        await this.save(orders);
        logger.info("successfully created order of id %s", id);
        return id;
    }
    async get(id: string): Promise<IOrder> {
        const orders = await this.load();
        const foundOrder = orders.find(o => o.getId() === id);
        if (!foundOrder) {
            logger.error("failed to find order of id %s", id);
            throw new ItemNotFoundException("failed to find the element");
        }
        logger.info("found item of id %s", id);
        return foundOrder;
    }
    async getAll(): Promise<IOrder[]> {
        const orders = await this.load();
        logger.error("retrieving %d elements", orders.length);
        return orders;
    }
    async update(item: IOrder): Promise<void> {
        if (!item) {
            logger.error("order cannot be null");
            throw new InvalidItemException("order cannot be null");
        }
        const orders = await this.load();
        const index = orders.findIndex(o => o.getId() === item.getId());
        if (index === -1) {
            logger.error("failed to find order of id %s", item.getId());
            throw new ItemNotFoundException("failed to find the element");
        }
        orders[index] = item;
        await this.save(orders);
        logger.info("successfully updated order of id %s", item.getId());
    }
    async delete(id: string): Promise<void> {
        const orders = await this.load();
        const index = orders.findIndex(o => o.getId() === id);
        if (index === -1) {
            logger.error("failed to find order of id %s", id);
            throw new ItemNotFoundException("failed to find the element");
        }
        orders.splice(index, 1);
        await this.save(orders);
        logger.info("successfully deleted order of id %s", id);
    }

}