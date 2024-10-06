import { openDb, addProductsIntoDB } from "./initIndexedDB.js";
import womanDressesProducts from "../data/for-woman/dresses.js";

const wdp = {
  id: 1,
  image: "Double Breasted Tailored Dress In Black",
  title: "",
  price: "$260",
  discount: null,
  sale: false,
  description: [
    "Reimagined in a soft shade of cream, this lambswool Polo Neck has subtle design details such as a contrasting ribbed neck. A saddle shoulder design adds further interest. Wear the neck folded over or upright. Buy this product on victoriabeckham.com",
  ],
  productDetails: [
    "Soft Lambswool Fabrication",
    "Saddle shoulder design",
    "High neckline complete with ribbed hemline",
    "Contrasting VB monogram embroidery",
    " Fits true to size, take your regular size",
    "The model’s height is 180cm and is wearing a size XS",
    " Front Length (Side Neck Point To Hem): 55.5cm",
    "Sleeve Length (From Shoulder): 70.8cm",
    "Main: 100% Lambswool",
    "Specialized Dry Clean Only",
    "Made in Turkey],",
  ],

  deliveryAndReturns: [
    "We offer complimentary express shipping.",
    "Free returns are available worldwide. If your item is eligible for return, you have 30 days from the date you receive your order to follow this procedure.",
    "See delivery and returns for more information.",
  ],
};

class DatabaseProducts {
  #dbBasketName = "BasketStorage";
  #dbProductsName = "ProductsStorage";

  #dbProductsPromise = null;
  #dbBasketPromise = null;

  #productsMigrations = [
    [
      (db) => {
        db.createObjectStore("womanDressesProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
      (db) => {
        db.createObjectStore("womanBagsProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
      (db) => {
        db.createObjectStore("womanShoesProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
      (db) => {
        db.createObjectStore("manCoatProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
      (db) => {
        db.createObjectStore("manShoesProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
      (db) => {
        db.createObjectStore("manTrousersProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    ],
  ];

  #basketMigrations = [
    [
      (db) => {
        db.createObjectStore("productsBasket", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    ],
  ];

  constructor() {
    this.initProductsIndexedDb();
    this.initBasketIndexedDb();
  }

  initProductsIndexedDb() {
    this.#dbProductsPromise = openDb(
      this.#dbProductsName,
      this.#productsMigrations
    );
  }

  initBasketIndexedDb() {
    this.#dbBasketPromise = openDb(this.#dbBasketName, this.#basketMigrations);
  }

  addWomanDressesProducts() {
    /*
    womanDresseProducts.forEach((product) => {


      this.#dbPromise.then((db) =>
        addProductsIntoDB(db, "womanDressesProducts", product)
      );


    });
*/

    this.#dbProductsPromise.then((db) =>
      addProductsIntoDB(db, "womanDressesProducts", wdp)
    );
  }
}

new DatabaseProducts();
