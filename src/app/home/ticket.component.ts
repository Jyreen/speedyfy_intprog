import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketNumber: string;
  userEmail: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve ticket number and user email from route parameters
    this.route.queryParams.subscribe(params => {
      this.ticketNumber = params['ticketNumber'];
      this.userEmail = params['userEmail'];
    });
  }

}