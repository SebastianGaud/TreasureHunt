import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Consts } from "../../../Consts";
import { IMilestone } from "../../model/milestone/milestone.d";
import { IMilestoneService } from "./milestone-service";

@Injectable()
export class FakeMilestoneService implements IMilestoneService {

  constructor() { }


  getMilestones(): Observable<IMilestone[]> {
    console.log("[Fake Milestone service]: Start");
    let obs = Observable.of(this.milestones).delay(Consts.FakeTimeoutMillis);
    console.log("[Fake Milestone service]: End");
    return obs;
  }

  milestones: Array<IMilestone> = [
    {
      "id": "1",
      "opened": false,
      "name": "Cinema Ariston",
      "question": "In tempi antichi ospitavo i fedeli...oggi gli spettatori….",
      "hint": "Sono stata la prima chiesa del paese",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "2",
      "opened": false,
      "name": "Catacombe",
      "question": "Ho un cupo soprannome: “le catacombe”...perchè sotto questa strada sorgeva l'antico cimitero del paese...",
      "hint": "Il cimitero sorgeva sempre accanto alla (vecchia) chiesa",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "3",
      "opened": false,
      "name": "Vecchie Mura",
      "question": "Anticamente i miei vecchi sassi hanno difeso il castello...poi per qualche tempo hanno conservato i primi prodotti del salumificio Villani, che era sorto qui...",
      "hint": "Di noi restano alcuni scorci...e ora ospitiamo anche lavoratori in divisa azzurra",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "4",
      "opened": false,
      "name": "Lavatoi",
      "question": "Quando non c'era la lavatrice, le donne si radunavano qui a lavare e stendere i panni in compagnia",
      "hint": "Procedi verso una fabbrica il cui nome richiama un famoso cantante lirico del nostro territorio... e cerca un luogo attrezzato per lavare...",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "5",
      "opened": false,
      "name": "Parco Petrini",
      "question": "Come Presidente della Repubblica, dicono che io sia rimasto nel cuore degli italiani….e mi hanno intitolato anche un parco del paese",
      "hint": "Sono posizionato tra due campi sportivi...",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "6",
      "opened": false,
      "name": "Scuole Primarie Don Milani",
      "question": "Ho visto crescere tantissime generazioni di bambini di Castelnuovo….ma in tempo di guerra servivo anche come ospedale",
      "hint": "Il mio nome è intitolato a un sacerdote",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "7",
      "opened": false,
      "name": "Hotel Impero",
      "question": "Chi un tempo arrivava in treno a Castelnuovo, tra le mie mura trovava del cibo e un letto",
      "hint": "Sono in prossimità della vecchia stazione… e ora faccio parte di una scuola",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "8",
      "opened": false,
      "name": "Parco Lennon",
      "question": "Immagina... un cantante famoso...nell'anniversario della mia morte mi hanno dedicato un parco",
      "hint": "D'estate qui puoi venire anche al cinema",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "9",
      "opened": false,
      "name": "Villa Ferrari",
      "question": "Qui passerai per entrare nella futura biblioteca del paese..",
      "hint": "Il mio nome ricorda veloci macchine rosse... ",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "10",
      "opened": false,
      "name": "Forno Sirotti",
      "question": "Generazioni di studenti compravano qui la merenda prima di andare a scuola...ora sono chiuso, ma l'insegna è rimasta...",
      "hint": "Di fronte ho un chiosco...anche lui chiuso...",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "11",
      "opened": false,
      "name": "Biblioteca",
      "question": "Se sali da me, puoi trovare tantissimi libri...un tempo ero la casa dei carabinieri",
      "hint": "Vicino a me puoi mangiare, o comprare detersivi...",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "12",
      "opened": false,
      "name": "Cinema Verdi",
      "question": "Sono nascosto in un angolo del centro e non sono in formissima...ma molti anni fa i castelnovesi venivano qui quando uscivano la sera, per vedere i film in prima visione",
      "hint": "Prima di andare al cinema, ricordati di fare bancomat...",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "13",
      "opened": false,
      "name": "Salumificio Villani",
      "question": "Sono la più antica fabbrica di Castelnuovo, che oggi ospita anche un museo...",
      "hint": "La mia sirena è abbastanza famosa...",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "14",
      "opened": false,
      "name": "Vecchia Materna Via Menotti",
      "question": "Non sembra...ma qui una volta c'era la scuola materna comunale",
      "hint": "Ora puoi fare fisioterapia...o farti la permanente..lasciandoti alle spalle la tappa precedente",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "15",
      "opened": false,
      "name": "Parc Baden Powell",
      "question": "“Come Scouts siete impegnati a compiere almeno una buona azione ogni giorno” era uno dei miei motti...lo puoi leggere nel parco che mi hanno intitolato",
      "hint": "Il mio parco è bello grande….e arrivando qui dovresti incontrare cataste di casse di acqua minerale e fusti di birra...",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "16",
      "opened": false,
      "name": "Via Montorsi",
      "question": "Tra tante vie dedicate a personaggi storici di livello nazionale...c'è anche la mia...che sono un Castelnovese doc ...e hanno scritto anche il mio soprannome",
      "hint": "Non sono lontano dal parco di prima...tra un patriota di nome Ciro e un ingegnere di nome Luigi",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "17",
      "opened": false,
      "name": "Scuole Medie Leopardi",
      "question": "Ho più di 40 anni ma sto sempre coi giovani",
      "hint": "Il mio nome è quello di un famoso poeta...ma il mio auditorium è dedicato ad un sindaco del paese",
      "points": 4,
      "penalityPoints": 2
    },
    {
      "id": "18",
      "opened": false,
      "name": "Vicolo Falcone-Borsellino",
      "question": "Sono solo una stretta via pedonale, ma intitolata a due giudici caduti per aver lottato contro la mafia",
      "hint": "Uscendo dalla palestra, sono la via più breve per il centro",
      "points": 4,
      "penalityPoints": 2
    }
  ];
}
