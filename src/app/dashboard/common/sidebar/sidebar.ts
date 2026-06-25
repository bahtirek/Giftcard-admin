import { Component, input, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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
  openModal(modalId: string) {
    this.openModalEvent.emit(modalId);
  }

  switchRole() {
    // Logic to switch user role
  }

  goToNewGiftCard(){
    this.router.navigate(['dashboard/create-gift-card'])
  }

  openModalEvent = output<string>();
}
