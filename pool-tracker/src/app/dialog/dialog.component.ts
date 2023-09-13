import { Component } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerSnackbarComponent } from '../player-snackbar/player-snackbar.component';
import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
    durationInSeconds: number = 5;
    public name: string = '';
    public win: number = 0;
    public loss: number = 0;

    constructor(private _snackBar: MatSnackBar, private playerService: PlayerService) {}

    openSnackBar() {
        this._snackBar.openFromComponent(PlayerSnackbarComponent, {
            duration: this.durationInSeconds * 1000,
        });
    }
    add(name: string, paramWin: number, paramLoss: number) {
        name = name.trim();
        const win = paramWin;
        const loss = paramLoss;
        this.playerService.addPlayer({ name, win, loss } as Player).subscribe(() => this.playerService.triggerPlayerUpdate());
    }
}
