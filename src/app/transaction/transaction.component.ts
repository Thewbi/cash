import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { TransactionService } from '../transaction.service';
import { AccountService } from '../account.service';

import * as moment from 'moment';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  accounts: any = [];

  @Input() transactionData: any = {
    name: '',
    amount: 0,
    SourceId: 0,
    TargetId: 0,
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

  addTransaction() {

    // convert local date to UTC
    var dateLocal = moment(this.transactionData.dateTime);
    var dateUTC = moment.utc(dateLocal).format();
    this.transactionData.dateTime = dateUTC;

    console.log('datetime:', this.transactionData);

    this.transactionService.addTransaction(this.transactionData).subscribe((result) => {
      this.router.navigate(['/accounts']);
    }, (err) => {
      console.log(err);
    });
  }
}
