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

    console.log('getAccounts');

    this.accounts = [];

    this.accountService.getAccounts().subscribe((data: {}) => {

      console.log(data);
      this.accounts = data;
    });
  }

  addAccount() {

    this.accountService.addAccount(this.accountData).subscribe((result) => {

    }, (err) => {
      console.log(err);
    });
  }

}
