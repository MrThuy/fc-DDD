import CustomerChangedAdressEvent from "../event/customer/customer-changedAndress.events";
import CustomerCreatedEvent from "../event/customer/customer-created.events";
import EnviaConsoleLogHandler from "../event/customer/handler/EnviaConsoleLog.handler";
import EnviaConsoleLog1Handler from "../event/customer/handler/EnviaConsoleLog1.handler";
import EnviaConsoleLog2Handler from "../event/customer/handler/EnviaConsoleLog2.handler";
import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {


  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");;
  });

  it("should activate customer", () => {

    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "12345-123", "City");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBeTruthy();
  });

  it("should deactivate customer", () => {

      const customer = new Customer("123", "John");

      customer.deactivate();

      expect(customer.isActive()).toBeFalsy();
    });

  it("should throw error when activating customer without address", () => {
    expect(() => {
          const customer = new Customer("123", "John");
          customer.activate();
        }).toThrowError("Address is mandatory to activate customer");
  });

  it("should add rewards points", () => {

    const customer = new Customer("123", "John");
    expect(customer.rewardsPoints).toBe(0);

    customer.addRewardsPoints(10);
    expect(customer.rewardsPoints).toBe(10);

    customer.addRewardsPoints(10);
    expect(customer.rewardsPoints).toBe(20);
  });

  it("should notifiy customer created event", () => {

    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "12345-123", "City");
    customer.Address = address;

    const eventDispatcher = customer.getEventDispatcher();

    const handler1 = eventDispatcher.getEventHandlers[CustomerCreatedEvent.name].find((eventHandler) => {
      return eventHandler instanceof EnviaConsoleLog1Handler;
    });

    const spyEventHandler1 = jest.spyOn(handler1, "handle");

    const handler2 = eventDispatcher.getEventHandlers[CustomerCreatedEvent.name].find((eventHandler) => {
      return eventHandler instanceof EnviaConsoleLog2Handler;
    });

    const spyEventHandler2 = jest.spyOn(handler2, "handle");

    customer.create();

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();

  });

  it("should notifiy customer changed address event", () => {

    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "12345-123", "City");
    customer.Address = address;

    const eventDispatcher = customer.getEventDispatcher();

    const handler = eventDispatcher.getEventHandlers[CustomerChangedAdressEvent.name].find((eventHandler) => {
      return eventHandler instanceof EnviaConsoleLogHandler;
    });

    const spyEventHandler = jest.spyOn(handler, "handle");

    customer.changeAddress(new Address("Street 2", 123, "12345-123", "City"));

    expect(spyEventHandler).toHaveBeenCalled();
  });

});