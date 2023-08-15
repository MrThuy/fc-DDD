import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository ";
import Order from "../../domain/entity/order";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItem from "../../domain/entity/orde_item";
import OrderRepository from "./order.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import Product from "../../domain/entity/product";

describe("Order repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {

      sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true }
      });

      sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);

      await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create an order", async () => {

      const customerRepository = new CustomerRepository();
      const customer = new Customer("c1", "Customer 1");
      const address = new Address("street", 1, "zip", "city");
      customer.changeAddress( address );
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      const product = new Product("p1", "Product 1", 10);
      await productRepository.create(product);

      const ordemItem = new OrderItem(
        "oi1",
        product.name,
        product.price,
        product.id,
        2
      );

      const order = new Order("o1", customer.id, [ordemItem]);

      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"]
      });

      expect(orderModel.toJSON()).toStrictEqual({
        id: order.id,
        customer_id: customer.id,
        total: order.total(),
        items: [
          {
            id: ordemItem.id,
            name: ordemItem.name,
            price: ordemItem.price,
            quantity: ordemItem.quantity,
            order_id: order.id,
            product_id: ordemItem.productId
          }
        ]
      });

    });

    it("should update an order", async () => {

      const customerRepository = new CustomerRepository();
      const customer = new Customer("c1", "Customer 1");
      const address = new Address("street", 1, "zip", "city");
      customer.changeAddress( address );
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      const product = new Product("p1", "Product 1", 10);
      await productRepository.create(product);

      const ordemItem = new OrderItem(
        "oi1",
        product.name,
        product.price,
        product.id,
        2
      );

      const order = new Order("o1", customer.id, [ordemItem]);

      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const customer2 = new Customer("c2", "Customer 2");
      const address2 = new Address("street2", 2, "zip2", "city2");
      customer2.changeAddress( address2 );
      await customerRepository.create(customer2);

      const product2 = new Product("p2", "Product 2", 20);
      await productRepository.create(product2);

      const ordemItem2 = new OrderItem(
        "oi2",
        product2.name,
        product2.price,
        product2.id,
        3
      );

      order.changeCustomer(customer2.id);
      order.items = [ordemItem2];

      await orderRepository.update(order);

      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"]
      });

      expect(orderModel.toJSON()).toStrictEqual({
        id: order.id,
        customer_id: customer2.id,
        total: order.total(),
        items: [
          {
            id: ordemItem2.id,
            name: ordemItem2.name,
            price: ordemItem2.price,
            quantity: ordemItem2.quantity,
            order_id: order.id,
            product_id: ordemItem2.productId
          }
        ]
      });
    });

    it("should find an order", async () => {

      const customerRepository = new CustomerRepository();
      const customer = new Customer("c1", "Customer 1");
      const address = new Address("street", 1, "zip", "city");
      customer.changeAddress( address );
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      const product = new Product("p1", "Product 1", 10);
      await productRepository.create(product);

      const ordemItem = new OrderItem(
        "oi1",
        product.name,
        product.price,
        product.id,
        2
      );

      const order = new Order("o1", customer.id, [ordemItem]);

      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const orderResult = await orderRepository.find(order.id);

      expect(order).toStrictEqual(orderResult);
    });

    it("should throw an error when order is not found", async () => {

      const orderRepository = new OrderRepository();

      await expect(orderRepository.find("o1")).rejects.toThrow("Order not found");

    });

    it("should find all orders", async () => {

      const customerRepository = new CustomerRepository();
      const customer = new Customer("c1", "Customer 1");
      const address = new Address("street", 1, "zip", "city");
      customer.changeAddress( address );
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      const product = new Product("p1", "Product 1", 10);
      await productRepository.create(product);

      const ordemItem = new OrderItem(
        "oi1",
        product.name,
        product.price,
        product.id,
        2
      );

      const order = new Order("o1", customer.id, [ordemItem]);

      const orderRepository = new OrderRepository();
      await orderRepository.create(order);


      const customer2 = new Customer("c2", "Customer 2");
      const address2 = new Address("street2", 2, "zip2", "city2");
      customer2.changeAddress( address2 );
      await customerRepository.create(customer2);

      const product2 = new Product("p2", "Product 2", 20);
      await productRepository.create(product2);

      const ordemItem2 = new OrderItem(
        "oi2",
        product2.name,
        product2.price,
        product2.id,
        3
      );

      const order2 = new Order("o2", customer2.id, [ordemItem2]);
      await orderRepository.create(order2);

      const orders = await orderRepository.findAll();

      expect(orders).toStrictEqual([order, order2]);
    });

  });