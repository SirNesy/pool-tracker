import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit, AfterViewInit {
    players: Player[] = [];
    dataSource = new MatTableDataSource(this.players);
    constructor(private playerService: PlayerService, private _liveAnnouncer: LiveAnnouncer) {}
    @ViewChild(MatSort) sort!: MatSort;
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }

    displayedColumns: string[] = ['id', 'name', 'win', 'loss', 'point'];
    ngOnInit(): void {
        this.playerService.leaderboardData$.subscribe((players) => (this.players = players));
        this.players.sort((a, b) => b.point! - a.point!);
        this.dataSource.data = this.players;
    }
    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce(`Sorting cleared`);
        }
    }
}
