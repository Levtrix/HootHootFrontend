import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var southWest = L.latLng(40.712, -74.227);
    var northEast = L.latLng(40.774, -74.125);
    var bounds = L.latLngBounds(southWest, northEast);
    var popup = L.popup();

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
}
