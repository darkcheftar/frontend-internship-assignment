import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, of } from 'rxjs';
import { SearchService } from '../../core/services/search.service';
import { Docs } from 'src/app/core/models/search-response.model';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  title: string = '';
  author: string = '';
  offset:number = 0;
  books:Docs[] = [];
  constructor(private searchService:SearchService) {
    this.bookSearch = new FormControl('');
  }
  getBooksbyTitleAndAuthor(){
    if(!this.author){
      this.author = '';
    }
    if(!this.title){
      this.title = '';
    }
    console.log(this.author, this.offset, this.title)

    this.searchService.getBooksbyAuthorAndTitle(this.author, this.title,this.offset).subscribe((data)=>{
      this.books = data?.docs;
        // console.log(this.books);
      }
    )
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
       [this.title, this.author] = value.split('|');
        this.getBooksbyTitleAndAuthor();
      });
  }
}
