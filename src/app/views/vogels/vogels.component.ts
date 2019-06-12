import { VogelService } from './../../services/vogel.service';
import { Vogel } from 'src/app/classes/vogel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vogels',
  templateUrl: './vogels.component.html',
  styleUrls: ['./vogels.component.css']
})
export class VogelsComponent implements OnInit {
  vogels: Vogel[] = [];

  constructor(private vogelService: VogelService) { }

  ngOnInit() {
    this.getVogels();
  }

  getVogels(): void {
    this.vogelService.getAll()
      .subscribe(vogels => {
        this.vogels = [];
        this.vogels = vogels;
      });
  }
}
