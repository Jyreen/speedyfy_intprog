import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService, EventService, AlertService } from '@app/_services';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
})
export class EventRegistrationComponent implements OnInit {
  event: any = {};
  loading = false;

  formData = {
    password: '',
    terms: false
  };

  account = this.accountService.accountValue;

  constructor(
    private accountService: AccountService,
    private eventService: EventService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('id');
      if (eventId) {
        this.loadEventDetails(eventId);
      }
    });
  }

  loadEventDetails(eventId: string) {
    this.eventService.getById(eventId).subscribe(
      data => {
        this.event = data;
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  submitForm() {
    this.loading = true;
    if (this.formData.terms) {
      console.log('Form Submitted', this.formData);
      this.loading = false;
    } else {
      this.alertService.error('You must accept the terms and conditions.');
      this.loading = false;
    }
  }
}