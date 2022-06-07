// Create an interface representing a document in MongoDB.
export interface OrderInterface {
    price: number;
    orderName: string;
    orderQuantity: Number;
    paymentMethod: string;
    address: string;
    email: string;
    status: string;
}
