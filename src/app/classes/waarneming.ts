import { SoortWaarneming } from './../enums/soortWaarneming';
import { Vogel } from './vogel';
export class Waarneming {
  id: number;
  datumWaarneming: Date;
  vogel: Vogel;
  soortWaarneming: SoortWaarneming;
  lat: number;
  lng: number;

  constructor(datumWaarneming: Date, vogel: Vogel, soortWaarneming: SoortWaarneming, lat: number, lng: number, id?: number) {
    this.id = id;
    this.datumWaarneming = datumWaarneming;
    this.vogel = vogel;
    this.soortWaarneming = soortWaarneming;
    this.lat = lat;
    this.lng = lng;
  }
}
