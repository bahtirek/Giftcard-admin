import { Component, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'sidebar',
  },
})

export class Sidebar {
  private router = inject(Router)
  private accountService = inject(AccountService)

  openModal(modalId: string) {
    this.openModalEvent.emit(modalId);
  }

  switchRole() {
    // Logic to switch user role
  }

  goToNewGiftCard(){
    this.accountService.resetAccountId();
    this.router.navigate(['dashboard/create-gift-card'])
  }

  openModalEvent = output<string>();
}
