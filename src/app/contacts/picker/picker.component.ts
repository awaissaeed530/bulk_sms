import { Component } from '@angular/core';
import { ContactService, DeviceContact } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-picker',
  templateUrl: 'picker.component.html',
})
export class ContactPickerComponent {
  contacts: DeviceContact[] = [

  ];
  selectedPhoneNumbers: string[] = [];

  constructor(
    private readonly _router: Router,
    private readonly _contactService: ContactService
  ) {
    this.loadContacts();
  }

  onChecked(number: string, checked: boolean): void {
    if (checked) this.selectedPhoneNumbers.push(number);
    else {
      const index = this.selectedPhoneNumbers.indexOf(number);
      this.selectedPhoneNumbers.splice(index, 1);
    }
  }

  save(): void {
    this._contactService.addContacts(...this.selectedPhoneNumbers);
    this._router.navigateByUrl('/contacts');
  }

  private loadContacts(): void {
    this._contactService.getDeviceContacts().then((contacts) => {
      this.contacts = contacts;
    });
  }
}
