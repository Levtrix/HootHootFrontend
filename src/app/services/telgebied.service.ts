import { Bezoek } from './../classes/bezoek';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Telgebied } from './../classes/telgebied';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})

export class TelgebiedService extends GenericService<Telgebied, number> {
  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, 'telgebieden');
  }

  tempTelpgebied(): Telgebied {
    return new Telgebied('Test telgebied', 'test kaart', 40.712, -74.227, 40.774, -74.125, 1);
  }
}
