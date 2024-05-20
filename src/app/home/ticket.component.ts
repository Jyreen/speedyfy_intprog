import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, AccountService} from '@app/_services';
import { Account } from '../_models/account';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html'
})
export class TicketComponent implements OnInit {
  event: any = {};
  account: Account = new Account();
  ticketNumber: string;
  userEmail: string;


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const eventId = params['eventId'];
      this.ticketNumber = params['ticketNumber'];
      this.userEmail = params['userEmail'];

    });
  }

  loadEventDetails(eventId: string) {
    this.eventService.getById(eventId).subscribe(
      data => {
        this.event = data;
      },
      error => {
        console.error('Error loading event details', error);
      }
    );
  }

}