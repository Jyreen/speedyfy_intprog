import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/_services';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  account = this.accountService.accountValue;

  constructor(private accountService: AccountService, private router: Router) { }

  // Method to handle the event when the "Join" button is clicked
  joinEvent() {
    console.log('Join button clicked');
    this.router.navigate(['/event-registration']);
  }
}
