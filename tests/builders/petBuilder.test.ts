import { PetBuilder } from '../../src/model/builders/pet.builder';
import { Pet } from '../../src/model/Pet.model';

describe('PetBuilder', () => {
    let builder: PetBuilder;

    beforeAll(() => {
        builder = new PetBuilder();
    });

    it('should build a Pet object with all required fields', () => {
        const pet = builder
            .setProductType('Food')
            .setPetType('Dog')
            .setBrand('BrandA')
            .setSize('Large')
            .setFlavor('Chicken')
            .setEcoFriendly('Yes')
            .build();

        expect(pet).toBeInstanceOf(Pet);
        expect(pet.getProductType()).toBe('Food');
        expect(pet.getPetType()).toBe('Dog');
        expect(pet.getBrand()).toBe('BrandA');
        expect(pet.getSize()).toBe('Large');
        expect(pet.getFlavor()).toBe('Chicken');
        expect(pet.getEcoFriendly()).toBe('Yes');
    });

    it('should throw an error if a required field is missing', () => {
        expect(() => {
            new PetBuilder()
                .setProductType('Food')
                .setPetType('Dog')
                .setBrand('BrandA')
                .setSize('Large')
                .setFlavor('Chicken')
                .build();
        }).toThrow("Missing required property");
    });

    it('should set and retrieve properties correctly', () => {
        builder
            .setProductType('Food')
            .setPetType('Dog')
            .setBrand('BrandA')
            .setSize('Large')
            .setFlavor('Chicken')
            .setEcoFriendly('Yes');

        expect(builder['productType']).toBe('Food');
        expect(builder['petType']).toBe('Dog');
        expect(builder['brand']).toBe('BrandA');
        expect(builder['size']).toBe('Large');
        expect(builder['flavor']).toBe('Chicken');
        expect(builder['ecoFriendly']).toBe('Yes');
    });
});
