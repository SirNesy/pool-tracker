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
        private messageService: MessageService,
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
            catchError(this.handleError<Player[]>('getPlayers', [])),
        );
    }

    winIncrease(player: Player, increment: number): Observable<Player> {
        const patchUrl = `${this.playersUrl}/${player.id}`;
        player.win += increment;

        return this.http.put<Player>(patchUrl, player, this.httpOptions).pipe(
            tap((_) => this.log(`Player${player.id} win implemented`)),
            catchError(this.handleError<Player>('winIncrease')),
        );
    }

    lossIncrease(player: Player, increment: number): Observable<Player> {
        const patchUrl = `${this.playersUrl}/${player.id}`;
        player.loss += increment;

        return this.http.put<Player>(patchUrl, player, this.httpOptions).pipe(
            tap((_) => this.log(`Player${player.id} loss implemented`)),
            catchError(this.handleError<Player>('lossIncrease')),
        );
    }

    deletePlayer(playerId: number): Observable<Player> {
        const url = `${this.playersUrl}/${playerId}`;
        return this.http.delete<Player>(url, this.httpOptions).pipe(
            tap((_) => this.log(`Player ${playerId} has been deleted`)),
            catchError(this.handleError<Player>('deletePlayer')),
        );
    }

    addPlayer(player: Player): Observable<Player> {
        return this.http.post<Player>(this.playersUrl, player, this.httpOptions)
        .pipe(tap((newPlayer: Player) => this.log(`Player ${newPlayer.name} added`)));
    }
}
