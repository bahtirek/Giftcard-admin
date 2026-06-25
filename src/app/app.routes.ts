import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { MainBoard } from './dashboard/main-board/main-board';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: Dashboard,
    children: [
      /* { path: '', redirectTo: 'main-board', pathMatch: 'full' }, */
      { path: '', component: MainBoard },
      {
        path: 'all-accounts',
        loadComponent: () => import('./dashboard/account/all-accounts/all-accounts').then(c => c.AllAccounts)
      },
      {
        path: 'all-accounts/account-details/:id',
        loadComponent: () => import('./dashboard/account/account-details/account-details').then(c => c.AccountDetails)
      },
      {
        path: 'all-gift-cards',
        loadComponent: () => import('./dashboard/gift-card/all-gift-cards/all-gift-cards').then(c => c.AllGiftCards)
      },
      {
        path: 'all-orders',
        loadComponent: () => import('./dashboard/order/all-orders/all-orders').then(c => c.AllOrders)
      },
      {
        path: 'settings',
        loadComponent: () => import('./dashboard/settings/settings').then(c => c.Settings)
      },
      {
        path: 'create-account',
        loadComponent: () => import('./dashboard/account/create-account/create-account').then(c => c.CreateAccount)
      },
      {
        path: 'edit-account',
        loadComponent: () => import('./dashboard/account/edit-account/edit-account').then(c => c.EditAccount)
      },
      {
        path: 'create-gift-card',
        loadComponent: () => import('./dashboard/gift-card/create-gift-card/create-gift-card').then(c => c.CreateGiftCard)
      }
    ]
  },
];
