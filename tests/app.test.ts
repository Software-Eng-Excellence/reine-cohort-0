import {FinanceCalculator, OrderManagement, Validator} from '../src/app';

describe("OrderManagement", () => {
    it("should add an order", () => {
        // arrange
        const validator = new Validator([]);
        const calc = new FinanceCalculator();
        const orderManager = new OrderManagement(validator, calc);

        const item = "Sponge";
        const price = 15;

        // act
        orderManager.addOrder(item, price);

        // assert
        expect(orderManager.getOrders()).toEqual([{ id: 1, item, price }]);
    });
    
    it("should get an order", () => {
        // arrange
        const validator = new Validator([]);
        const calc = new FinanceCalculator();
        const orderManager = new OrderManagement(validator, calc);
        const item = "Sponge";
        const price = 15;
        orderManager.addOrder(item, price);
        // act
        const order = orderManager.getOrder(1);
        //assert
        expect(order).toEqual({ id: 1, item, price });
    });
}); 

describe("FinanceCalculator", () => {
    it("should calculate the total cost of an order", () => {
        // arrange
        const calc = new FinanceCalculator();
        const orders = [
            { id: 1, item: "Sponge", price: 15 },
            { id: 2, item: "Chocolate", price: 20 },
            { id: 3, item: "Fruit", price: 18 },
            { id: 4, item: "Red Velvet", price: 25 },
            { id: 5, item: "Coffee", price: 8 },
        ];
        // act
        const revenue = calc.getRevenue(orders);
        // assert
        expect(revenue).toBe(86);
    }
    );
    it("should calculate the average buy power", () => {
        // arrange
        const calc = new FinanceCalculator();
        const orders = [
            { id: 1, item: "Sponge", price: 15 },
            { id: 2, item: "Chocolate", price: 20 },
            { id: 3, item: "Fruit", price: 18 },
            { id: 4, item: "Red Velvet", price: 25 },
            { id: 5, item: "Coffee", price: 8 },
        ];
        // act
        const averageBuyPower = calc.getAverageBuyPower(orders);
        // assert
        expect(averageBuyPower).toBe(17.2);
        });
    
}
);