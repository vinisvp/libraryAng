import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from './author';
import { AuthorService } from '../../services/author.service';
import { Mounth } from '../../mounth';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit {
  authors: Author[] = [];
  mounths = Object.values(Mounth);
  authorFormGroup: FormGroup;
  isEditing: boolean = false;
  submmited: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authorService: AuthorService
  ){
    this.authorFormGroup = formBuilder.group({
      id:[''],
      name:['', [Validators.required, Validators.minLength(3)]],
      birthDate:['', [Validators.required]],
      nationality:['', [Validators.required]],
      summary:['']
    })
  }

  loadAuthors(){
    this.authorService.getAuthors().subscribe({
      next: data => this.authors = data
    })
  }

  ngOnInit(): void {
    this.loadAuthors();
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
        this.authorFormGroup.get('birthDate')?.setValue(date);
      }
    }
  }

  loadDate(){
    let date = new Date(this.authorFormGroup.value.birthDate);
    (document.getElementById('day') as HTMLInputElement).value = String(date.getDate());
    (document.getElementById('mounth') as HTMLInputElement).value = String(date.getMonth());
    (document.getElementById('year') as HTMLInputElement).value = String(date.getFullYear());
  }

  clearDate(){
    (document.getElementById('day') as HTMLInputElement).value = '';
    (document.getElementById('mounth') as HTMLInputElement).value = '0';
    (document.getElementById('year') as HTMLInputElement).value = '';
  }

  showDate(author: Author): String | undefined{
    let date = new Date(author.birthDate);
    return date.getDate() + " de "
          +this.mounths[(date.getMonth())] + " de "
          +date.getFullYear();
  }

  save(){
    this.saveDate();
    this.submmited = true;
    if (this.authorFormGroup.valid)
    {
      if (!this.isEditing) {
        this.authorService.postAuthor(this.authorFormGroup.value).subscribe({
          next: () => {
            this.loadAuthors();
            this.authorFormGroup.reset();
            this.clearDate();
            this.isEditing = false;
            this.submmited = false;
          }
        })
      }
      else {
        this.authorService.putAuthor(this.authorFormGroup.value).subscribe({
          next: () => {
            this.loadAuthors();
            this.authorFormGroup.reset();
            this.clearDate();
            this.isEditing = false;
            this.submmited = false;
          }
        })
      }
    }
  }

  remove(author: Author){
    this.authorService.deleteAuthor(author).subscribe({
      next: () => this.loadAuthors()
    })
  }

  edit(author: Author){
    this.authorFormGroup.setValue(author);
    this.loadDate();
    this.isEditing = true;
  }

  get name(): any{
    return this.authorFormGroup.get('name');
  }

  get birthDate(): any{
    return this.authorFormGroup.get('birthDate');
  }

  get nationality(): any{
    return this.authorFormGroup.get('nationality');
  }
}
