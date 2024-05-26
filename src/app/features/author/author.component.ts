import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Author } from './author';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent {
  authors: Author[] = [];
  authorFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authorService: AuthorService
  ){
    this.authorFormGroup = formBuilder.group({
      id:[''],
      name:[''],
      birthDate:[''],
      nationality:['']
    })
  }
}
