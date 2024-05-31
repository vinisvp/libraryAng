import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book';
import { Author } from '../author/author';
import { AuthorService } from '../../services/author.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  authors: Author[] = [];

  constructor(private authorService: AuthorService,
              private bookService: BookService){ }

  loadBooks(){
    this.bookService.getBooks().subscribe({
      next: data => this.books = data
    })
  }

  loadAuthors(){
    this.authorService.getAuthors().subscribe({
      next: data => this.authors = data
    })
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
  }

  getAuthorName(book: Book): Author | undefined{
    return this.authors.find(a => a.id == book.authorId);
  }

  filterByAuthor(){
    let authorId: number = parseInt((document.getElementById('authorFilter') as HTMLSelectElement).value)
    console.log(authorId)
    if(authorId) {
      this.authorService.getAuthorBooks(authorId).subscribe({
        next: data => this.books = data
      })
    }
    else {
      this.loadBooks();
    }
  }
}
