import { ItemCategory } from "model/IItem";
import { IdentifiableCake } from "../../model/Cake.model";
import { id, Initializable, IRepository } from "../../repository/IRepository";
import { DbException, InitializationException } from "../../util/exceptions/repositoryExceptions";
import logger from "../../util/logger";
import { ConnectionManager } from "./ConnectionManager";

const tableName = ItemCategory.CAKE;

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    flavor TEXT NOT NULL,
    filling TEXT NOT NULL,
    size INTEGER NOT NULL,
    layers INTEGER NOT NULL,
    frostingType TEXT NOT NULL,
    frostingFlavor TEXT NOT NULL,
    decorationType TEXT NOT NULL,
    decorationColor TEXT NOT NULL,
    customMessage TEXT NOT NULL,
    shape TEXT NOT NULL,
    allergies TEXT NOT NULL,
    specialIngredients TEXT NOT NULL,
    packagingType TEXT NOT NULL
);`;

const INSERT_CAKE = `INSERT INTO ${tableName} (id, type, flavor, filling, size, layers, frostingType, frostingFlavor, decorationType, decorationColor, customMessage, shape, allergies, specialIngredients, packagingType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

export class CakeRepository implements IRepository<IdentifiableCake>, Initializable {

    async init(): Promise<void> {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.exec(CREATE_TABLE);
            logger.info("order table initialized");
        } catch (error: unknown) {
            logger.error("Failed to initialize the order table", error as Error);
            throw new InitializationException("Failed to initialize the order table", error as Error);
        }
    }
    async create(item: IdentifiableCake): Promise<id> {
        // it is expected that a transaction has been initiated before this method is called
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.run(INSERT_CAKE, [
                item.getId(),
                item.getType(),
                item.getFlavor(),
                item.getFilling(),
                item.getSize(),
                item.getLayers(),
                item.getFrostingType(),
                item.getFrostingFlavor(),
                item.getDecorationType(),
                item.getDecorationColor(),
                item.getCustomMessage(),
                item.getShape(),
                item.getAllergies(),
                item.getSpecialIngredients(),
                item.getPackagingType()
            ]);
        } catch (error) {
            throw new DbException("Failed to create cake", error as Error);
        }
        return item.getId();

    }
    get(id: id): Promise<IdentifiableCake> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<IdentifiableCake[]> {
        throw new Error("Method not implemented.");
    }
    update(item: IdentifiableCake): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: id): Promise<void> {
        throw new Error("Method not implemented.");
    }
}



