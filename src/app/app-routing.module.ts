import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [

  {
    path: 'accounts',
    component: AccountComponent,
    data: { title: 'Account List' }
  },
  {
    path: 'account-details/:id',
    component: AccountDetailsComponent,
    data: { title: 'Account Details' }
  },
  {
    path: 'transactions',
    component: TransactionComponent,
    data: { title: 'Transaction' }
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
