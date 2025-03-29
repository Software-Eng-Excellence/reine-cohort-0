// import { ClothingBuilder } from './model/builders/clothing.builder';
// import { BookBuilder } from './model/builders/book.builder';
// import { CakeBuilder } from './model/builders/cake.builder';
// import { FurnitureBuilder } from './model/builders/furniture.builder';
// import { PetBuilder } from './model/builders/pet.builder';
// import { ToyBuilder } from './model/builders/toy.builder';
import { readCSVFile } from './util/parsers/csvParser';
import { CSVCakeMapper } from './mappers/Cake.mapper';
import logger from './util/logger';
import { CSVOrderMapper } from './mappers/Order.mapper';

async function main() {
    const data = await readCSVFile("src/data/cake orders.csv");
    const cakeMapper = new CSVCakeMapper();
    const orderMapper = new CSVOrderMapper(cakeMapper);
    const orders = data.map(orderMapper.map.bind(orderMapper));

    logger.info("List of orders: \n %o", orders);

    // const book = bookBuilder
    //     .setTitle("title")
    //     .setAuthor("author")
    //     .setGenre("genre")
    //     .setFormat("format")
    //     .setLanguage("language")
    //     .setPublisher("publisher")
    //     .setSpecialEdition("specialEdition")
    //     .setPackaging("packaging")
    //     .build();
    // console.log(book);

    // const clothing = clothingBuilder
    //     .setClothingType("type")
    //     .setSize("size")
    //     .setColor("color")
    //     .setMaterial("material")
    //     .setPattern("pattern")
    //     .setBrand("brand")
    //     .setGender("gender")
    //     .setPackaging("packaging")
    //     .setSpecialRequest("specialRequest")
    //     .build();
    // console.log(clothing);

    // const furniture = furnitureBuilder
    //     .setType("type")
    //     .setMaterial("material")
    //     .setColor("color")
    //     .setSize("size")
    //     .setStyle("style")
    //     .setAssemblyRequired(true)
    //     .setWarranty("warranty")
    //     .build();
    // console.log(furniture);

    // const pet = petBuilder
    //     .setProductType("type")
    //     .setPetType("pettype")
    //     .setBrand("brand")
    //     .setSize("size")
    //     .setFlavor("flavor")
    //     .setEcoFriendly("ecoFriendly")
    //     .build();
    // console.log(pet);

    // const toy = toyBuilder
    //     .setType("type")
    //     .setAgeGroup("ageGroup")
    //     .setBrand("brand")
    //     .setMaterial("material")
    //     .setBatteryRequired(false)
    //     .setEducational(false)
    //     .build();
    // console.log(toy);
}
main();