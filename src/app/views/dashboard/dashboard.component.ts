import { VogeltellerService } from './../../services/vogelteller.service';
import { VogelService } from './../../services/vogel.service';
import { SoortWaarneming } from './../../enums/soortWaarneming';
import { Waarneming } from './../../classes/waarneming';
import { Vogelteller } from './../../classes/vogelteller';
import { Bezoek } from './../../classes/bezoek';
import { TelgebiedService } from './../../services/telgebied.service';
import { Telgebied } from './../../classes/telgebied';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Vogel } from 'src/app/classes/vogel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  telgebied: Telgebied;
  soortWaarneming: SoortWaarneming;
  dateToday: Date = new Date();
  vogel: Vogel = new Vogel();
  vogels: Vogel[] = [];
  vogelteller: Vogelteller = new Vogelteller();

  bezoek: Bezoek = new Bezoek(this.dateToday, this.telgebied, this.vogelteller, 1);
  tmpSoortWaarneming: SoortWaarneming;
  w: Waarneming;
  lat: number;
  lng: number;

  constructor(
    private telgebiedService: TelgebiedService,
    private vogelService: VogelService,
    private vogeltellerService: VogeltellerService,
  ) {  }

  async ngOnInit() {
    this.getTelgebied();
    await this.getVogelteller();
    await this.getVogels();
    console.log(this.vogelteller.naam)
    console.log('why am i first!?');

    // TODO: Add code to show all popups on the maps upon loading
    const southWest = L.latLng(this.telgebied.southWestLat, this.telgebied.southWestLng);
    const northEast = L.latLng(this.telgebied.northEastLat, this.telgebied.northEastLng);
    const bounds = L.latLngBounds(southWest, northEast);
    var popupForm = '<h4>Waarneming toevoegen/wijzigen</h4>' +
      '<div>' +
      '<label>Vogelteller: ' + this.vogelteller.naam + '</label><br>' +
      '<label>Vogel:</label><br>' +
      '<select [(ngModel)]="vogel" id = "vogellist" (change)="onVogelChange(vogel)">';

    for (let vogel of this.vogels) {
      popupForm = popupForm + '<option value = "' + vogel + '">' + vogel.vogelsoort + '</option>';
    }

    popupForm = popupForm + '</select><br>' +
    '<label>Soort waarnemeing:</label><br>' +
    '<select [(ngModel)]="soortWaarneming" (change)="onSoortWaarnemingChange(soortWaarneming)">' +
      '<option value="soortWaarneming.VogelAanwezig">VogelAanwezig</option>' +
      '<option value="soortWaarneming.TerritoriumIndicerend">TerritoriumIndicerend</option>' +
      '<option value="soortWaarneming.NestIndicerend">NestIndicerend</option>' +
    '</select><br>' +
    '<button (click)="addWaarneming()">Toevoegen</button>' +
    '</div><br>';

    const map = L.map('map', {
      maxBounds: bounds,
      maxZoom: 19,
      minZoom: 10
    }).setView([40.7351, -74.1718], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

    map.fitBounds(bounds);

    for(let waarneming of this.bezoek.waarnemingen) {
      // tslint:disable-next-line: max-line-length
      L.marker([waarneming.lat, waarneming.lng]).addTo(map).bindPopup(waarneming.vogel.afkorting + ', ' + waarneming.soortWaarneming);
    }

    map.on('click', onMapClick);

    function onMapClick(e) {
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;

      // TODO: Rework this to add a marker onMapClick with a form in the popup
      console.log(this.lat, this.lng);
      var marker = L.marker([this.lat, this.lng]);
      marker.addTo(map);
      marker.bindPopup(popupForm, {
        keepInView: true,
        closeButton: false
      }).openPopup();

    }
  }

  async getTelgebied() {
    // TODO: Needs to be changed to work with the database
    this.telgebied = this.telgebiedService.tempTelpgebied();

    this.telgebied.bezoeken.push(this.bezoek);
  }

  async getVogels() {
    await this.vogelService.getAll()
      .subscribe(vogels => this.vogels = vogels);
  }

  async getVogelteller() {
    await this.vogeltellerService.getById(1)
      .subscribe(vogelteller => this.vogelteller = vogelteller);
  }

  onVogelChange(vogel: Vogel): void {
    this.vogel = vogel;
  }

  onSoortWaarnemingChange(soortWaarneming: SoortWaarneming): void {
    this.tmpSoortWaarneming = soortWaarneming;
  }

  addWaarneming(): void {
    this.w = this.buildNewWaarnemingObject();

    this.bezoek.waarnemingen.push(this.w);
  }

  private buildNewWaarnemingObject(): Waarneming {
    return new Waarneming(this.dateToday, this.vogel, this.tmpSoortWaarneming, this.lat, this.lng, this.bezoek.waarnemingen.length);
  }
}
