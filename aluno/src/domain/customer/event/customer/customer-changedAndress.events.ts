import EventInterface from "../../../@shared/event/event.interface";

export default class CustomerChangedAdressEvent implements EventInterface {

  dataTimeOcurrence: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOcurrence = new Date();
    this.eventData = eventData;
  }

}