import { Component, ChangeDetectionStrategy } from '@angular/core';

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
export class Header {}
