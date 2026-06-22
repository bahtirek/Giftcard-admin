import { Component } from '@angular/core';
import { AccountMeta } from "./account-meta/account-meta";

@Component({
  selector: 'app-info-col',
  imports: [AccountMeta],
  templateUrl: './info-col.html',
  styleUrl: './info-col.scss',
})
export class InfoCol {}
