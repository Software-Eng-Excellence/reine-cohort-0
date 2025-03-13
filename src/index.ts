import config from "./config";
import logger from "./util/logger";
import { readCSVFile } from "./util/parsers/csvParser";
import { JsonParser } from "./util/parsers/jsonParser";
import { parseXMLFile } from "./util/parsers/xmlParser";
import { BookOrder, PetOrder } from "./types/orderTypes";

const { cakeOrders, bookOrders, petOrders, furnitureOrders, toyOrders } = config.paths.data;

async function fetchOrdersFromFile<T>(filePath: string, parser: (filePath: string) => Promise<T>) {
    const orders = await parser(filePath);
    if (Array.isArray(orders)) {
        orders.forEach((order) => logger.info(JSON.stringify(order, null, 2)));
    } else {
        logger.info(JSON.stringify(orders, null, 2));
    }
}

async function fetchAllOrders() {
    await fetchOrdersFromFile(cakeOrders, readCSVFile);
    await fetchOrdersFromFile(bookOrders, JsonParser.parseJsonFile<BookOrder[]>);
    await fetchOrdersFromFile(petOrders, JsonParser.parseJsonFile<PetOrder[]>);
    await fetchOrdersFromFile(furnitureOrders, parseXMLFile);
    await fetchOrdersFromFile(toyOrders, parseXMLFile);
}

fetchAllOrders();

