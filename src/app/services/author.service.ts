import { Author } from './../features/author/author';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../features/book/book';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  url = 'http://localhost:3000/authors';

  constructor(private http: HttpClient) { }

  postAuthor(author: Author): Observable<Author>{
    return this.http.post<Author>(this.url, author);
  }

  getAuthors(): Observable<Author[]>{
    return this.http.get<Author[]>(this.url);
  }

  getAuthorBooks(authorId: number): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.url}/${authorId}/books`)
  }

  deleteAuthor(author: Author): Observable<void>{
    return this.http.delete<void>(`${this.url}/${author.id}`);
  }

  putAuthor(author: Author): Observable<Author>{
    return this.http.put<Author>(`${this.url}/${author.id}`, author);
  }
}
