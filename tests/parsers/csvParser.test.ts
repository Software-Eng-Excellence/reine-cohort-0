import { promises as fs } from 'fs';
import { readCSVFile, writeCSVFile } from '../../src/util/parsers/csvParser';
import config from '../../src/config';

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        writeFile: jest.fn()
    }
}));

const { cakeOrders } = config.paths.data;

describe('CSV Parser', () => {
    const mockCSVData = `Order ID,Product Type,Pet Type,Brand,Size,Flavor,Eco-Friendly,Price,Quantity
    4001,Bedding,Dog,PetCare,Extra Large,Fish,No,322,2
    4002,Leash,Hamster,PetCare,Small,No Flavor,No,248,2`;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should parse CSV file correctly', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockCSVData);

        const result = await readCSVFile(cakeOrders);
        expect(result).toEqual([
            ["4001", "Bedding", "Dog", "PetCare", "Extra Large", "Fish", "No", "322", "2"],
            ["4002", "Leash", "Hamster", "PetCare", "Small", "No Flavor", "No", "248", "2"]
        ]);
    });

    it('should parse CSV file correctly including header', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockCSVData);

        const result = await readCSVFile(cakeOrders, true);
        expect(result).toEqual([
            ["Order ID", "Product Type", "Pet Type", "Brand", "Size", "Flavor", "Eco-Friendly", "Price", "Quantity"],
            ["4001", "Bedding", "Dog", "PetCare", "Extra Large", "Fish", "No", "322", "2"],
            ["4002", "Leash", "Hamster", "PetCare", "Small", "No Flavor", "No", "248", "2"]
        ]);
    });

    it('should throw an error if the CSV file cannot be read', async () => {
        (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

        await expect(readCSVFile(cakeOrders)).rejects.toThrow('Error reading CSV file: Error reading file at path "src/data/cake orders.csv": File not found');
    });

    it('should write CSV file correctly', async () => {
        const data = [
            ["Order ID", "Product Type", "Pet Type", "Brand", "Size", "Flavor", "Eco-Friendly", "Price", "Quantity"],
            ["4001", "Bedding", "Dog", "PetCare", "Extra Large", "Fish", "No", "322", "2"],
            ["4002", "Leash", "Hamster", "PetCare", "Small", "No Flavor", "No", "248", "2"]
        ];

        await writeCSVFile(cakeOrders, data);

        expect(fs.writeFile).toHaveBeenCalledWith(cakeOrders, expect.any(String), 'utf-8');
    });

    it('should throw an error if the CSV file cannot be written', async () => {
        (fs.writeFile as jest.Mock).mockRejectedValue(new Error('Permission denied'));

        const data = [
            ["Order ID", "Product Type", "Pet Type", "Brand", "Size", "Flavor", "Eco-Friendly", "Price", "Quantity"],
            ["4001", "Bedding", "Dog", "PetCare", "Extra Large", "Fish", "No", "322", "2"],
            ["4002", "Leash", "Hamster", "PetCare", "Small", "No Flavor", "No", "248", "2"]
        ];

        await expect(writeCSVFile(cakeOrders, data)).rejects.toThrow('Error writing CSV file: Permission denied');
    });
});