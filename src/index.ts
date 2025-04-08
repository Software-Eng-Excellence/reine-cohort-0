import { readCSVFile } from './util/parsers/csvParser';
import { parseJsonFile } from './util/parsers/jsonParser';
import { parseXMLFile } from './util/parsers/xmlParser';
import { CSVCakeMapper } from './mappers/Cake.mapper';
import logger from './util/logger';
import { CSVOrderMapper, JSONOrderMapper, XMLOrderMapper } from './mappers/Order.mapper';
import { CSVClothingMapper } from './mappers/Clothing.mapper';
import config from './config';
import { JSONBookMapper } from './mappers/Book.mapper';
import { JSONPetMapper } from './mappers/Pet.mapper';
import { XMLToyMapper } from './mappers/Toy.mapper';
import { XMLFurnitureMapper } from './mappers/Furniture.mapper';


async function main() {
    //cake orders
    
    try {
        const cakeData = await readCSVFile(config.paths.data.cakeOrders);
        const cakeMapper = new CSVCakeMapper();
        const cakeOrderMapper = new CSVOrderMapper(cakeMapper);
        const cakeOrders = cakeData.map(cakeOrderMapper.map.bind(cakeOrderMapper));
        logger.info("List of cake orders: \n %o", cakeOrders);
    } catch (error) {
        logger.error("Error processing cake orders: %o", error);
    }
    // clothing orders
    try {
        const clothingData = await readCSVFile(config.paths.data.clothingOrders);
        const clothingMapper = new CSVClothingMapper();
        const clothingOrderMapper = new CSVOrderMapper(clothingMapper);
        const clothingOrders = clothingData.map(clothingOrderMapper.map.bind(clothingOrderMapper));
        logger.info("List of clothing orders: \n %o", clothingOrders);
    } catch (error) {
        logger.error("Error processing clothing orders: %o", error);
    }
    // books orders
    try {
        const clothingData = await parseJsonFile<{ [key: string]: string }[]>(config.paths.data.bookOrders);
        const bookMapper = new JSONBookMapper();
        const bookOrderMapper = new JSONOrderMapper(bookMapper);
        const bookOrders = clothingData.map(bookOrderMapper.map.bind(bookOrderMapper));
        logger.info("List of book orders: \n %o", bookOrders);
    } catch (error) {
        logger.error("Error processing book orders: %o", error);
    }
    // pet orders
    try {
        const petData = await parseJsonFile<{ [key: string]: string }[]>(config.paths.data.petOrders);
        const petMapper = new JSONPetMapper();
        const petOrderMapper = new JSONOrderMapper(petMapper);
        const petOrders = petData.map(petOrderMapper.map.bind(petOrderMapper));
        logger.info("List of pets: \n %o", petOrders);
    } catch (error) {
        logger.error("Error processing pet orders: %o", error);
    }
    // toy orders
    try {
        const toyData = await parseXMLFile<{ data: { row: { [key: string]: string }[] } }>(config.paths.data.toyOrders);
        const rows = toyData.data.row;
        const toyMapper = new XMLToyMapper();
        const toyOrderMapper = new XMLOrderMapper(toyMapper);
    
        const toyOrders = rows.map((row) => toyOrderMapper.map(row));
        logger.info("List of toy orders: \n %o", toyOrders);
    } catch (error) {
        logger.error("Error processing toy orders: %o", error);
    }

    // furniture orders
    try {
        const furnitureData = await parseXMLFile<{ data: { row: { [key: string]: string }[] } }>(config.paths.data.furnitureOrders);
        const rows = furnitureData.data.row;
        const furnitureMapper = new XMLFurnitureMapper();
        const furnitureOrderMapper = new XMLOrderMapper(furnitureMapper);

        const furnitureOrders = rows.map((row) => furnitureOrderMapper.map(row));
        logger.info("List of furniture orders: \n %o", furnitureOrders);
    } catch (error) {
        logger.error("Error processing furniture orders: %o", error);
    }
}

main();
