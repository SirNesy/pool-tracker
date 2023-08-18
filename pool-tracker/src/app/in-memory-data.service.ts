import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  ParsedRequestUrl,
  RequestInfoUtilities,
} from 'angular-in-memory-web-api';
import { Player } from './player';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  players: any;
  createDb() {
    const players: Player[] = [
      { id: 1, name: 'Onesi', win: 11, loss: 4 },
      { id: 2, name: 'Simon', win: 13, loss: 1 },
      { id: 3, name: 'Mia', win: 9, loss: 2 },
      { id: 4, name: 'Stevie', win: 10, loss: 4 },
      { id: 5, name: 'Imran', win: 10, loss: 1 },
      { id: 6, name: 'James', win: 7, loss: 3 },
      { id: 7, name: 'Oliver', win: 8, loss: 0 },
      { id: 8, name: 'Clare', win: 1, loss: 4 },
      { id: 9, name: 'Lauren', win: 5, loss: 6 },
      { id: 10, name: 'Paul', win: 2, loss: 5 },
    ];
    return { players };
  }
  genId(players: Player[]): number {
    return players.length > 0
      ? Math.max(...players.map((player) => player.id)) + 1
      : 50;
  }

  
}
