import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Data } from './models/data';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const datas = [
      {id: 1, value: 12, name: 'Rabbit'},
      {id: 2, value: 11, name: 'Parrot'},
      {id: 3, value: 10, name: 'Duck'},
      {id: 4, value: 9, name: 'Cat'},
      {id: 5, value: 8, name: 'Dog'},
      {id: 6, value: 7, name: 'Snake'},
      {id: 7, value: 6, name: 'Badger'},
      {id: 8, value: 5, name: 'Horse'},
      {id: 9, value: 4, name: 'Bear'},
      {id: 10, value: 3, name: 'Fox'},
      {id: 11, value: 2, name: 'Spider'},
      {id: 12, value: 1, name: 'Zebra'},
    ];

    return {datas};
  }

  genId(datas: Data[]): number {
    return datas.length > 0 ? Math.max(...datas.map(data => data.id)) + 1 : 1
  }
}
