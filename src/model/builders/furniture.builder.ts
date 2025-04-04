import { Furniture } from "../Furniture.model";
import logger from "../../util/logger";

export class FurnitureBuilder {
    private type!: string;
    private material!: string;
    private color!: string;
    private size!: string;
    private style!: string;
    private assemblyRequired!: boolean;
    private warranty!: string;

    public static newBuilder(): FurnitureBuilder {
        return new FurnitureBuilder();
    }

    public setType(type: string): FurnitureBuilder {
        this.type = type;
        return this;
    }

    public setMaterial(material: string): FurnitureBuilder {
        this.material = material;
        return this;
    }

    public setColor(color: string): FurnitureBuilder {
        this.color = color;
        return this;
    }

    public setSize(size: string): FurnitureBuilder {
        this.size = size;
        return this;
    }

    public setStyle(style: string): FurnitureBuilder {
        this.style = style;
        return this;
    }

    public setAssemblyRequired(assemblyRequired: boolean): FurnitureBuilder {
        this.assemblyRequired = assemblyRequired;
        return this;
    }

    public setWarranty(warranty: string): FurnitureBuilder {
        this.warranty = warranty;
        return this;
    }

    public build(): Furniture {
        const requiredProperties = {
            type: this.type,
            material: this.material,
            color: this.color,
            size: this.size,
            style: this.style,
            assemblyRequired: this.assemblyRequired,
            warranty: this.warranty,
        };

        for (const [key, value] of Object.entries(requiredProperties)) {
            if (value === undefined || value === null) {
                logger.error(`Missing required property: ${key}`);
                throw new Error(`Missing required property: ${key}`);
            }
        }

        return new Furniture(
            this.type,
            this.material,
            this.color,
            this.size,
            this.style,
            this.assemblyRequired,
            this.warranty
        );
    }
}
