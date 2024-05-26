import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../features/book/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  postBook(book: Book): Observable<Book>{
    return this.http.post<Book>(this.url, book);
  }

  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.url);
  }

  deleteBook(book: Book): Observable<void>{
    return this.http.delete<void>(`${this.url}/${book.id}`);
  }

  putBook(book: Book): Observable<Book>{
    return this.http.put<Book>(`${this.url}/${book.id}`, book);
  }
}
