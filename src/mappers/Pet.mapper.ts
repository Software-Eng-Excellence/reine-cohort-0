import { PetBuilder } from "../model/builders/pet.builder";
import { Pet } from "../model/Pet.model";
import { IMapper } from "./IMapper";

export class JSONPetMapper implements IMapper<{[key: string]: string}, Pet> {
    map(data: {[key: string]: string}): Pet {
        return new PetBuilder()
            .setProductType(data["Product Type"])
            .setPetType(data["Pet Type"])
            .setBrand(data["Brand"])
            .setSize(data["Size"])
            .setFlavor(data["Flavor"])
            .setEcoFriendly(data["Eco-Friendly"])
            .build();
    }
}
