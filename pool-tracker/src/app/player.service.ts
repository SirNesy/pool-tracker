import { Injectable } from '@angular/core';
import { Player } from './player';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playersUrl = 'api/players';

  constructor(
    private http: HttpClient,
    // private http: HttpClientService;
    private messageService: MessageService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private log(message: string): void {
    this.messageService.add(`Player Service: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      console.log(error);

      return of(result as T);
    };
  }
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl).pipe(
      tap((_) => this.log('Players gotten')),
      catchError(this.handleError<Player[]>('getPlayers', []))
    );
  }
  winIncrease(player: Player, winIncrement: number): Observable<Player> {
    const patchUrl = `${this.playersUrl}/${player.id}`;
    player.win += winIncrement;
    const patchPlayer = player;
    console.log(patchPlayer);

    return this.http.put<Player>(patchUrl, player, this.httpOptions).pipe(
      //what method to use here, put, patch or u[]
      tap((_) => this.log(`Player${player.id} win increased`)),
      catchError(this.handleError<any>('winIncrease'))
    );
  }
}
