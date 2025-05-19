// The /// syntax in TypeScript is used for Triple-Slash Directives. These are special comments that provide instructions to the TypeScript compiler or the editor (like Visual Studio Code). They are typically used for things like including external files, type definitions, or providing compiler options in a specific file.

/// <reference path="library/books.ts" />
/// <reference path="library/authors.ts" />
/// <reference path="library/genres.ts" />

console.log(LibraryBooks.books);  // ["The Great Gatsby", "1984", "To Kill a Mockingbird"]
console.log(LibraryAuthors.authors);  // ["F. Scott Fitzgerald", "George Orwell", "Harper Lee"]
console.log(LibraryGenres.genres);  // ["Fiction", "Dystopian", "Classics"]

LibraryBooks.addBook("Pride and Prejudice");
LibraryAuthors.addAuthor("Jane Austen");
LibraryGenres.addGenre("Romance");

console.log(LibraryBooks.books);  // ["The Great Gatsby", "1984", "To Kill a Mockingbird", "Pride and Prejudice"]
console.log(LibraryAuthors.authors);  // ["F. Scott Fitzgerald", "George Orwell", "Harper Lee", "Jane Austen"]
console.log(LibraryGenres.genres);  // ["Fiction", "Dystopian", "Classics", "Romance"]

LibraryBooks.addBook({
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian"
});

// Displaying the books with their details
LibraryBooks.books.forEach((book) => {
    console.log(`${book.title} by ${book.author} - Genre: ${book.genre}`); 
    // Output: "Brave New World by Aldous Huxley - Genre: Dystopian"
});