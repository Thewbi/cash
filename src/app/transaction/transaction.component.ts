import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  @Input() transactionData: any = { id: '', name: '', amount: 0, SourceId: 0, TargetId: 0 };

  constructor(public transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  addTransaction() {
    this.transactionService.addTransaction(this.transactionData).subscribe((result) => {

    }, (err) => {
      console.log(err);
    });
  }

}
