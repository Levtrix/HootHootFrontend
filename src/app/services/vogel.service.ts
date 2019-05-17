import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Vogel } from './../classes/vogel';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})

export class VogelService extends GenericService<Vogel, number> {
  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, 'vogels/');
  }
}
