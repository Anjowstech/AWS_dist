import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class NavMenuComponent implements OnInit {

  isExpanded = false;
  public screenHeight!: number;
  public screenWidth!: number;
  textlogo: boolean = true;
  logo: boolean = false;
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  ngOnInit() {
    this.screenHeight = (window.screen.height);
    this.screenWidth = (window.screen.width);
    if (this.screenWidth >= 500) {
      this.textlogo = false;
      this.logo = true;

    }
    else {
      this.textlogo = true;
      this.logo = false;
    }
  }
}
