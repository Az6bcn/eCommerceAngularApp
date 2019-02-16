export class Product {
  title: string;
  price: String;
  category: String;
  imageUrl: string;
  key: string;
  quantity: number;



  constructor(title?: string, price?: string, category?: string, imageUrl?: string, key?: string) {
    this.title = title;
    this.price = price;
    this.category = category;
    this.imageUrl = imageUrl;
    this.key = key;
    this.quantity = 1;
  }

}


