import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { VogeltellerService } from './../../services/vogelteller.service';
import { VogelService } from './../../services/vogel.service';
import { SoortWaarneming } from './../../enums/soortWaarneming';
import { Waarneming } from './../../classes/waarneming';
import { Vogelteller } from './../../classes/vogelteller';
import { Bezoek } from './../../classes/bezoek';
import { TelgebiedService } from './../../services/telgebied.service';
import { Telgebied } from './../../classes/telgebied';
import { Component, OnInit, Input } from '@angular/core';
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
  vogels: Vogel[];
  vogelteller: Vogelteller;
  popupform: String;

  bezoek: Bezoek = new Bezoek(1, this.dateToday, this.telgebied, this.vogelteller);
  tmpSoortWaarneming: SoortWaarneming;
  w: Waarneming;
  lat: number;
  lng: number;

  constructor(
    private telgebiedService: TelgebiedService,
    private vogelService: VogelService,
    private vogeltellerService: VogeltellerService,
  ) {   }

  ngOnInit() {
    this.getTelgebied();
    this.getVogelteller();

    // TODO: Add code to show all popups on the maps upon loading
    const southWest = L.latLng(this.telgebied.southWestLat, this.telgebied.southWestLng);
    const northEast = L.latLng(this.telgebied.northEastLat, this.telgebied.northEastLng);
    const bounds = L.latLngBounds(southWest, northEast);

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

      console.log(this.lat, this.lng);
      var marker = L.marker([this.lat, this.lng]);
      marker.addTo(map);
      // TODO: Fix popupform
      marker.bindPopup(this.popupform, {
        keepInView: true,
        closeButton: false
      }).openPopup();

    }
  }

  getTelgebied(): void {
    // TODO: Needs to be changed to work with the database
    this.telgebied = this.telgebiedService.tempTelpgebied();

    this.telgebied.bezoeken.push(this.bezoek);
  }

  getVogels(): Variable {
    var vogelsString;

    this.vogelService.getAll()
      .subscribe(serviceVogels => {
        this.vogels = [];

        for(let vogel of serviceVogels) {
          // tslint:disable-next-line: max-line-length
          this.vogels.push(new Vogel(vogel.id, vogel.vogelsoort, vogel.afkorting, vogel.startBroedperiode, vogel.eindBroedperiode, vogel.puntenBroedpaar));
        }

        for (let vogel of this.vogels) {
            vogelsString = vogelsString + '<option value = "' + vogel + '">' + vogel.vogelsoort + '</option>';
          }
      });

    return vogelsString;
  }

  getVogelteller() {
    this.vogeltellerService.getById(1)
      .subscribe(serviceVogelteller => {
        this.vogelteller = new Vogelteller(serviceVogelteller.id, serviceVogelteller.naam, serviceVogelteller.gebruikersnaam);

        this.popupform = new String("test");
        this.popupform = this.buildVogeltellerPopupForm();
      });
  }

  onVogelChange(vogel: Vogel): void {
    this.vogel = vogel;
  }

  onSoortWaarnemingChange(soortWaarneming: SoortWaarneming) {
    this.tmpSoortWaarneming = soortWaarneming;
  }

  addWaarneming(): void {
    this.w = this.buildNewWaarnemingObject();

    this.bezoek.waarnemingen.push(this.w);
  }

  private buildNewWaarnemingObject(): Waarneming {
    return new Waarneming(this.dateToday, this.vogel, this.tmpSoortWaarneming, this.lat, this.lng, this.bezoek.waarnemingen.length);
  }

  private buildVogeltellerPopupForm(): string {
    var form = '<h4>Waarneming toevoegen/wijzigen</h4>' +
    '<div>' +
    '<label>Vogelteller: ' + this.vogelteller.naam + '</label><br>' +
    '<label>Vogel:</label><br>' +
    '<select [(ngModel)]="vogels" id = "vogellist" (change)="onVogelChange(vogel)">';

    form = form + this.getVogels() + '</select><br>' +
    '<label>Soort waarnemeing:</label><br>' +
    '<select [(ngModel)]="soortWaarneming" (change)="onSoortWaarnemingChange(soortWaarneming)">' +
      '<option value="soortWaarneming.VogelAanwezig">VogelAanwezig</option>' +
      '<option value="soortWaarneming.TerritoriumIndicerend">TerritoriumIndicerend</option>' +
      '<option value="soortWaarneming.NestIndicerend">NestIndicerend</option>' +
    '</select><br>' +
    '<button (click)="addWaarneming()">Toevoegen</button>' +
    '</div><br>';

    return form;
  }
}
