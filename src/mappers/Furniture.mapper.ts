import { Furniture } from "../model/Furniture.model";
import { IMapper } from "./IMapper";
import { FurnitureBuilder } from "../model/builders/furniture.builder";
export class XMLFurnitureMapper implements IMapper<{ [key: string]: string }, Furniture> {
    map(data: { [key: string]: string }): Furniture {
        return new FurnitureBuilder()
            .setType(data["Type"])
            .setMaterial(data["Material"])
            .setColor(data["Color"])
            .setSize(data["Size"])
            .setStyle(data["Style"])
            .setAssemblyRequired(data["AssemblyRequired"] === "Yes")
            .setWarranty(data["Warranty"])
            .build();
    }
}