import { Component, EventEmitter, Output } from '@angular/core';
import { Player } from '../player';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
    @Output() toggleSideNav: EventEmitter<void> = new EventEmitter<void>();
    // @Output() toggleSideNav: EventEmitter<Player> = new EventEmitter<Player>();
}
