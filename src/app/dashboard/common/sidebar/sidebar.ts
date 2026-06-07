import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  openModal(modalId: string) {
    this.openModalEvent.emit(modalId);
  }

  switchRole() {
    // Logic to switch user role
  }

  openModalEvent = output<string>();
}
