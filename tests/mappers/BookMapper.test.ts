import { JSONBookMapper } from "../../src/mappers/Book.mapper";
import { Book } from '../../src/model/Book.model';
import { mockBookOrdersData } from '../mocks/mockData';

describe('JSONBookMapper', () => {
    let mapper: JSONBookMapper;

    beforeAll(() => {
        mapper = new JSONBookMapper();
    });

    it('should correctly map a valid JSON object to a Book object', () => {
        const bookRow = JSON.parse(mockBookOrdersData)[0];

        const book = mapper.map(bookRow);

        expect(book).toBeInstanceOf(Book);
        expect(book.getTitle()).toBe('Edge of Eternity');
        expect(book.getAuthor()).toBe('Dan Brown');
        expect(book.getGenre()).toBe('Science Fiction');
        expect(book.getFormat()).toBe('Paperback');
        expect(book.getLanguage()).toBe('French');
        expect(book.getPublisher()).toBe('Oxford Press');
        expect(book.getSpecialEdition()).toBe('Signed Copy');
        expect(book.getPackaging()).toBe('Eco-Friendly Packaging');
    });

    it('should throw an error if any required field is missing', () => {
        const invalidJsonRow = {
            "Book Title": "The Great Gatsby",
            "Author": "F. Scott Fitzgerald",
            "Genre": "Fiction",
            "Format": "Hardcover",
            "Language": "English",
            "Publisher": "Scribner",
            "Special Edition": "Anniversary Edition"
            // missing Packaging
        };

        expect(() => mapper.map(invalidJsonRow)).toThrow('Missing required fields');
    });

    it('should throw an error for an empty input object', () => {
        expect(() => mapper.map({})).toThrow();
    });
});
