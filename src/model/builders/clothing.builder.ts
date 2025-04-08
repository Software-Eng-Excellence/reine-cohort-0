import logger from "../../util/logger";
import { Clothing } from "../Clothing.model";

export class ClothingBuilder {
    private clothingType!: string;
    private size!: string;
    private color!: string;
    private material!: string;
    private pattern!: string;
    private brand!: string;
    private gender!: string;
    private packaging!: string;
    private specialRequest!: string;

    public static newBuilder(): ClothingBuilder {
        return new ClothingBuilder();
    }

    setClothingType(clothingType: string): ClothingBuilder {
        this.clothingType = clothingType;
        return this;
    }

    setSize(size: string): ClothingBuilder {
        this.size = size;
        return this;
    }

    setColor(color: string): ClothingBuilder {
        this.color = color;
        return this;
    }

    setMaterial(material: string): ClothingBuilder {
        this.material = material;
        return this;
    }

    setPattern(pattern: string): ClothingBuilder {
        this.pattern = pattern;
        return this;
    }

    setBrand(brand: string): ClothingBuilder {
        this.brand = brand;
        return this;
    }

    setGender(gender: string): ClothingBuilder {
        this.gender = gender;
        return this;
    }

    setPackaging(packaging: string): ClothingBuilder {
        this.packaging = packaging;
        return this;
    }

    setSpecialRequest(specialRequest: string): ClothingBuilder {
        this.specialRequest = specialRequest;
        return this;
    }

    build(): Clothing {

        const requiredProperties = [
            this.clothingType,
            this.size,
            this.color,
            this.material,
            this.pattern,
            this.brand,
            this.gender,
            this.packaging,
            this.specialRequest
        ];

        for (const property of requiredProperties) {
            if (!property) {
                logger.error("Missing required property, could not build Clothing");
                throw new Error("Missing required property");
            }
        }

        return new Clothing(
            this.clothingType,
            this.size,
            this.color,
            this.material,
            this.pattern,
            this.brand,
            this.gender,
            this.packaging,
            this.specialRequest
        );
    }
}
