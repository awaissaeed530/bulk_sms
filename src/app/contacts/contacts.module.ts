import { NgModule } from '@angular/core';
import { ContactsComponent } from './contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: ContactsComponent }];

@NgModule({
  declarations: [ContactsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class ContactsModule {}
