import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
    { path: '', component: CardsComponent },
    { path: 'leaderboard', component: LeaderboardComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
