import { CSVCakeMapper } from "../../src/mappers/Cake.mapper";
import { Cake } from '../../src/model/Cake.model';
import { mockCakeOrdersData } from '../mocks/mockData';

describe('CSVCakeMapper', () => {
    let mapper: CSVCakeMapper;

    beforeAll(() => {
        mapper = new CSVCakeMapper();
    });

    it('should correctly map a valid csv row to a Cake object', () => {
        const mockData = JSON.parse(mockCakeOrdersData);  
        const cakeRow = Object.values(mockData[0]) as string[];

        const cake = mapper.map(cakeRow);

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

    it('should throw an error if any required field is missing', () => {
        const invalidRow = [
            '1',
            'Sponge',
            'Vanilla',
            'Cream',
            '20',
            '2',
            'Buttercream',
            'Vanilla',
            'Sprinkles',
            'Multi-color',
            'Happy Birthday',
            'Round',
            'Nut-Free',
            'Organic Ingredients'
            // missing packaging type
        ];

        expect(() => mapper.map(invalidRow)).toThrow('Missing required property');
    });

    it('should throw an error for non-numeric size or layers', () => {
        const invalidRow = [
            '1',
            'Sponge',
            'Vanilla',
            'Cream',
            'twenty', // invalid number
            'two', // invalid number    
            'Buttercream',
            'Vanilla',
            'Sprinkles',
            'Multi-color',
            'Happy Birthday',
            'Round',
            'Nut-Free',
            'Organic Ingredients',
            'Standard Box'
        ];

        expect(() => mapper.map(invalidRow)).toThrow();
    });

    it('should throw an error for an empty input array', () => {
        expect(() => mapper.map([])).toThrow();
    });
});
