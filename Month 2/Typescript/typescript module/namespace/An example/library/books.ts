// src/library/books.ts
namespace LibraryBooks {
    export const books = ["The Great Gatsby", "1984", "To Kill a Mockingbird"];
    
    export function addBook(book: string) {
      books.push(book);
    }
}
  