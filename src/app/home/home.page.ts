import { Clipboard } from '@capacitor/clipboard';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /** Aktuelle Auswahl des Zeichenvorrats für Two-Way-Binding. */
  public zeichenvorrat : string = "kleinundgrossbuchstaben";

  /** Aktuelle Auswahl des Sicherheitslevel für Two-Way-Binding. */
  public sicherheitslevel : string = "mittel";

  /** Erzeugtes Passwort, an TextArea gebunden. */
  public passwort : string = "";


  /**
   * Event-Handler für Button "Passwort erzeugen".
   */
  public async onPasswortErzeugen() {

    let zeichenvorrat = "";
    switch (this.zeichenvorrat) {

      case "zahlen":
        zeichenvorrat = "0123456789";
      break;

      case "kleinbuchstaben":
        zeichenvorrat = "abcdefghijklmnopqrstuvwxyz";
      break;

      case "kleinundgrossbuchstaben":
        zeichenvorrat = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      break;

      case "buchstabenundzahlen":
        zeichenvorrat = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      break;

      default:
        console.log(`Unerwarteter Wert für ausgewählten Zeichenvorrat: ${this.zeichenvorrat}`);
        zeichenvorrat = "a";
    }


    let passwortLaenge = 0;
    switch (this.sicherheitslevel) {

      case "schwach":
        passwortLaenge = 8;
      break;

      case "mittel":
        passwortLaenge = 15;
      break;

      case "stark":
        passwortLaenge = 25;
      break;

      case "sehrstark":
        passwortLaenge = 40;
      break;

      default:
        console.log(`Unerwarteter Wert für ausgewähltes Sicherheits-Level: ${this.sicherheitslevel}`);
        passwortLaenge = 1;
    }

    this.passwortErzeugen(zeichenvorrat, passwortLaenge);
  }

  /**
   * Event-Handler für Button "In Zwischenablage kopieren".
   */
  public async onKopieren() {

    await Clipboard.write({ string: this.passwort });
  }

  /**
   * Eigentliche Erzeugung des Passworts.
   *
   * @param zeichenvorrat String mit Zeichen, die im Passwort möglich sind
   *
   * @param laenge Länge des zu erzeugenden Passworts
   */
  private passwortErzeugen(zeichenvorrat: string, laenge: number) {

    const anzahlZeichen = zeichenvorrat.length;

    this.passwort = "";

    for (let i = 0; i < laenge; i++) {

      let zufallsIndex   = Math.floor(Math.random() * anzahlZeichen);
      let zufallsZeichen = zeichenvorrat.charAt(zufallsIndex);

      this.passwort += zufallsZeichen;
    }
  }

}
