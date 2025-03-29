import { IItem, ItemCategory } from "./IItem";

export class Furniture implements IItem {
    type: string;
    material: string;
    color: string;
    size: string;
    style: string;
    assemblyRequired: boolean;
    warranty: string;

    constructor(
        type: string,
        material: string,
        color: string,
        size: string,
        style: string,
        assemblyRequired: boolean,
        warranty: string
    ) {
        this.type = type;
        this.material = material;
        this.color = color;
        this.size = size;
        this.style = style;
        this.assemblyRequired = assemblyRequired;
        this.warranty = warranty;
    }

    getCategory(): ItemCategory {
        return ItemCategory.FURNITURE;
    }

    getType(): string {
        return this.type;
    }

    getMaterial(): string {
        return this.material;
    }

    getColor(): string {
        return this.color;
    }

    getSize(): string {
        return this.size;
    }

    getStyle(): string {
        return this.style;
    }

    isAssemblyRequired(): boolean {
        return this.assemblyRequired;
    }

    getWarranty(): string {
        return this.warranty;
    }
}