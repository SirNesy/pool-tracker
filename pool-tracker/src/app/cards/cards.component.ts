import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
    Players: Player[] = [];
    constructor(private playerService: PlayerService) {}

    getPlayers(): void {
        this.playerService.getPlayers().subscribe((Players) => {
            console.log('Players updated');
            this.Players = Players;
        });
    }

    //on destroy
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
        this.Players = this.Players.filter((player) => player !== deletedPlayer);
        this.playerService.deletePlayer(deletedPlayer.id).subscribe();
    }
    ngOnInit(): void {
        // this.cdr.detectChanges();
        this.getPlayers();
    }
}
