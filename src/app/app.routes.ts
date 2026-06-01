import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { AllAccounts } from './dashboard/account/all-accounts/all-accounts';
import { MainBoard } from './dashboard/main-board/main-board';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: Dashboard,
    children: [
      { path: '', redirectTo: 'main-board', pathMatch: 'full' },
      { path: 'main-board', component: MainBoard },
      { path: 'all-accounts', component: AllAccounts }
    ]
  },
];
