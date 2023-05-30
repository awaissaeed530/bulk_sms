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
    if (this.phoneNumber.length === 0) return;
    this._contactService.addContacts(this.phoneNumber);
    this.phoneNumber = ''
  }

  deleteNumber(number: string): void {
    this._contactService.removeContact(number);
  }
}
