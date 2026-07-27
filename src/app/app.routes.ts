import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { MainBoard } from './dashboard/main-board/main-board';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: Dashboard,
    canActivate: [authGuard],
    children: [
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
      },
      {
        path: 'edit-gift-card/:id',
        loadComponent: () => import('./dashboard/gift-card/edit-gift-card/edit-gift-card').then(c => c.EditGiftCard)
      },
      {
        path: 'gift-card-details/:id',
        loadComponent: () => import('./dashboard/gift-card/gift-card-details/gift-card-details').then(c => c.GiftCardDetails)
      },
      {
        path: 'update-profile',
        loadComponent: () => import('./dashboard/settings/update-profile/update-profile').then(c => c.UpdateProfile)
      },
      {
        path: 'add-user',
        loadComponent: () => import('./dashboard/settings/users/add-user/add-user').then(c => c.AddUser)
      },
      {
        path: 'update-user',
        loadComponent: () => import('./dashboard/settings/users/update-user/update-user').then(c => c.UpdateUser)
      },
      {
        path: 'user-details/:userData',
        loadComponent: () => import('./dashboard/settings/users/user-details/user-details').then(c => c.UserDetails)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(c => c.Login)
  }
];
