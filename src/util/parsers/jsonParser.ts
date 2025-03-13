import { promises as fs } from 'fs';

export async function readFile(filePath: string): Promise<string> {
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        throw new Error(`Error reading file at path "${filePath}": ${error instanceof Error ? error.message : String(error)}`);
    }
}

export class JsonParser {
    static parseJson<T>(data: string): T {
        try {
            return JSON.parse(data) as T;
        } catch (error) {
            throw new Error(`Error parsing JSON data: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    static async parseJsonFile<T>(filePath: string): Promise<T> {
        try {
            const data = await readFile(filePath);
            return JsonParser.parseJson<T>(data);
        } catch (error) {
            throw new Error(`Error parsing JSON file at path "${filePath}": ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
