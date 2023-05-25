import { Injectable } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, map, take } from 'rxjs';

const CONTACTS_KEY = 'contacts_key';

export interface Contact {
  phoneNumber: string;
}

export interface DeviceContact {
  name: string;
  phoneNumbers: string[];
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly contactsSubject = new BehaviorSubject<Contact[]>([]);
  readonly contacts$ = this.contactsSubject.asObservable();

  constructor() {
    this.getSavedContacts().then((contacts) => {
      this.contactsSubject.next(contacts);
    });
  }

  addContact(phoneNumber: string): void {
    this.contacts$
      .pipe(
        take(1),
        map((contacts) => [...contacts, { phoneNumber }])
      )
      .subscribe((contacts) => {
        this.contactsSubject.next(contacts);
        this.saveContacts();
      });
  }

  async getDeviceContacts(): Promise<DeviceContact[]> {
    return Contacts.getContacts({
      projection: { name: true, phones: true },
    }).then((res) =>
      res.contacts.map((contact) => ({
        name: contact.name?.display ?? '',
        phoneNumbers:
          (contact.phones
            ?.filter((x) => !!x)
            .map((phone) => phone.number) as string[]) ?? [],
      }))
    );
  }

  private saveContacts(): void {
    this.contacts$.pipe(take(1)).subscribe((contacts) => {
      Preferences.set({
        key: CONTACTS_KEY,
        value: JSON.stringify(contacts),
      });
    });
  }

  private async getSavedContacts(): Promise<Contact[]> {
    const res = await Preferences.get({ key: CONTACTS_KEY });
    if (res.value) return JSON.parse(res.value);
    return [];
  }
}
