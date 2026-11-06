import { describe, expect, test } from "vitest";
import { favoriteGenre } from "./books";
import { initialBooks } from "./data";
import type { Book } from "./types";

const book = (id: string, genre: Book["genre"], isRead: boolean): Book => ({
  id,
  title: id,
  author: "Author",
  genre,
  rating: 0,
  isRead,
});

describe("favoriteGenre", () => {
  test("returns the genre with the most read books", () => {
    const books = [
      book("a", "sci-fi", true),
      book("b", "sci-fi", true),
      book("c", "fantasy", true),
    ];
    expect(favoriteGenre(books)).toBe("sci-fi");
  });

  test("picks the alphabetically first genre on a tie", () => {
    const books = [book("a", "sci-fi", true), book("b", "fantasy", true)];
    expect(favoriteGenre(books)).toBe("fantasy");
  });

  test("ignores unread books", () => {
    const books = [
      book("a", "mystery", false),
      book("b", "mystery", false),
      book("c", "sci-fi", true),
    ];
    expect(favoriteGenre(books)).toBe("sci-fi");
  });

  test("returns null when no book is read", () => {
    expect(favoriteGenre([book("a", "sci-fi", false)])).toBeNull();
    expect(favoriteGenre([])).toBeNull();
  });

  test("returns fantasy for the sample books (sci-fi and fantasy tie)", () => {
    expect(favoriteGenre(initialBooks)).toBe("fantasy");
  });
});
