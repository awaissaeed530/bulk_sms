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

  addContacts(...phoneNumbers: string[]): void {
    this.contacts$
      .pipe(
        take(1),
        map((contacts) => [
          ...contacts,
          ...phoneNumbers.map((phoneNumber) => ({ phoneNumber })),
        ])
      )
      .subscribe((contacts) => {
        this.contactsSubject.next(contacts);
        this.saveContacts();
      });
  }

  removeContact(phoneNumber: string): void {
    this.contacts$
      .pipe(
        take(1),
        map((contacts) => {
          const index = contacts.findIndex(
            (x) => x.phoneNumber === phoneNumber
          );
          contacts.splice(index, 1);
          return contacts;
        })
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
          Array.from(
            new Set(
              contact.phones
                ?.filter((x) => !!x)
                .map((phone) => {
                  if (!phone.number) return '';
                  // Remove white spaces
                  return phone.number.replace(/\s+/g, '');
                })
            )
          ) ?? [],
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
