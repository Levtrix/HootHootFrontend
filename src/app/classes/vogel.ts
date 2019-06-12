export class Vogel {
  id: number;
  vogelsoort: string;
  afkorting: string;
  startBroedperiode: Date;
  eindBroedperiode: Date;
  puntenBroedpaar: number;

// tslint:disable-next-line: max-line-length
  constructor(id?: number, vogelsoort?: string, afkorting?: string, startBroedperiode?: Date, eindBroedperiode?: Date, puntenBroedpaar?: number) {
    this.id = id;
    this.vogelsoort = vogelsoort;
    this.afkorting = afkorting;
    this.startBroedperiode = startBroedperiode;
    this.eindBroedperiode = eindBroedperiode;
    this.puntenBroedpaar = puntenBroedpaar;
  }
}
