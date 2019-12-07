import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(public accountService: AccountService,
    public accountDetailsService: AccountDetailsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    // load the virtual account
    this.accountDetailsService.getAccount(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.account = data;
    });

    // load all transactions this account is involved in
    this.accountService.addAccount(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.transactions = data;
    });

  }

}
