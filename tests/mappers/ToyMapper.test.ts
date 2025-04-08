import { XMLToyMapper } from "../../src/mappers/Toy.mapper";
import { Toy } from "../../src/model/Toy.model";
import { parseStringPromise } from "xml2js";
import { mockToyOrdersData } from "../mocks/mockData";

describe('XMLToyMapper', () => {
    let mapper: XMLToyMapper;

    beforeAll(() => {
        mapper = new XMLToyMapper();
    });

    it('should correctly map a valid XML object to a Toy object', async () => {
        const parsedData = await parseStringPromise(mockToyOrdersData);
        const toyData = parsedData.orders.order[0];

        const toy = mapper.map({
            Type: toyData.ProductType[0],
            AgeGroup: toyData.AgeGroup[0],
            Brand: toyData.Brand[0],
            Material: toyData.Material ? toyData.Material[0] : undefined,
            BatteryRequired: toyData.BatteryRequired ? toyData.BatteryRequired[0] : "No",
            Educational: toyData.Educational ? toyData.Educational[0] : "No"
        });

        expect(toy).toBeInstanceOf(Toy);
        expect(toy.getType()).toBe(toyData.ProductType[0]);
        expect(toy.getAgeGroup()).toBe(toyData.AgeGroup[0]);
        expect(toy.getBrand()).toBe(toyData.Brand[0]);
        expect(toy.getMaterial()).toBe(toyData.Material ? toyData.Material[0] : undefined);
        expect(toy.isBatteryRequired()).toBe(toyData.BatteryRequired ? toyData.BatteryRequired[0] === "Yes" : false);
        expect(toy.isEducational()).toBe(toyData.Educational ? toyData.Educational[0] === "Yes" : false);
    });

    it('should throw an error if any required field is missing', () => {
        const invalidData = {
            AgeGroup: "5+",
            Brand: "Marvel"
            // missing Type and other required fields
        };

        expect(() => mapper.map(invalidData)).toThrow('Missing required property');
    });

    it('should throw an error for an empty input object', () => {
        expect(() => mapper.map({})).toThrow();
    });
});
