import { ClothingBuilder } from '../../src/model/builders/clothing.builder';
import { Clothing } from '../../src/model/Clothing.model';

describe('ClothingBuilder', () => {
    let builder: ClothingBuilder;

    beforeAll(() => {
        builder = new ClothingBuilder();
    });

    it('should build a Clothing object with all required fields', () => {
        const clothing = builder
            .setClothingType('Shirt')
            .setSize('M')
            .setColor('Blue')
            .setMaterial('Cotton')
            .setPattern('Solid')
            .setBrand('BrandA')
            .setGender('Unisex')
            .setPackaging('Plastic Bag')
            .setSpecialRequest('None')
            .build();

        expect(clothing).toBeInstanceOf(Clothing);
        expect(clothing.getClothingType()).toBe('Shirt');
        expect(clothing.getSize()).toBe('M');
        expect(clothing.getColor()).toBe('Blue');
        expect(clothing.getMaterial()).toBe('Cotton');
        expect(clothing.getPattern()).toBe('Solid');
        expect(clothing.getBrand()).toBe('BrandA');
        expect(clothing.getGender()).toBe('Unisex');
        expect(clothing.getPackaging()).toBe('Plastic Bag');
        expect(clothing.getSpecialRequest()).toBe('None');
    });

    it('should throw an error if a required field is missing', () => {
        expect(() => {
            new ClothingBuilder()
                .setClothingType('Shirt')
                .setSize('M')
                .setColor('Blue')
                .setMaterial('Cotton')
                .setPattern('Solid')
                .setBrand('BrandA')
                .setGender('Unisex')
                .setPackaging('Plastic Bag')
                .build();
        }).toThrow("Missing required property");
    });

    it('should set and retrieve properties correctly', () => {
        builder
            .setClothingType('Shirt')
            .setSize('M')
            .setColor('Blue')
            .setMaterial('Cotton')
            .setPattern('Solid')
            .setBrand('BrandA')
            .setGender('Unisex')
            .setPackaging('Plastic Bag')
            .setSpecialRequest('None');

        expect(builder['clothingType']).toBe('Shirt');
        expect(builder['size']).toBe('M');
        expect(builder['color']).toBe('Blue');
        expect(builder['material']).toBe('Cotton');
        expect(builder['pattern']).toBe('Solid');
        expect(builder['brand']).toBe('BrandA');
        expect(builder['gender']).toBe('Unisex');
        expect(builder['packaging']).toBe('Plastic Bag');
        expect(builder['specialRequest']).toBe('None');
    });
});
