import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../model/item";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  private getUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {} //Comms

  getItems(): Observable<Item[]> {
      return this.httpClient
          .get<Item[]>(this.getUrl)
          .pipe(map((response) => response));
  }
  saveItem(item: Item): Observable<Item> {
      return this.httpClient.post<Item>(this.getUrl, item);
  }

  updateItem(item: Item,): Observable<any>{
    return this.httpClient.patch(this.getUrl, item);
  }


  // deleteItem(id: number): Observable<any> {
  //   return this.httpClient.delete(`${this.getUrl}/${id}`, { //Weird
  //     responseType: 'text',
  // });
  // }
}
