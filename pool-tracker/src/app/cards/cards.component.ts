import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.css'],
})
// @Output({})
export class CardsComponent implements OnInit {
    Players: Player[] = [];
    sub!: Subscription;
    constructor(private playerService: PlayerService) {}

    getPlayers(): void {
        this.sub = this.playerService.getPlayers().subscribe((Players) => {
            this.Players = Players;
            this.Players.forEach(function (player) {
                player.calculatePoints = () => player.win * 3 + player.loss;
            });
            this.playerService.updateLeaderboardDataSubject(this.Players);
            console.log(this.Players);
        });
    }

    //on destroy
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
        this.playerService.winIncrease(player, increment).subscribe();
    }
    handleLossDecrease(player: Player) {
        const increment = -1;
        this.playerService.lossIncrease(player, increment).subscribe();
    }
    handleDelete(deletedPlayer: Player) {
        this.Players = this.Players.filter((player) => player !== deletedPlayer); //optimistic rendering
        this.playerService.deletePlayer(deletedPlayer.id).subscribe();
    }

    ngOnInit(): void {
        this.getPlayers();
        this.playerService.playerUpdateEvent.subscribe(() => this.getPlayers());
    }
}
