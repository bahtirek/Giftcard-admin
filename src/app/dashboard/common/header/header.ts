import { Component } from '@angular/core';

@Component({
  selector: 'header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    'class': 'navbar'
  },
})
export class Header {}
