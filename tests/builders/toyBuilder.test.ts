import { ToyBuilder } from '../../src/model/builders/toy.builder';
import { Toy } from '../../src/model/Toy.model';

describe('ToyBuilder', () => {
    let builder: ToyBuilder;

    beforeAll(() => {
        builder = new ToyBuilder();
    });

    it('should build a Toy object with all required fields', () => {
        const toy = builder
            .setType('Action Figure')
            .setAgeGroup('5+')
            .setBrand('BrandA')
            .setMaterial('Plastic')
            .setBatteryRequired(false)
            .setEducational(true)
            .build();

        expect(toy).toBeInstanceOf(Toy);
        expect(toy.getType()).toBe('Action Figure');
        expect(toy.getAgeGroup()).toBe('5+');
        expect(toy.getBrand()).toBe('BrandA');
        expect(toy.getMaterial()).toBe('Plastic');
        expect(toy.isBatteryRequired()).toBe(false);
        expect(toy.isEducational()).toBe(true);
    });

    it('should throw an error if a required field is missing', () => {
        expect(() => {
            new ToyBuilder()
                .setType('Action Figure')
                .setAgeGroup('5+')
                .setBrand('BrandA')
                .setMaterial('Plastic')
                .setBatteryRequired(false)
                .build();
        }).toThrow("Missing required property");
    });

    it('should set and retrieve properties correctly', () => {
        builder
            .setType('Action Figure')
            .setAgeGroup('5+')
            .setBrand('BrandA')
            .setMaterial('Plastic')
            .setBatteryRequired(false)
            .setEducational(true);

        expect(builder['type']).toBe('Action Figure');
        expect(builder['ageGroup']).toBe('5+');
        expect(builder['brand']).toBe('BrandA');
        expect(builder['material']).toBe('Plastic');
        expect(builder['batteryRequired']).toBe(false);
        expect(builder['educational']).toBe(true);
    });
});
