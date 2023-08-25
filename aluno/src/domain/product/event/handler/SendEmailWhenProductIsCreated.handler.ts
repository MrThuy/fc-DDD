
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";
import ProductCreatedEvent from "../product-created.events";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {


  handle(event: EventInterface): void {
    console.log(`Sending email to ...`);
  }


}