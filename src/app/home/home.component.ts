import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, EventService, AlertService } from '@app/_services';


@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  account = this.accountService.accountValue;

  events: any[] = [];

  constructor(private accountService: AccountService, private router: Router, private eventService: EventService, private alertService: AlertService) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents()
      .subscribe({
        next: events => this.events = events,
        error: error => this.alertService.error(error)
      });
  }

  


  // Method to handle the event when the "Join" button is clicked
  joinEvent() {
    console.log('Join button clicked');
    this.router.navigate(['/event-registration']);
  }
}
