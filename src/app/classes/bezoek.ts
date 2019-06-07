import { Waarneming } from './waarneming';
import { Vogelteller } from './vogelteller';
import { Telgebied } from './telgebied';

export class Bezoek {
  id: number;
  startTijd: Date;
  eindTijd: Date;
  telgebied: Telgebied;
  vogelteller: Vogelteller;
  waarnemingen: Waarneming[] = [];

  constructor(startTijd: Date, telgebied: Telgebied, vogelteller: Vogelteller, id?: number, waarnemingen?: Waarneming[], eindTijd?: Date) {
    this.id = id;
    this.startTijd = startTijd;
    this.eindTijd = eindTijd;
    this.telgebied = telgebied;
    this.vogelteller = vogelteller;

    if (typeof waarnemingen === 'undefined') {
      this.waarnemingen = [];
    } else {
      this.waarnemingen = waarnemingen;
    }
  }
}
