import { Component } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerSnackbarComponent } from '../player-snackbar/player-snackbar.component';
import { PlayerService } from '../player.service';
import { Player } from '../player';
// import { Player } from '../player';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  durationInSeconds: number = 5;
  // constructor(public data: any) {}
  constructor(
    private _snackBar: MatSnackBar,
    private playerService: PlayerService
  ) {}

  openSnackBar() {
    this._snackBar.openFromComponent(PlayerSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  add(name: string, paramWin: string, paramLoss: string) {
    // convertedWin : number = Number(win)
    name = name.trim();
    const win = Number(paramWin.trim());
    const loss = Number(paramLoss.trim());
    console.log(name, win, loss);
    if (!name) {
      return;
    }
    this.playerService.addPlayer({ name, win, loss } as Player).subscribe();
  }
}
