import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from './message-snackbar/message-snackbar.component';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(private _snackBar: MatSnackBar) {}
    messages: string[] = [];
    durationInSeconds: number = 1;
    openSnackBar() {
        this._snackBar.openFromComponent(MessageSnackbarComponent, {
            duration: this.durationInSeconds * 1000,
        });
    }

    add(message: string) {
        this.messages.push(message);
    }

    clear() {
        this.messages = [];
    }
}
