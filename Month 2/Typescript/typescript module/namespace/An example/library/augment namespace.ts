/// <reference path="books.ts" />  // Referencing the original namespace

namespace LibraryBooks {
    // Augment the structure of books to hold more details
    export interface Book {
      title: string;
      author: string;
      genre: string;
    }
  
    // Update the books array to store an array of Book objects
    export const books: Book[] = [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction" },
      { title: "1984", author: "George Orwell", genre: "Dystopian" },
      { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction" }
    ];
  
    // Update the addBook function to handle Book objects
    export function addBook(book: Book) {
      books.push(book);
    }
  }
  