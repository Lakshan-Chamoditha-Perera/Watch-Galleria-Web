
export class WatchDto {
    itemCode: string;
    productName: string;
    description: string;
    category: Category;
    price: number;
    quantity: number;
    rating: number;
    productDate: Date;
    gender: Gender;
    imageUrlList: string[];
    addToCartQuantity: number;

    constructor(itemCode: string, productName: string, description: string, category: Category, price: number, quantity: number, rating: number, productDate: Date, gender: Gender, imageUrlList: string[], addToCartQuantity: number) {
        this.itemCode = itemCode;
        this.productName = productName;
        this.description = description;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.rating = rating;
        this.productDate = productDate;
        this.gender = gender;
        this.imageUrlList = imageUrlList;
        this.addToCartQuantity = addToCartQuantity;
    }

}

export enum Category {
    LUXURY = "LUXURY",
    SPORT = "SPORT",
    CASUAL = "CASUAL",
    SMART = "SMART"
}

export enum Gender {
    UNISEX, MALE, FEMALE
}