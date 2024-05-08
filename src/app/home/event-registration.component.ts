import { Component } from '@angular/core';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
})
export class EventRegistrationComponent {
    formData = {
    name: '',
    contactNumber: '',
    email: '',
    address: ''
  };

  constructor() { }

  submitForm() {
    // Handle form submission here
    console.log('Form submitted:', this.formData);
  }
}
