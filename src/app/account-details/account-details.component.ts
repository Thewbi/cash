import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { AccountService } from '../account.service';
import { AccountDetailsService } from '../account-details.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  transactions: any = [];

  account: any;

  columns: any = [
    'Id',
    'Name',
    'Amount',
    'Amount Formatted',
    'Source Account',
    'Target Account',
    'DateTime UTC',
    'DateTime Local'
  ];

  constructor(public accountService: AccountService,
    public accountDetailsService: AccountDetailsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    var locale = window.navigator.language;
    console.log(locale);
    moment.locale(locale);

    // load the virtual account
    this.accountDetailsService.getAccount(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.account = data;

      // convert cent to decimal
      this.account.totalAmountFormatted = this.account.totalAmount / 100.0;
    });

    // load all transactions this account is involved in
    this.accountDetailsService.getTransactions(this.route.snapshot.params['id']).subscribe((data: {}) => {

      this.transactions = data;

      for (var i = 0; i < this.transactions.length; i++) {

        var transaction = this.transactions[i];

        // convert to user's local timezone and format it
        var utcCreatedAt = moment.utc(transaction.createdAt);
        var localCreatedAt = moment(utcCreatedAt).local().format('L LTS');
        transaction.localCreatedAt = localCreatedAt;

        // convert to user's local timezone and format it
        console.log(transaction.dateTime);
        var utcDateTime = moment.utc(transaction.dateTime);
        var localDateTime = moment(utcDateTime).local().format('L LTS');
        transaction.localDateTime = localDateTime;

        console.log('transaction: ', transaction);

        // convert cent to decimal
        transaction.amountFormatted = transaction.amount / 100.0;
      }
    });
  }
}
