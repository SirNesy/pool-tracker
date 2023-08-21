import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-snackbar',
  templateUrl: './message-snackbar.component.html',
  styleUrls: ['./message-snackbar.component.css'],
})
export class MessageSnackbarComponent {
  constructor(public messageService: MessageService) {}
  messagesArray: string[] = this.messageService.messages;
  snackBarRef = inject(MatSnackBarRef);
}
