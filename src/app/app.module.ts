import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsListComponent } from './admin/admin-products-list/admin-products-list.component';
import { AdminOrdersListComponent } from './admin/admin-orders-list/admin-orders-list.component';



@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    NavBarComponent,
    HomeComponent,
    ProductsListComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsListComponent,
    AdminOrdersListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductsListComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'my-orders', component: MyOrdersComponent},
      {path: 'check-out', component: CheckOutComponent},
      {path: 'order-success', component: OrderSuccessComponent},
      {path: 'login', component: LoginComponent},
      {path: 'admin/products', component: AdminProductsListComponent},
      {path: 'admin/orders', component: AdminOrdersListComponent},
      {path: '**', component: HomeComponent}
    ]),
    AngularFireModule.initializeApp(environment.firebase, 'eCommerAppAngular'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
