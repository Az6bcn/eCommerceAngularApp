import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { Router, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot([
      {path: 'shopping-cart', component: ShoppingCartComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
