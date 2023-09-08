import { EventEmitter, Injectable } from '@angular/core';
import { Player } from './player';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    private playersUrl = 'https://localhost:7263/api/players';
    playerUpdateEvent: EventEmitter<void> = new EventEmitter();
    private leaderboardDataSubject = new BehaviorSubject<Player[]>([]);
    leaderboardData$ = this.leaderboardDataSubject.asObservable();

    updateLeaderboardDataSubject(data: Player[]): void {
        this.leaderboardDataSubject.next(data);
    }

    constructor(private http: HttpClient, private messageService: MessageService) {}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    triggerPlayerUpdate() {
        this.playerUpdateEvent.emit();
    }

    private log(message: string): void {
        this.messageService.add(`Player Service: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.log(`${operation} failed: ${error.message}`);
            // console.log(error);
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
        const patchUrl = `${this.playersUrl}/${player.id}/increase-win`;
        player.win += increment; // optimistic rendering

        return this.http.put<Player>(patchUrl, player, this.httpOptions).pipe(
            tap((_) => this.log(`Player${player.id} win implemented`)),
            catchError(this.handleError<Player>('winIncrease')),
        );
    }
    winDecrease(player: Player, increment: number): Observable<Player> {
        const patchUrl = `${this.playersUrl}/${player.id}/decrease-win`;
        player.win += increment;

        return this.http.put<Player>(patchUrl, player, this.httpOptions).pipe(
            tap((_) => this.log(`Player${player.id} win implemented`)),
            catchError(this.handleError<Player>('winDecrease')),
        );
    }

    lossIncrease(player: Player, increment: number): Observable<Player> {
        const patchUrl = `${this.playersUrl}/${player.id}/increase-loss`;
        player.loss += increment;

        return this.http.put<Player>(patchUrl, player, this.httpOptions).pipe(
            tap((_) => this.log(`Player${player.id} loss implemented`)),
            catchError(this.handleError<Player>('lossIncrease')),
        );
    }

    lossDecrease(player: Player, increment: number): Observable<Player> {
        const patchUrl = `${this.playersUrl}/${player.id}/decrease-loss`;
        player.loss += increment;

        return this.http.put<Player>(patchUrl, player, this.httpOptions).pipe(
            tap((_) => this.log(`Player${player.id} loss implemented`)),
            catchError(this.handleError<Player>('lossDecrease')),
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
        return this.http.post<Player>(this.playersUrl, player, this.httpOptions).pipe(tap((newPlayer: Player) => this.log(`Player ${newPlayer.name} added`)));
    }
}
