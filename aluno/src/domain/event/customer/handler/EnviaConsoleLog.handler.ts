import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";
import CustomerChangedAdressEvent from "../customer-changedAndress.events";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerChangedAdressEvent> {

  handle(event: EventInterface): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.Address.street}`);
  }

}