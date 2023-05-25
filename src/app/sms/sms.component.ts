import { Component } from '@angular/core';
import { SmsManager } from '@byteowls/capacitor-sms';
import { ContactService } from '../contacts/contacts.service';

@Component({
  selector: 'app-sms',
  templateUrl: 'sms.component.html',
})
export class SmsComponent {
  message = '';

  constructor(private readonly _contactsService: ContactService) {}

  send(): void {
    this._contactsService.contacts$.subscribe((contacts) => {
      SmsManager.send({
        numbers: contacts.map((contact) => contact.phoneNumber.toString()),
        text: this.message,
      })
        .then(() => {
          this.message = '';
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
}
