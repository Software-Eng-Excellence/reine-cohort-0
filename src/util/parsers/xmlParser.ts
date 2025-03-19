import { readFile } from '../fileUtils';
import { parseStringPromise } from 'xml2js';

export async function parseXML<T>(xmlData: string): Promise<T> {
    try {
        const result = await parseStringPromise(xmlData, { explicitArray: false, mergeAttrs: true });
        return result as T;
    } catch (error) {
        throw new Error(`Error parsing XML data: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function parseXMLFile<T>(filePath: string): Promise<T> {
    try {
        const xmlData = await readFile(filePath);
        return await parseXML<T>(xmlData);
    } catch (error) {
        throw new Error(`Error parsing XML file at path "${filePath}": ${error instanceof Error ? error.message : String(error)}`);
    }
}
