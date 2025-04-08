import { BookBuilder } from "../model/builders/book.builder";
import { Book } from "../model/Book.model";
import { IMapper } from "./IMapper";

export class JSONBookMapper implements IMapper<{[key: string]: string}, Book> {
    
    map(data: {[key: string]: string}): Book {
        return BookBuilder.newBuilder()
            .setTitle(data["Book Title"])
            .setAuthor(data["Author"])
            .setGenre(data["Genre"])
            .setFormat(data["Format"])
            .setLanguage(data["Language"])
            .setPublisher(data["Publisher"])
            .setSpecialEdition(data["Special Edition"])
            .setPackaging(data["Packaging"])
            .build();
    }
}
