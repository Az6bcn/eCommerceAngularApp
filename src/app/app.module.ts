import { CategoryService } from './Services/category.service';
import { AdminGuard } from './../Guards/admin-guard.service';
import { AuthGuard } from './../Guards/auth-guard.service';
import { AuthService } from './Services/auth-service.service';
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
import { UserService } from './Services/user-service.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AdminNewProductFormComponent } from './admin-new-product-form/admin-new-product-form.component';
import { SelectModule } from 'ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableListComponent } from './Tables/data-table/data-table-list.component';
import { DataTableModule } from 'angular-6-datatable';

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
    LoginComponent,
    AdminNewProductFormComponent,
    DataTableListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsListComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },

      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/products/new',
        component: AdminNewProductFormComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsListComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersListComponent,
        canActivate: [AuthGuard, AdminGuard]
      },

      { path: '**', component: HomeComponent }
    ]),
    AngularFireModule.initializeApp(environment.firebase, 'eCommerAppAngular'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    SelectModule,
    DataTableModule
  ],
  providers: [AuthService, UserService, AuthGuard, AdminGuard, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule {}
