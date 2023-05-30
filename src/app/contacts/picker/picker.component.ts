import { Component } from '@angular/core';
import { ContactService, DeviceContact } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-picker',
  templateUrl: 'picker.component.html',
})
export class ContactPickerComponent {
  contacts: DeviceContact[] = [
    // {
    //   name: 'Shahid',
    //   phoneNumbers: [
    //     ' 1, 03104564422',
    //     ' 2, 03424565522',
    //     ' 3, 03104565522',
    //     ' 4, 03234565522',
    //     ' 5, 03424565522',
    //     ' 6, 03424565522',
    //     ' 7, 03424565522',
    //     ' 8, 03424565522',
    //     ' 9, 03424565522',
    //     ' 10, 03424565522',
    //     ' 11, 03424565522',
    //     ' 12, 03424565522',
    //     ' 13, 03424565522',
    //     ' 14, 03424565522',
    //     ' 15, 03424565522',
    //     ' 16, 03424565522',
    //     ' 17, 03424565522',
    //     ' 18, 03424565522',
    //     ' 19, 03424565522',
    //     ' 20, 03424565522',
    //     ' 21, 03424565522',
    //     ' 22, 03424565522',
    //     ' 23, 03424565522',
    //     ' 24, 03424565522',
    //     ' 15, 03424565522',
    //     ' 16, 03424565522',
    //     ' 17, 03424565522',
    //     ' 18, 03424565522',
    //     ' 19, 03424565522',
    //     ' 20, 03424565522',
    //     ' 21, 03424565522',
    //     ' 22, 03424565522',
    //     ' 23, 03424565522',
    //     ' 24, 03424565522',
    //     ' 2, 03424565522',
    //     ' 3, 03104565522',
    //     ' 4, 03234565522',
    //     ' 5, 03424565522',
    //     ' 6, 03424565522',
    //     ' 7, 03424565522',
    //     ' 8, 03424565522',
    //     ' 9, 03424565522',
    //     ' 10, 03424565522',
    //     ' 11, 03424565522',
    //     ' 12, 03424565522',
    //     ' 13, 03424565522',
    //     ' 14, 03424565522',
    //   ],
    // },
  ];
  selectedPhoneNumbers: string[] = [];

  constructor(
    private readonly _router: Router,
    private readonly _contactService: ContactService
  ) {
    // this.loadContacts();
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
