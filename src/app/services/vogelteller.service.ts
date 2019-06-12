import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Vogelteller } from './../classes/vogelteller';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VogeltellerService extends GenericService<Vogelteller, number>{
  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, 'vogeltellers');
  }
}
