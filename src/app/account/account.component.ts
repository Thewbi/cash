import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: any = [];

  @Input() accountData: any = { name: '', amount: 0, virtual: false };

  constructor(public accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.accounts = [];
    this.accountService.getAccounts().subscribe((data: {}) => {
      this.accounts = data;

      for (var i = 0; i < this.accounts.length; i++) {

        var account = this.accounts[i];

        if (!account.totalAmount) {
          account.totalAmount = 0;
        }

        // convert cent to decimal
        account.totalAmountFormatted = account.totalAmount / 100.0;
      }
    });
  }

  addAccount() {
    this.accountService.addAccount(this.accountData).subscribe((result) => {
      result.totalAmount = 0;
      result.totalAmountFormatted = result.totalAmount / 100.0;
      this.accounts.push(result)
    }, (err) => {
      console.log(err);
    });
  }

}
