import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, EventService, AlertService } from '@app/_services';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  account = this.accountService.accountValue;
  events: any[] = [];
  filteredEvents: any[] = [];
  searchQuery: string = '';

  constructor(
    private accountService: AccountService, 
    private router: Router, 
    private eventService: EventService, 
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: events => {
        this.events = events;
        this.filteredEvents = events; // Initialize filtered events
      },
      error: error => this.alertService.error(error)
    });
  }

  filterEvents() {
    const query = this.searchQuery.toLowerCase();

    if (!query) {
      this.filteredEvents = this.events;
    } else {
      this.filteredEvents = this.events.filter(event =>
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
  }

  joinEvent(eventId: string) {
    this.router.navigate(['/event-registration', eventId]);
  }
}