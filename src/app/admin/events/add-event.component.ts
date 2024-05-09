import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { EventService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-event.component.html' })
export class AddEventComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    isAddMode = true;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private eventService: EventService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            date: ['', Validators.required],
            location: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required],
            price: ['', Validators.required]
        });

        // Check if it's an edit mode based on the route params
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isAddMode = false;
                // You can load event details here for editing
            }
        });
    }

    // Convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // Reset alerts on submit
        this.alertService.clear();

        // Stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createEvent();
        } else {
            this.updateEvent();
        }
    }

    private createEvent() {
        this.eventService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Event created successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['/events']);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateEvent() {
        // Implement update logic here if needed
    }

    onCancel() {
        this.router.navigate(['/events']);
    }
}