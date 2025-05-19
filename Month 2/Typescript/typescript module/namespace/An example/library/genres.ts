// src/library/genres.ts
namespace LibraryGenres {
    export const genres = ["Fiction", "Dystopian", "Classics"];
    
    export function addGenre(genre: string) {
      genres.push(genre);
    }
  }
  