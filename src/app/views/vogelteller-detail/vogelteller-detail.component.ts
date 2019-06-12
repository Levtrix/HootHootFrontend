import { Vogelteller } from './../../classes/vogelteller';
import { Component, OnInit } from '@angular/core';
import { VogeltellerService } from 'src/app/services/vogelteller.service';

@Component({
  selector: 'app-vogelteller-detail',
  templateUrl: './vogelteller-detail.component.html',
  styleUrls: ['./vogelteller-detail.component.css']
})
export class VogeltellerDetailComponent implements OnInit {
  vogelteller: Vogelteller;

  constructor(
    private vogeltellerService: VogeltellerService
  ) { }

  ngOnInit() {
    this.getVogelteller();
  }

  getVogelteller(): void {
    this.vogeltellerService.getById(1)
      .subscribe(vogelteller => {
        this.vogelteller = new Vogelteller(vogelteller.id, vogelteller.naam, vogelteller.gebruikersnaam);
      });
  }
}
