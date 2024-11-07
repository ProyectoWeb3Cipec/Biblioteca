import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private localStorageKey = 'books';

  getBooks(): Book[] {
    const booksJson = localStorage.getItem(this.localStorageKey);
    return booksJson ? JSON.parse(booksJson) : [];
  }

  saveBooks(books: Book[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }

  addBook(book: Book): void {
    const books = this.getBooks();
    books.push(book);
    this.saveBooks(books);
  }

  deleteBook(id: number): void {
    const books = this.getBooks().filter(book => book.id !== id);
    this.saveBooks(books);
  }

  updateBook(updatedBook: Book): void {
    const books = this.getBooks().map(book =>
      book.id === updatedBook.id ? updatedBook : book
    );
    this.saveBooks(books);
  }
  getBookById(id: number): Book | undefined {
    return this.getBooks().find(book => book.id === id);
  }
}
