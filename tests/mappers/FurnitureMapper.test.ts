import { XMLFurnitureMapper } from "../../src/mappers/Furniture.mapper";
import { Furniture } from "../../src/model/Furniture.model";
import { parseStringPromise } from "xml2js";
import { mockFurnitureOrdersData } from "../mocks/mockData";

describe('XMLFurnitureMapper', () => {
    let mapper: XMLFurnitureMapper;

    beforeAll(() => {
        mapper = new XMLFurnitureMapper();
    });

    it('should correctly map a valid XML object to a Furniture object', async () => {
        const parsedData = await parseStringPromise(mockFurnitureOrdersData);
        const furnitureData = parsedData.orders.order[0];

        const furniture = mapper.map({
            Type: furnitureData.ProductType[0],
            Material: furnitureData.Material[0],
            Color: furnitureData.Color[0],
            Size: furnitureData.Size ? furnitureData.Size[0] : undefined,
            Style: furnitureData.Style ? furnitureData.Style[0] : undefined,
            AssemblyRequired: furnitureData.AssemblyRequired ? furnitureData.AssemblyRequired[0] : "No",
            Warranty: furnitureData.Warranty ? furnitureData.Warranty[0] : undefined
        });

        expect(furniture).toBeInstanceOf(Furniture);
        expect(furniture.getType()).toBe(furnitureData.ProductType[0]);
        expect(furniture.getMaterial()).toBe(furnitureData.Material[0]);
        expect(furniture.getColor()).toBe(furnitureData.Color[0]);
        expect(furniture.getSize()).toBe(furnitureData.Size ? furnitureData.Size[0] : undefined);
        expect(furniture.getStyle()).toBe(furnitureData.Style ? furnitureData.Style[0] : undefined);
        expect(furniture.isAssemblyRequired()).toBe(furnitureData.AssemblyRequired ? furnitureData.AssemblyRequired[0] === "Yes" : false);
        expect(furniture.getWarranty()).toBe(furnitureData.Warranty ? furnitureData.Warranty[0] : undefined);
    });

    it('should throw an error if any required field is missing', () => {
        const invalidData = {
            Material: "Wood",
            Color: "Brown"
            // missing Type and other required fields
        };

        expect(() => mapper.map(invalidData)).toThrow('Missing required property');
    });

    it('should throw an error for an empty input object', () => {
        expect(() => mapper.map({})).toThrow();
    });
});
