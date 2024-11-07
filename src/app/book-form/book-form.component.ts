import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: Book = new Book(0, '', '', 0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      const book = this.bookService.getBookById(+bookId);
      if (book) {
        this.book = book;
      }
    }
  }

  onSubmit(): void {
    if (this.book.id === 0) {
      this.book.id = new Date().getTime();
      this.bookService.addBook(this.book);
    } else {
      this.bookService.updateBook(this.book);
    }
    this.router.navigate(['/']);
  }
}
