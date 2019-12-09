import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

//import { Money, Currencies } from 'ts-money'
//import { accounting } from 'angular-accounting'


import { TransactionService } from '../transaction.service';
import { AccountService } from '../account.service';

// javasript imports
import * as moment from 'moment';
import * as accounting from 'accounting'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  accounts: any = [];

  @Input() transactionData: any = {
    name: '',
    amount: +0.0,
    SourceId: +0,
    TargetId: +0,
    dateTime: new Date(),
    apply: true
  };

  // https://github.com/CuppaLabs/angular2-datetimepicker
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy hh:mm:ss',
    defaultOpen: false
  }

  constructor(public transactionService: TransactionService,
    public accountService: AccountService,

    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.accounts = [];
    this.accountService.getAccounts().subscribe((data: {}) => {
      this.accounts = data;
    });
  }

  // formatCurrency_TaxableValue(event) {
  //   var uy = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(event.target.value);
  //   this.tax = event.target.value;
  //   this.taxableValue = uy;
  // }

  confirmAddTransaction() {

    console.log(this.transactionData);

    //var uy = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.transactionData);
    //console.log(uy);

    var currencySettings = {
      symbol: "€",    // default currency symbol is '$'
      format: "%v %s", // controls output: %s = symbol, %v = value/number (can be object: see below)
      decimal: ",",   // decimal point separator
      thousand: ".",  // thousands separator
      precision: 2    // decimal places
    };

    var temp = +this.transactionData.amount / +100.0;

    // http://openexchangerates.github.io/accounting.js/#methods
    var amountEUR = accounting.formatMoney(temp, currencySettings);
    //var amountEUR = accounting.formatMoney(this.transactionData.amount, currencySettings);

    if (confirm("Are you sure to add the transaction " + this.transactionData.name + " Amount: " + amountEUR + " ?")) {

      //this.transactionData.amount = this.transactionData.amount * 100.0;

      this.addTransaction();
    }
  }

  transformAmount(event) {
    console.log(event);
    //this.transactionData.amount = parseFloat(event.replace('.', '').replace(',', '.'));

    var temp = this.replaceAll(event, ',', '');
    this.transactionData.amount = this.replaceAll(temp, '.', '');
    console.log('amount=' + this.transactionData.amount);
  }

  escapeRegExp(str: string) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  addTransaction() {

    // convert local date to UTC
    var dateLocal = moment(this.transactionData.dateTime);
    var dateUTC = moment.utc(dateLocal).format();
    this.transactionData.dateTime = dateUTC;

    // insert
    this.transactionService.addTransaction(this.transactionData).subscribe((result) => {
      this.router.navigate(['/accounts']);
    }, (err) => {
      console.log(err);
    });
  }
}
