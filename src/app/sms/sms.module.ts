import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsComponent } from './sms.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: SmsComponent }];

@NgModule({
  declarations: [SmsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class SmsModule {}
