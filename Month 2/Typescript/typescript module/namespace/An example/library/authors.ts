// src/library/authors.ts
namespace LibraryAuthors {
    export const authors = ["F. Scott Fitzgerald", "George Orwell", "Harper Lee"];
    
    export function addAuthor(author: string) {
      authors.push(author);
    }
  }
  