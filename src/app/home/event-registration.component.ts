import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService, EventService, AlertService } from '@app/_services';


import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



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
    private route: ActivatedRoute,
    private http: HttpClient // Add this line
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
  
      // Send form data to the backend for validation
      this.http.post<any>('http://localhost:4000/validate', this.formData)
        .pipe(
          catchError(error => {
            this.alertService.error('An error occurred during form submission.');
            return throwError(error);
          })
        )
        .subscribe(response => {
          // Assuming the backend responds with validation success and user email
          const userEmail = response.email;
  
          // Send email to the user
          this.http.post<any>('http://localhost:4000/send-registration-confirmation', { email: userEmail })
            .pipe(
              catchError(error => {
                this.alertService.error('An error occurred while sending the email.');
                return throwError(error);
              })
            )
            .subscribe(() => {
              this.alertService.success('Registration successful. Email sent.');
              this.loading = false;
            });
        });
    } else {
      this.alertService.error('You must accept the terms and conditions.');
      this.loading = false;
    }
  }
  
}
