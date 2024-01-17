import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Player } from '../player';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
    public showFiller = false;
    public isScreenSmall!: boolean;
    public durationInSeconds = 10;
    // public play: Player = { id: 2, name: 'joy', win: 2, loss: 2, point: 2 };

    constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

    openDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '600px',
            height: '400px',
        });
        dialogRef.afterClosed().subscribe(() => {});
    }

    openSnackBar() {
        this._snackBar.openFromComponent(MessageSnackbarComponent, {
            duration: this.durationInSeconds * 1000,
        });
    }

    ngOnInit(): void {
        this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((state: BreakpointState) => {
            this.isScreenSmall = state.matches;
        });
    }
    // public meat(incomingPlayer: Player): void {
    //     this.play = incomingPlayer;
    // }
}
