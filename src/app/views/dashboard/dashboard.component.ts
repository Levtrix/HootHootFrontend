import { Vogelteller } from './../../classes/vogelteller';
import { Bezoek } from './../../classes/bezoek';
import { TelgebiedService } from './../../services/telgebied.service';
import { Telgebied } from './../../classes/telgebied';
import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() telgebied: Telgebied;
  dateToday: Date = new Date();
  vogelteller: Vogelteller = new Vogelteller(1, 'Steve', 'Steve01');
  bezoek: Bezoek = new Bezoek(this.dateToday, this.telgebied, this.vogelteller, 1);

  constructor(
    private telgebiedService: TelgebiedService,
  ) { }

  ngOnInit() {
    this.getTelgebied();

    // TODO: Add code to show all popups on the maps upon loading
    const southWest = L.latLng(this.telgebied.southWestLat, this.telgebied.southWestLng);
    const northEast = L.latLng(this.telgebied.northEastLat, this.telgebied.northEastLng);
    const bounds = L.latLngBounds(southWest, northEast);
    const popup = L.popup();

    const map = L.map('map', {
      maxBounds: bounds,
      maxZoom: 19,
      minZoom: 10
    }).setView([40.7351, -74.1718], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    map.fitBounds(bounds);

    map.on('click', onMapClick);

    function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          .setContent('You clicked the map at ' + e.latlng.toString())
          .openOn(map);
    }
  }

  getTelgebied(): void {
    this.telgebied = this.telgebiedService.tempTelpgebied();

    this.telgebied.bezoeken.push(this.bezoek);
  }

  addWaarneming(): void {
    // Implement this method to add a waarneming with the current selected lat + lng
  }
}
