import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
    Players: Player[] = [];
    sub!: Subscription;
    constructor(private playerService: PlayerService) {}

    getPlayers(): void {
        this.sub = this.playerService.getPlayers().subscribe((Players) => {
            this.Players = Players;
            this.Players.forEach((player: Player) => {
                player.point = this.playerService.calculatePoints(player);
            });
            this.playerService.updateLeaderboardDataSubject(this.Players);
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    handleWinIncrease(player: Player) {
        const increment = 1;
        this.playerService.winIncrease(player, increment).subscribe();
    }
    handleLossIncrease(player: Player) {
        const increment = 1;
        this.playerService.lossIncrease(player, increment).subscribe();
    }
    handleWinDecrease(player: Player) {
        const increment = -1;
        this.playerService.winDecrease(player, increment).subscribe();
    }
    handleLossDecrease(player: Player) {
        const increment = -1;
        this.playerService.lossDecrease(player, increment).subscribe();
    }
    handleDelete(deletedPlayer: Player) {
        this.Players = this.Players.filter((player) => player !== deletedPlayer);
        this.playerService.deletePlayer(deletedPlayer.id).subscribe();
    }

    ngOnInit(): void {
        this.getPlayers();
        this.playerService.playerUpdateEvent.subscribe(() => this.getPlayers());
    }
}
