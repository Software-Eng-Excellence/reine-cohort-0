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

    setType(type: string): FurnitureBuilder {
        this.type = type;
        return this;
    }

    setMaterial(material: string): FurnitureBuilder {
        this.material = material;
        return this;
    }

    setColor(color: string): FurnitureBuilder {
        this.color = color;
        return this;
    }

    setSize(size: string): FurnitureBuilder {
        this.size = size;
        return this;
    }

    setStyle(style: string): FurnitureBuilder {
        this.style = style;
        return this;
    }

    setAssemblyRequired(assemblyRequired: boolean): FurnitureBuilder {
        this.assemblyRequired = assemblyRequired;
        return this;
    }

    setWarranty(warranty: string): FurnitureBuilder {
        this.warranty = warranty;
        return this;
    }

    build(): Furniture {
        const requiredProperties = [
            this.type,
            this.material,
            this.color,
            this.size,
            this.style,
            this.assemblyRequired,
            this.warranty
        ];

        for (const property of requiredProperties) {
            if (!property) {
                logger.error("Missing required property, could not build Furniture");
                throw new Error("Missing required property");
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
