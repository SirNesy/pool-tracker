import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
    // Lazy loading can only be done when each component has its related module
    // {
    //     path: '',
    //     component: SidenavComponent,
    //     children: [
    //         {
    //             path: '',
    //             loadChildren: () => import('./cards/cards.component').then((m) => m.CardsComponent),
    //         },
    //         {
    //             path: 'leaderboard',
    //             loadChildren: () => import('./leaderboard/leaderboard.component').then((m) => m.LeaderboardComponent),
    //         },
    //     ],
    // },
    { path: '', component: CardsComponent },
    { path: 'leaderboard', component: LeaderboardComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
