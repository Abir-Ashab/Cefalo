import { book } from "./library/books";
import { authors } from "./library/authors";
import { genres } from "./library/genres";

const myBook = new book("The Great Gatsby", "F. Scott Fitzgerald");
const myAuthor = new authors("F. Scott Fitzgerald", 44);
const myGenre = new genres("Fiction", "A genre that contains fictional stories.");
