import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactPickerComponent } from './picker/picker.component';

const routes: Routes = [
  { path: '', component: ContactsComponent },
  { path: 'picker', component: ContactPickerComponent },
];

@NgModule({
  declarations: [ContactsComponent, ContactPickerComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class ContactsModule {}
