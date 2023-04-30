import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';
import { SearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) {}

  getBooksbyAuthorAndTitle(author: string, title: string,offset:Number): Observable<SearchResponse> {
    const limit = 10;
    if(author && author.length>0 && title && title.length>0){
      return this.apiService.get(`/search.json?author=${author.toLowerCase().split(' ').join('_')}&title=${title.toLowerCase().split(' ').join('_')}&limit=${limit}&offset=${offset}`);
    }else if(author && author.length>0){
      return this.apiService.get(`/search.json?author=${author.toLowerCase().split(' ').join('_')}&limit=${limit}&offset=${offset}`);
    }
    else if(title && title.length>0){
      return this.apiService.get(`/search.json?title=${title.toLowerCase().split(' ').join('_')}&limit=${limit}&offset=${offset}`);
    }
    else{
      return of({} as SearchResponse);
    }
  }
}
