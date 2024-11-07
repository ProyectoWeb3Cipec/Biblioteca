import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = []; 
  searchText: string = '';

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
    this.filteredBooks = this.books;
  }

  editBook(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id);
    this.books = this.bookService.getBooks();
  }
  onSearch(): void { 
    console.log('Buscando:', this.searchText);
    if (this.searchText) { 
       const searchTextLower = this.searchText.toLowerCase(); 
       this.filteredBooks = this.books.filter(book => 
       book.title.toLowerCase().includes(searchTextLower) || 
       book.author.toLowerCase().includes(searchTextLower) || 
       book.year.toString().includes(searchTextLower) ); 
      } else { 
        this.filteredBooks = this.books; 
  }
  console.log('Resultados filtrados:', this.filteredBooks);
 }
}
