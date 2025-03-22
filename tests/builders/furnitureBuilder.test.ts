import { FurnitureBuilder } from '../../src/model/builders/furniture.builder';
import { Furniture } from '../../src/model/Furniture.model';

describe('FurnitureBuilder', () => {
    let builder: FurnitureBuilder;

    beforeAll(() => {
        builder = new FurnitureBuilder();
    });

    it('should build a Furniture object with all required fields', () => {
        const furniture = builder
            .setType('Chair')
            .setMaterial('Wood')
            .setColor('Brown')
            .setSize('Large')
            .setStyle('Modern')
            .setAssemblyRequired(true)
            .setWarranty('2 years')
            .build();

        expect(furniture).toBeInstanceOf(Furniture);
        expect(furniture.getType()).toBe('Chair');
        expect(furniture.getMaterial()).toBe('Wood');
        expect(furniture.getColor()).toBe('Brown');
        expect(furniture.getSize()).toBe('Large');
        expect(furniture.getStyle()).toBe('Modern');
        expect(furniture.isAssemblyRequired()).toBe(true);
        expect(furniture.getWarranty()).toBe('2 years');
    });

    it('should throw an error if a required field is missing', () => {
        expect(() => {
            new FurnitureBuilder()
                .setType('Chair')
                .setMaterial('Wood')
                .setColor('Brown')
                .setSize('Large')
                .setStyle('Modern')
                .setAssemblyRequired(true)
                .build();
        }).toThrow("Missing required property");
    });

    it('should set and retrieve properties correctly', () => {
        builder
            .setType('Chair')
            .setMaterial('Wood')
            .setColor('Brown')
            .setSize('Large')
            .setStyle('Modern')
            .setAssemblyRequired(true)
            .setWarranty('2 years');

        expect(builder['type']).toBe('Chair');
        expect(builder['material']).toBe('Wood');
        expect(builder['color']).toBe('Brown');
        expect(builder['size']).toBe('Large');
        expect(builder['style']).toBe('Modern');
        expect(builder['assemblyRequired']).toBe(true);
        expect(builder['warranty']).toBe('2 years');
    });
});
