import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'navbar',
  },
})
export class Header {
  protected location = inject(Location);

  protected back() {
    this.location.back();
  }
}
