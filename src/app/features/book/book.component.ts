import { Mounth } from './../../mounth';
import { BookService } from './../../services/book.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from './book';
import { Author } from '../author/author';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  books: Book[] = [];
  mounths = Object.values(Mounth);
  authors: Author[] = [];
  bookFormGroup: FormGroup;
  isEditing: boolean = false;
  submmited: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private bookService: BookService,
              private authorService: AuthorService
  ){
    this.bookFormGroup = formBuilder.group({
      id:[''],
      title:['', [Validators.required]],
      genre:['', [Validators.required]],
      releaseDate:['', [Validators.required]],
      onSale:[true],
      authorId:['', [Validators.required]]
    })
  }

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

  getAuthorName(book: Book): Author | undefined{
    return this.authors.find(a => a.id == book.authorId);
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
  }

  compareAuthors(author1: Author, author2: Author): boolean {
    return author1 && author2 ? author1.id === author2.id : author1 === author2;
  }

  saveDate(){
    let day = parseInt((document.getElementById('day') as HTMLInputElement).value);
    if(day <= 31)
    {
      let month = parseInt((document.getElementById('mounth') as HTMLInputElement).value);
      let year = parseInt((document.getElementById('year') as HTMLInputElement).value);
      let date = new Date(year, month, day);
      if(isFinite(+date))
      {
        this.bookFormGroup.get('releaseDate')?.setValue(date);
      }
    }
  }

  loadDate(){
    let date = new Date(this.bookFormGroup.value.releaseDate);
    (document.getElementById('day') as HTMLInputElement).value = String(date.getDate());
    (document.getElementById('mounth') as HTMLInputElement).value = String(date.getMonth());
    (document.getElementById('year') as HTMLInputElement).value = String(date.getFullYear());
  }

  clearDate(){
    (document.getElementById('day') as HTMLInputElement).value = '';
    (document.getElementById('mounth') as HTMLInputElement).value = '0';
    (document.getElementById('year') as HTMLInputElement).value = '';
  }

  showDate(author: Book): String | undefined{
    let date = new Date(author.releaseDate);
    return date.getDate() + " de "
          +this.mounths[(date.getMonth())] + " de "
          +date.getFullYear();
  }

  save(){
    this.saveDate();
    this.submmited = true;
    if (this.bookFormGroup.valid)
    {
      if (!this.isEditing) {
        this.bookService.postBook(this.bookFormGroup.value).subscribe({
          next: () => {
            this.loadBooks();
            this.bookFormGroup.reset();
            this.clearDate();
            this.isEditing = false;
            this.submmited = false;
          }
        })
      }
      else {
        this.bookService.putBook(this.bookFormGroup.value).subscribe({
          next: () => {
            this.loadBooks();
            this.bookFormGroup.reset();
            this.clearDate();
            this.isEditing = false;
            this.submmited = false;
          }
        })
      }
    }
  }

  remove(book: Book){
    this.bookService.deleteBook(book).subscribe({
      next: () => this.loadBooks()
    })
  }

  edit(book: Book){
    this.bookFormGroup.setValue(book);
    this.loadDate();
    this.isEditing = true;
  }

  get title(): any{
    return this.bookFormGroup.get('title');
  }

  get releaseDate(): any{
    return this.bookFormGroup.get('releaseDate');
  }

  get authorId(): any{
    return this.bookFormGroup.get('authorId');
  }
}
