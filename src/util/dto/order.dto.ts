export class OrderDto {

    _id: string;
    createdAt: Date;
    updatedAt: Date;
    itemList: [{
        itemCode: string;
        price: number;
        quantity: number;
        image: string;
    }];
    status: string;
    userEmail: string;
    totalPrice: number;

    constructor(_id: string, createdAt: Date, updatedAt: Date, itemList: [{ itemCode: string; price: number; quantity: number; image: string; }], status: string, userEmail: string, totalPrice: number) {
        this._id = _id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.itemList = itemList;
        this.status = status;
        this.userEmail = userEmail;
        this.totalPrice = totalPrice;
    }

}