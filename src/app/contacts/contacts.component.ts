import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact, ContactService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.component.html',
})
export class ContactsComponent {
  contacts$: Observable<Contact[]>;
  phoneNumber: string = '';

  constructor(private readonly _contactService: ContactService) {
    this.contacts$ = this._contactService.contacts$;
  }

  addNumber(): void {
    this._contactService.addContact(this.phoneNumber);
    this.phoneNumber = '';
  }
}
