import { Toy } from "../model/Toy.model";
import { IMapper } from "./IMapper";
import { ToyBuilder } from "../model/builders/toy.builder";

export class XMLToyMapper implements IMapper<{ [key: string]: string }, Toy> {
    map(data: { [key: string]: string }): Toy {
        return ToyBuilder.newBuilder()
            .setType(data["Type"])
            .setAgeGroup(data["AgeGroup"])
            .setBrand(data["Brand"])
            .setMaterial(data["Material"])
            .setBatteryRequired(data["BatteryRequired"] === "Yes")
            .setEducational(data["Educational"] === "Yes")
            .build();
    }
}
