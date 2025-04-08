import { CSVClothingMapper } from "../../src/mappers/Clothing.mapper";
import { Clothing } from '../../src/model/Clothing.model';
import { mockClothingOrdersData } from '../mocks/mockData';

describe('CSVClothingMapper', () => {
    let mapper: CSVClothingMapper;

    beforeAll(() => {
        mapper = new CSVClothingMapper();
    });

    it('should correctly map a valid csv row to a Clothing object', () => {
        const clothingRow = JSON.parse(mockClothingOrdersData)[0];

        const clothing = mapper.map([
            clothingRow["Order ID"],
            clothingRow["Clothing Type"],
            clothingRow["Size"],
            clothingRow["Color"],
            clothingRow["Material"],
            clothingRow["Pattern"],
            clothingRow["Brand"],
            clothingRow["Gender"],
            clothingRow["Packaging"],
            clothingRow["Special Request"]
        ]);

        expect(clothing).toBeInstanceOf(Clothing);
        expect(clothing.getClothingType()).toBe(clothingRow["Clothing Type"]);
        expect(clothing.getSize()).toBe(clothingRow["Size"]);
        expect(clothing.getColor()).toBe(clothingRow["Color"]);
        expect(clothing.getMaterial()).toBe(clothingRow["Material"]);
        expect(clothing.getPattern()).toBe(clothingRow["Pattern"]);
        expect(clothing.getBrand()).toBe(clothingRow["Brand"]);
        expect(clothing.getGender()).toBe(clothingRow["Gender"]);
        expect(clothing.getPackaging()).toBe(clothingRow["Packaging"]);
        expect(clothing.getSpecialRequest()).toBe(clothingRow["Special Request"]);
    });

    it('should throw an error if any required field is missing', () => {
        const clothingRow = JSON.parse(mockClothingOrdersData)[0];
        const invalidRow = [
            clothingRow["Order ID"],
            clothingRow["Clothing Type"],
            clothingRow["Size"],
            clothingRow["Color"],
            clothingRow["Material"],
            clothingRow["Pattern"],
            clothingRow["Brand"],
            clothingRow["Gender"],
            clothingRow["Packaging"]
            // missing special request
        ];

        expect(() => mapper.map(invalidRow)).toThrow('Missing required property');
    });

    it('should throw an error for an empty input array', () => {
        expect(() => mapper.map([])).toThrow();
    });
});
