import { CakeBuilder } from '../../src/model/builders/cake.builder';
import { Cake } from '../../src/model/Cake.model';

describe('CakeBuilder', () => {
    let builder: CakeBuilder;

    beforeAll(() => {
        builder = new CakeBuilder();
    });

    it('should build a Cake object with all required fields', () => {
        const cake = builder
            .setType('Sponge')
            .setFlavor('Vanilla')
            .setFilling('Cream')
            .setSize(20)
            .setLayers(2)
            .setFrostingType('Buttercream')
            .setFrostingFlavor('Vanilla')
            .setDecorationType('Sprinkles')
            .setDecorationColor('Multi-color')
            .setCustomMessage('Happy Birthday')
            .setShape('Round')
            .setAllergies('Nut-Free')
            .setSpecialIngredients('Organic Ingredients')
            .setPackagingType('Standard Box')
            .build();

        expect(cake).toBeInstanceOf(Cake);
        expect(cake.getType()).toBe('Sponge');
        expect(cake.getFlavor()).toBe('Vanilla');
        expect(cake.getFilling()).toBe('Cream');
        expect(cake.getSize()).toBe(20);
        expect(cake.getLayers()).toBe(2);
        expect(cake.getFrostingType()).toBe('Buttercream');
        expect(cake.getFrostingFlavor()).toBe('Vanilla');
        expect(cake.getDecorationType()).toBe('Sprinkles');
        expect(cake.getDecorationColor()).toBe('Multi-color');
        expect(cake.getCustomMessage()).toBe('Happy Birthday');
        expect(cake.getShape()).toBe('Round');
        expect(cake.getAllergies()).toBe('Nut-Free');
        expect(cake.getSpecialIngredients()).toBe('Organic Ingredients');
        expect(cake.getPackagingType()).toBe('Standard Box');
    });

    it('should throw an error if a required field is missing', () => {
        expect(() => {
            new CakeBuilder()
                .setFlavor('Vanilla')
                .setFilling('Cream')
                .setSize(20)
                .setLayers(2)
                .setFrostingType('Buttercream')
                .setFrostingFlavor('Vanilla')
                .setDecorationType('Sprinkles')
                .setDecorationColor('Multi-color')
                .setCustomMessage('Happy Birthday')
                .setShape('Round')
                .setAllergies('Nut-Free')
                .setSpecialIngredients('Organic Ingredients')
                .setPackagingType('Standard Box')
                .build(); // This must throw an error
        }).toThrow("Missing required property");
    });

    it('should set and retrieve properties correctly', () => {
        builder
            .setType('Sponge')
            .setFlavor('Vanilla')
            .setFilling('Cream')
            .setSize(20)
            .setLayers(2)
            .setFrostingType('Buttercream')
            .setFrostingFlavor('Vanilla')
            .setDecorationType('Sprinkles')
            .setDecorationColor('Multi-color')
            .setCustomMessage('Happy Birthday')
            .setShape('Round')
            .setAllergies('Nut-Free')
            .setSpecialIngredients('Organic Ingredients')
            .setPackagingType('Standard Box');

        expect(builder['type']).toBe('Sponge');
        expect(builder['flavor']).toBe('Vanilla');
        expect(builder['filling']).toBe('Cream');
        expect(builder['size']).toBe(20);
        expect(builder['layers']).toBe(2);
        expect(builder['frostingType']).toBe('Buttercream');
        expect(builder['frostingFlavor']).toBe('Vanilla');
        expect(builder['decorationType']).toBe('Sprinkles');
        expect(builder['decorationColor']).toBe('Multi-color');
        expect(builder['customMessage']).toBe('Happy Birthday');
        expect(builder['shape']).toBe('Round');
        expect(builder['allergies']).toBe('Nut-Free');
        expect(builder['specialIngredients']).toBe('Organic Ingredients');
        expect(builder['packagingType']).toBe('Standard Box');
    });
});
