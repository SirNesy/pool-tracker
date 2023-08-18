import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-player-snackbar',
  templateUrl: './player-snackbar.component.html',
  styleUrls: ['./player-snackbar.component.css']
})
export class PlayerSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
