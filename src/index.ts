import { ClothingBuilder } from './model/builders/clothing.builder';
import { BookBuilder } from './model/builders/book.builder';
import { CakeBuilder } from './model/builders/cake.builder';
import { FurnitureBuilder } from './model/builders/furniture.builder';
import { PetBuilder } from './model/builders/pet.builder';
import { ToyBuilder } from './model/builders/toy.builder';

async function main() {
    try {
        const cakeBuilder = new CakeBuilder();
        const bookBuilder = new BookBuilder();
        const clothingBuilder = new ClothingBuilder();
        const furnitureBuilder = new FurnitureBuilder();
        const petBuilder = new PetBuilder();
        const toyBuilder = new ToyBuilder();

        const cake = cakeBuilder
            .setType("type")
            .setFlavor("flavor")
            .setFilling("filling")
            .setSize(10)
            .setLayers(2)
            .setFrostingType("frostingType")
            .setFrostingFlavor("frostingFlavor")
            .setDecorationType("decorationType")
            .setDecorationColor("decorationColor")
            .setCustomMessage("customMessage")
            .setShape("shape")
            .setAllergies("allergies")
            .setSpecialIngredients("specialIngredients")
            .setPackagingType("packagingType")
            .build();
        console.log(cake);

        const book = bookBuilder
            .setTitle("title")
            .setAuthor("author")
            .setGenre("genre")
            .setFormat("format")
            .setLanguage("language")
            .setPublisher("publisher")
            .setSpecialEdition("specialEdition")
            .setPackaging("packaging")
            .build();
        console.log(book);

        const clothing = clothingBuilder
            .setClothingType("type")
            .setSize("size")
            .setColor("color")
            .setMaterial("material")
            .setPattern("pattern")
            .setBrand("brand")
            .setGender("gender")
            .setPackaging("packaging")
            .setSpecialRequest("specialRequest")
            .build();
        console.log(clothing);

        const furniture = furnitureBuilder
            .setType("type")
            .setMaterial("material")
            .setColor("color")
            .setSize("size")
            .setStyle("style")
            .setAssemblyRequired(true)
            .setWarranty("warranty")
            .build();
        console.log(furniture);

        const pet = petBuilder
            .setProductType("type")
            .setPetType("pettype")
            .setBrand("brand")
            .setSize("size")
            .setFlavor("flavor")
            .setEcoFriendly("ecoFriendly")
            .build();
        console.log(pet);

        const toy = toyBuilder
            .setType("type")
            .setAgeGroup("ageGroup")
            .setBrand("brand")
            .setMaterial("material")
            .setBatteryRequired(false)
            .setEducational(false)
            .build();
        console.log(toy);
    } catch (error) {
        console.error("An error occurred while building objects:", error);
    }
}

main();