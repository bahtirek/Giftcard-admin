import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-hero',
  imports: [],
  templateUrl: './account-hero.html',
  styleUrl: './account-hero.scss',
})
export class AccountHero {
  router = inject(Router);

  onAddCardButtonClicked() {
    this.router.navigate(['dashboard/create-gift-card']);
  }
}
