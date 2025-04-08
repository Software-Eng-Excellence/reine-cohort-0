import { Initializable } from './../IRepository';
import logger from "../../util/logger";
import { config } from "../../config";
import { IOrder } from "../../model/IOrder";
import { id, IRepository } from "../../repository/IRepository";
import { Database, open } from "sqlite";
import { Init } from "v8";

export class OrderRepository implements IRepository<IOrder>, Initializable {
    private readonly CREATE_TABLE: string;

    constructor() {
        this.CREATE_TABLE = ` CREATE TABLE IF NOT EXISTS order (
            id TEXT PRIMARY KEY,
            quantity INTEGER NOT NULL,
            price INTEGER NOT NULL,
            item_category TEXT NOT NULL,
            item_id TEXT NOT NULL,
            );`;
    };

    async init() {
        const db = await open({
            filename: config.paths.sqlite,
            driver: Database
        })
        await db.exec(this.CREATE_TABLE);
        logger.info("order table initialized");
    }

    create(item: IOrder): Promise<id> {
        throw new Error("Method not implemented.");
    }
    get(id: id): Promise<IOrder> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<IOrder[]> {
        throw new Error("Method not implemented.");
    }
    update(item: IOrder): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: id): Promise<void> {
        throw new Error("Method not implemented.");
    }

}