export class Vogel {
  private id: number;
  private vogelsoort: string;
  private afkorting: string;
  private startBroedperiode: Date;
  private eindBroedperiode: Date;
  private puntenBroedperiode: number;

  constructor(id: number, vogelsoort: string, afkorting: string, startBroedperiode: Date, eindBroedperiode: Date, puntenBroedpaar: number) {
    this.id = id;
    this.vogelsoort = vogelsoort;
    this.afkorting = afkorting;
    this.startBroedperiode = startBroedperiode;
    this.eindBroedperiode = eindBroedperiode;
    this.puntenBroedperiode = puntenBroedpaar;
  }
}
