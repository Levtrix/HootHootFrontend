import { Vogel } from 'src/app/classes/vogel';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})

export class VogelService extends GenericService<Vogel, number> {
  dateToday: Date = new Date();
  vogels: Vogel[] = [];
  vogel: Vogel = new Vogel(1, 'Blauwe Reiger', 'BR', this.dateToday, this.dateToday, 5);
  vogel2: Vogel = new Vogel(2, 'Appelvink', 'AV', this.dateToday, this.dateToday, 3);

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, 'vogels');
  }

  tmpVogels(): Vogel[] {
    this.vogels = [];
    this.vogels.push(this.vogel);
    this.vogels.push(this.vogel2);

    return this.vogels;
  }
}
