import { promises as fs } from 'fs';
import { parseXMLFile } from '../src/util/parsers/xmlParser';
import config from '../src/config';
import { mockFurnitureOrdersData, mockToyOrdersData } from './mocks/mockData';

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn()
    }
}));

const { furnitureOrders, toyOrders } = config.paths.data;

describe('XML Parser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should parse XML file correctly for furniture orders', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockFurnitureOrdersData);

        const result = await parseXMLFile(furnitureOrders);
        expect(result).toEqual({
            orders: {
                order: [
                    {
                        OrderID: "1001",
                        ProductType: "Chair",
                        Material: "Wood",
                        Color: "Brown",
                        Price: "120",
                        Quantity: "4"
                    },
                    {
                        OrderID: "1002",
                        ProductType: "Table",
                        Material: "Metal",
                        Color: "Black",
                        Price: "300",
                        Quantity: "2"
                    }
                ]
            }
        });
    });

    it('should parse XML file correctly for toy orders', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockToyOrdersData);

        const result = await parseXMLFile(toyOrders);
        expect(result).toEqual({
            orders: {
                order: [
                    {
                        OrderID: "2001",
                        ProductType: "Action Figure",
                        Brand: "Marvel",
                        AgeGroup: "5+",
                        Price: "25",
                        Quantity: "10"
                    },
                    {
                        OrderID: "2002",
                        ProductType: "Doll",
                        Brand: "Barbie",
                        AgeGroup: "3+",
                        Price: "30",
                        Quantity: "5"
                    }
                ]
            }
        });
    });

    it('should throw an error if the XML file cannot be read', async () => {
        (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

        await expect(parseXMLFile(furnitureOrders)).rejects.toThrow('Error parsing XML file at path "src/data/furniture orders.xml": Error reading file at path "src/data/furniture orders.xml": File not found');
    });

    it('should throw an error if the XML data is invalid', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue('Invalid XML');

        await expect(parseXMLFile(furnitureOrders)).rejects.toThrow('Error parsing XML file at path "src/data/furniture orders.xml": Error parsing XML data: Non-whitespace before first tag.');
    });
});
