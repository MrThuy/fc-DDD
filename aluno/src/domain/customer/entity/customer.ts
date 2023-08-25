import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangedAdressEvent from "../event/customer/customer-changedAndress.events";
import CustomerCreatedEvent from "../event/customer/customer-created.events";
import EnviaConsoleLogHandler from "../event/customer/handler/EnviaConsoleLog.handler";
import EnviaConsoleLog1Handler from "../event/customer/handler/EnviaConsoleLog1.handler";
import EnviaConsoleLog2Handler from "../event/customer/handler/EnviaConsoleLog2.handler";
import Address from "../value-object/address";

export default class Customer {

  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardsPoints: number = 0;
  private _eventDispatcher = new EventDispatcher();

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();

    this._eventDispatcher.register(
      CustomerCreatedEvent.name,
      new EnviaConsoleLog1Handler()
    );

    this._eventDispatcher.register(
      CustomerCreatedEvent.name,
      new EnviaConsoleLog2Handler()
    );

    this._eventDispatcher.register(
      CustomerChangedAdressEvent.name,
      new EnviaConsoleLogHandler()
    );
  }


  getEventDispatcher() {
    return this._eventDispatcher;
  }

  create() {
    this._eventDispatcher.notify( new CustomerCreatedEvent(this));
  }

  get name() : string {
    return this._name;
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  get Address(): Address {
    return this._address;
  }

  set Address(address: Address) {
    this._address = address;
  }

  changeAddress(address: Address) {
    this._address = address;
    this._eventDispatcher.notify( new CustomerChangedAdressEvent(this));
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardsPoints(points: number) {
    this._rewardsPoints += points;
  }

  get rewardsPoints(): number {
    return this._rewardsPoints;
  }

  get id(): string {
    return this._id;
  }

}