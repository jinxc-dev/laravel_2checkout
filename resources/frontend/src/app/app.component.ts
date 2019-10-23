import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service'
declare const TCO: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Inline Payment Test';
  amount: number = 100;
  cardNum : string = "4000000000000002";
  expMonth: number = 12;
  expYear: number = 23;
  cvv: string = "123";
  processStatus : boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit() {
    TCO.loadPubKey('sandbox')
    // this.getRestItems();
  }

  getRestItems() : void {
    this.appService.getAll()
      .subscribe(
        restItems => {
          // this.restItems = restItems;
          // console.log(this.restItems);
        }
      )
  }

  pay() : void {
    var args = {
      sellerId: "901415064",
      publishableKey: "B32518AC-D98A-41CE-B455-2A06CA6E553B",
      ccNo: this.cardNum,
      cvv: this.cvv,
      expMonth: this.expMonth,
      expYear: this.expYear,
      amount: this.amount
    };

    this.processStatus = true;
    
    var self = this;
    TCO.requestToken(function(data) {
      self.successCallback(data);
    }, this.errorCallback, args, this);
  }

  successCallback (data) : void{
    var token = data.response.token.token;
    var address = {
      name : 'Joe Flagster',
      addrLine1 : '123 Main Street',
      city : 'Townsville',
      state : 'Ohio',
      zipCode : '43206',
      country : 'USA',
      email : 'testingtester@2co.com',
      phoneNumber : '555-555-5555'
    }

    var postData = {token, address, amount: this.amount};
    console.log(postData);
    var self = this;
    this.appService.payProcess(postData)
      .subscribe(result => {
        console.log(result);
        self.processStatus = false;
      })
  }

  errorCallback (data) {
    console.log('error');
    console.log(data);
  }
}
