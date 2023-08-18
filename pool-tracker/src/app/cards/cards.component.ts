import { Component, OnInit } from '@angular/core';
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
    this.playerService
      .getPlayers()
      .subscribe((Players) => (this.Players = Players));
  }
  handleIncrease(player: Player) {
    const winIncrement = 1;
    this.playerService
      .winIncrease(player, winIncrement)
      .subscribe();
  }
  ngOnInit(): void {
    this.getPlayers();
  }
}
