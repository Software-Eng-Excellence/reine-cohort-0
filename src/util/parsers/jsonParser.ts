import { readFile } from '../fileUtils';

export function parseJson<T>(data: string): T {
    try {
        return JSON.parse(data) as T;
    } catch (error) {
        throw new Error(`Error parsing JSON data: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function parseJsonFile<T>(filePath: string): Promise<T> {
    try {
        const data = await readFile(filePath);
        return parseJson<T>(data);
    } catch (error) {
        throw new Error(`Error parsing JSON file at path "${filePath}": ${error instanceof Error ? error.message : String(error)}`);
    }
}
