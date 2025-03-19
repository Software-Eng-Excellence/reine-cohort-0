import { promises as fs } from 'fs';

export async function readFile(filePath: string): Promise<string> {
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        throw new Error(`Error reading file at path "${filePath}": ${error instanceof Error ? error.message : String(error)}`);
    }
}
