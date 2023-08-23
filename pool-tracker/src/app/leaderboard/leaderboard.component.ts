import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
    players: Player[] = [];
    constructor(private playerService: PlayerService) {}

    ngOnInit(): void {
        this.playerService.leaderboardData$.subscribe((players) => (this.players = players));
        console.log(this.players);
    }
}
