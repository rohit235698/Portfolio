import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions , Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
 // private apiHeaders = new Headers({ 'X-Mashape-Key' : });

  private options = new RequestOptions({ headers: this.headers });
  private games = [];
  private gameNames = [];

  constructor(private http: Http) { }

  getGames(): Observable<any> {
    return this.http.get('/games').map(this.extractGames);
  }
  
   private extractGames(res: Response) {
     this.games = res.json();
    this.games.forEach((game) => {
    this.gameNames.push(game.title);
  });
    return this.games || {};
  }
   getCacheGames() {
     return this.games;
   }

getCacheGameNames() {

  return this.gameNames;
}
}