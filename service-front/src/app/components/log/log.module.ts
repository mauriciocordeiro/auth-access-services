import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LogRoutingModule,
    MaterialModule
  ]
})
export class LogModule { }
