import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  showFiller = false;
  public isScreenSmall!: boolean;
  durationInSeconds = 10
  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,private _snackBar: MatSnackBar
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px', // Set the width of the dialog
      height: '400px',
      data: { message: 'Hello from the dialog!' }, // You can pass data to the dialog
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openSnackBar() {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
  }
}
