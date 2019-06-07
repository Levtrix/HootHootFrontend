import { Vogel } from 'src/app/classes/vogel';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})

export class VogelService extends GenericService<Vogel, number> {
    constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, 'vogels');
  }
}
