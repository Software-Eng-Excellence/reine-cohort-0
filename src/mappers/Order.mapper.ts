// OrderMappers.ts
import { IMapper } from "./IMapper";
import { IIdentifiableOrderItem, IOrder } from "../model/IOrder";
import { IdentifiableOrderItemBuilder, OrderBuilder } from "../model/builders/order.builder";
import { IIdentifiableItem, IItem } from "../model/IItem";

// CSV Order Mapper
export class CSVOrderMapper implements IMapper<string[], IOrder> {
    constructor(private itemMapper: IMapper<string[], IItem>) {}

    map(data: string[]): IOrder {
        const item: IItem = this.itemMapper.map(data);
        return OrderBuilder.newBuilder()
            .setId(data[0])
            .setQuantity(parseInt(data[data.length - 1]))
            .setPrice(parseFloat(data[data.length - 2]))
            .setItem(item)
            .build();
    }
    reverseMap(data: IOrder): string[] {
        const item = this.itemMapper.reverseMap(data.getItem());
        return [
            data.getId(),
            ...item,
            data.getPrice().toString(),
            data.getQuantity().toString()
        ]
    }
}

export interface SQLiteOrder{
    id: string;
    quantity: number;
    price: number;
    item_category: string;
    item_id: string;
}
export class SQLiteOrderMapper implements IMapper<{data:SQLiteOrder, item:IIdentifiableItem}, IIdentifiableOrderItem> {
    map({data, item}: {data:SQLiteOrder, item:IIdentifiableItem}): IIdentifiableOrderItem {
        const order = OrderBuilder.newBuilder()
            .setId(data.id)
            .setPrice(data.price)
            .setQuantity(data.quantity)
            .setItem(item)
            .build();
        return IdentifiableOrderItemBuilder.newBuilder().setOrder(order).setItem(item).build();
    }
    reverseMap(data: IIdentifiableOrderItem): {data:SQLiteOrder, item:IIdentifiableItem} {
        return {
            data: {
            id: data.getId(),
            quantity: data.getQuantity(),
            price: data.getPrice(),
            item_category: data.getItem().getCategory(),
            item_id: data.getItem().getId()
            },
            item: data.getItem()
        };
    }
    
}

// JSON Order Mapper
// export class JSONOrderMapper implements IMapper<{ [key: string]: string }, IOrder> {
//     constructor(private itemMapper: IMapper<{ [key: string]: string }, IItem>) {}

//     map(data: { [key: string]: string }): IOrder {
//         const item: IItem = this.itemMapper.map(data);
//         return OrderBuilder.newBuilder()
//             .setId(data["Order ID"])
//             .setQuantity(parseInt(data["Quantity"]))
//             .setPrice(parseFloat(data["Price"]))
//             .setItem(item)
//             .build();
//     }
// }


// // XML Order Mapper
// export class XMLOrderMapper implements IMapper<{ [key: string]: string }, IOrder> {
//     constructor(private itemMapper: IMapper<{ [key: string]: string }, IItem>) {}

//     map(data: { [key: string]: string }): IOrder {
//         const item: IItem = this.itemMapper.map(data);
//         return OrderBuilder.newBuilder()
//             .setId(data["OrderID"])
//             .setQuantity(parseInt(data["Quantity"]))
//             .setPrice(parseFloat(data["Price"]))
//             .setItem(item)
//             .build();
//     }
// }
