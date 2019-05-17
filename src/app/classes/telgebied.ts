import { Bezoek } from './bezoek';

export class Telgebied {
  id: number;
  naam: string;
  kaart: string;
  bezoeken: Bezoek[] = [];
  southWestLat: number;
  southWestLng: number;
  northEastLat: number;
  northEastLng: number;

// tslint:disable-next-line: max-line-length
  constructor(naam: string, kaart: string, southWestLat: number, southWestLng: number, northEastLat: number, northEastLng: number, id?: number, bezoeken?: Bezoek[]) {
    this.id = id;
    this.naam = naam;
    this.kaart = kaart;
    this.southWestLat = southWestLat;
    this.southWestLng = southWestLng;
    this.northEastLat = northEastLat;
    this.northEastLng = northEastLng;

    if (typeof bezoeken === 'undefined') {
      this.bezoeken = [];
    } else {
      this.bezoeken = bezoeken;
    }
  }
}
