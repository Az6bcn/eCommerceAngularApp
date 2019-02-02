export class Product {
  title: string;
  price: String;
  category: String;
  imageUrl: string;



  constructor(title?: string, price?: string, category?: string, imageUrl?: string) {
    this.title = title;
    this.price = price;
    this.category = category;
    this.imageUrl = imageUrl;
  }

}


