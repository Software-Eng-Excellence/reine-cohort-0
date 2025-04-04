import { Pet } from "../Pet.model";
import logger from "../../util/logger";

export class PetBuilder {
    private productType!: string;
    private petType!: string;
    private brand!: string;
    private size!: string;
    private flavor!: string;
    private ecoFriendly!: string;

    public static newBuilder(): PetBuilder {
        return new PetBuilder();
    }

    setProductType(productType: string): PetBuilder {
        this.productType = productType;
        return this;
    }

    setPetType(petType: string): PetBuilder {
        this.petType = petType;
        return this;
    }

    setBrand(brand: string): PetBuilder {
        this.brand = brand;
        return this;
    }

    setSize(size: string): PetBuilder {
        this.size = size;
        return this;
    }

    setFlavor(flavor: string): PetBuilder {
        this.flavor = flavor;
        return this;
    }

    setEcoFriendly(ecoFriendly: string): PetBuilder { 
        this.ecoFriendly = ecoFriendly;
        return this;
    }

    build(): Pet {
        const requiredProperties = [
            this.productType,
            this.petType,
            this.brand,
            this.size,
            this.flavor,
            this.ecoFriendly
        ];

        for (const property of requiredProperties) {
            if (!property) {
                logger.error("Missing required property, could not build pet");
                throw new Error("Missing required property");
            }
        }

        return new Pet(
            this.productType,
            this.petType,
            this.brand,
            this.size,
            this.flavor,
            this.ecoFriendly
        );
    }
}
