import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder,
              private authorService: AuthorService
  ){
    this.authorFormGroup = formBuilder.group({
      id:[''],
      name:[''],
      birthDate:[''],
      nationality:[''],
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
        this.authorFormGroup.value.birthDate = date;
      }
      console.log(this.authorFormGroup.value.birthDate)
    }
  }

  clearDate(){
    (document.getElementById('day') as HTMLInputElement).value = '';
    (document.getElementById('mounth') as HTMLInputElement).value = '0';
    (document.getElementById('year') as HTMLInputElement).value = '';
  }

  save(){
    this.saveDate();
    if (!this.isEditing) {
      this.authorService.postAuthor(this.authorFormGroup.value).subscribe({
        next: () => {
          this.loadAuthors()
          this.authorFormGroup.reset()
          this.clearDate()
          this.isEditing = false
        }
      })
    }
    else {
      this.authorService.putAuthor(this.authorFormGroup.value).subscribe({
        next: () => {
          this.loadAuthors()
          this.authorFormGroup.reset()
          this.clearDate()
          this.isEditing = false
        }
      })
    }
  }

  remove(author: Author){
    this.authorService.deleteAuthor(author).subscribe({
      next: () => this.loadAuthors()
    })
  }

  edit(author: Author){
    this.authorFormGroup.setValue(author);
    this.isEditing = true;
  }
}
