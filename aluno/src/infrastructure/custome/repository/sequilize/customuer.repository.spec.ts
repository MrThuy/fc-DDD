import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository ";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";

describe("Customer repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {

      sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true }
      });

      sequelize.addModels([CustomerModel]);

      await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {

      const customerRepository = new CustomerRepository();
      const customer = new Customer("c1", "Customer 1");
      const address = new Address("street", 1, "zip", "city");
      customer.Address = address;
      await customerRepository.create(customer);

      const customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

      expect(customerModel.toJSON()).toStrictEqual({
        id: "c1",
        name: customer.name,
        street: address.street,
        number:address.number,
        zipcode: address.zip,
        city: address.city,
        active: customer.isActive(),
        rewardPoints: customer.rewardsPoints,
      });

    });

    it("should update a customer", async () => {

      const customerRepository = new CustomerRepository();
      const customer = new Customer("c1", "Customer 1");
      const address = new Address("street", 1, "zip", "city");
      customer.Address = address;
      await customerRepository.create(customer);

      customer.changeName("Customer 2");
      await customerRepository.update(customer);
      const customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

      expect(customerModel.toJSON()).toStrictEqual({
        id: "c1",
        name: customer.name,
        street: address.street,
        number:address.number,
        zipcode: address.zip,
        city: address.city,
        active: customer.isActive(),
        rewardPoints: customer.rewardsPoints,
      });
    });

    it("should find a customer", async () => {

      const customerRepository = new CustomerRepository();
      const customer = new Customer("c1", "Customer 1");
      const address = new Address("street", 1, "zip", "city");
      customer.Address = address;
      await customerRepository.create(customer);

      const customerResult = await customerRepository.find(customer.id);

      expect(customer).toStrictEqual(customerResult);
    });

    it("should throw an error when customer is not found", async () => {

      const customerRepository = new CustomerRepository();

      await expect(customerRepository.find("c1")).rejects.toThrow("Customer not found");

    });

    it("should find all customers", async () => {

        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("c1", "Customer 1");
        const customer2 = new Customer("c2", "Customer 2");
        const address1 = new Address("street", 1, "zip", "city");
        const address2 = new Address("street", 2, "zip", "city");
        customer1.Address = address1;
        customer2.Address = address2;
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toStrictEqual([customer1, customer2]);
      });

  });