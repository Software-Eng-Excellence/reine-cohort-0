import { promises as fs } from 'fs';
import { parseJsonFile } from '../src/util/parsers/jsonParser';
import config from '../src/config';
import { mockBookOrdersData, mockPetOrdersData } from './mocks/mockData';

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn()
    }
}));

const { bookOrders, petOrders } = config.paths.data;

describe('JSON Parser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should parse JSON file correctly for book orders', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockBookOrdersData);

        const result = await parseJsonFile(bookOrders);
        expect(result).toEqual(JSON.parse(mockBookOrdersData));
    });

    it('should parse JSON file correctly for pet orders', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockPetOrdersData);

        const result = await parseJsonFile(petOrders);
        expect(result).toEqual(JSON.parse(mockPetOrdersData));
    });

    it('should throw an error if the JSON file cannot be read', async () => {
        (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

        await expect(parseJsonFile(bookOrders)).rejects.toThrow('Error parsing JSON file at path "src/data/book orders.json": Error reading file at path "src/data/book orders.json": File not found');
    });

    it('should throw an error if the JSON data is invalid', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue('Invalid JSON');

        await expect(parseJsonFile(bookOrders)).rejects.toThrow('Error parsing JSON file at path "src/data/book orders.json": Error parsing JSON data: Unexpected token \'I\', "Invalid JSON" is not valid JSON');
    });
});
