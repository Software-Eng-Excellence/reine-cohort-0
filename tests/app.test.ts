import { Validator, FinanceCalculator, OrderManagement, Order } from './../src/app';

describe("OrderManagement", () => {
    // before all
    // before each
    let validator: Validator;
    let calc : FinanceCalculator;
    let orderManager: OrderManagement;
    let baseValidator: (order: Order) => void;

    beforeAll(() => {
        validator = new Validator([]);
        calc = new FinanceCalculator();
    });

    beforeEach(() => {
        baseValidator = validator.validate;
        validator.validate = jest.fn();
        orderManager = new OrderManagement(validator, calc);
    });

    afterEach(() => {
        validator.validate = baseValidator;
    });

    it("should add an order", () => {
        // arrange

        const item = "Sponge";
        const price = 15;

        // act
        orderManager.addOrder(item, price);

        // assert
        expect(orderManager.getOrders()).toEqual([{ id: 1, item, price }]);
    });
    
    it("should get an order", () => {
        // arrange

        const item = "Sponge";
        const price = 15;
        orderManager.addOrder(item, price);
        // act
        const order = orderManager.getOrder(1);
        //assert
        expect(order).toEqual({ id: 1, item, price });
    });

    it("should call finance calculator to get total revenue", () => {

        //arrange
        const item = "Sponge";
        const price = 15;
        orderManager.addOrder(item, price);
        const spy = jest.spyOn(calc, "getRevenue");

        //act
        orderManager.getTotalRevenue();

        //assert
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([{ id: 1, item, price }]);
        expect(spy).toHaveReturnedWith(15);
    });

        it("should throw addition exception if validator does not pass", () => {
            //arrange
            const item = "Sponge";
            const price = 10;
            (validator.validate as jest.Mock).mockImplementation(() => {
                throw new Error("Invalid order");
            });

            expect(() => orderManager.addOrder(item, price)).toThrow("[OrderManagement] Error adding order: Invalid order");
            
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
        expect(averageBuyPower).toBeCloseTo(17.2, 1);
        });
    
}
);