import { Component, OnInit } from '@angular/core';
import { Item } from './model/item';
import { ItemService } from './services/item.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class ItemListComponent implements OnInit{

  item: Item;
  list: Item[] = [];
  styleChange: string; // Next step
  name: string;
  numid: number;
  done: boolean = false;
  errormsg: boolean = false;

  constructor (private itemserv: ItemService){

  }

  ngOnInit(): void {
    this.loadAll();

    //throw new Error('Method not implemented.');
  }
  loadAll(): void{
    this.itemserv.getItems().subscribe((data) => {
      console.log(data);
      this.list = data;
    });
  }

  addItem(){
    if(this.name){

      this.errormsg = false;
      this.item = new Item();
      this.item.itemName = this.name;
      //console.log(this.item.itemName);
      //console.log(this.item.ID);
      this.itemserv.saveItem(this.item).subscribe((data) => {
        console.log('sending', data);
        this.name=null;
        this.loadAll();
      });
    }else{
      this.errormsg = true;
    }
  }

  deleteItem(item: Item) {
    this.itemserv.saveItem(item).subscribe((data) => {
      console.log('deleting', data);
      this.loadAll();
    });
  }

  statusChange(item: Item){ //event?: MouseEvent

    item.done = item.done ? true : false;
    this.itemserv.updateItem(item).subscribe((data) => {
          console.log('deleting', data);
          this.loadAll();
      });
  }
  // statusChange(item: Item){ //event?: MouseEvent

  //   item.done = !item.done;
  //   this.itemserv.updateItem(item).subscribe((data) => {
  //     console.log('deleting', data);
  //     this.loadAll();
  //   });
  // }
  // updateItem(item){
  //   this.itemserv.getUpdate(item.id)
  //   .subscribe(updatedItem => {
  //     item = updatedItem;
  //   });
  // }

}
