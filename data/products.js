import { calculatePriceCentsToDollars } from "../scripts/utils/money.js";

export function getFullProduct(productId) {
  return products.find((product) => {
    return String(productId) === String(product.id);
  });
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor (productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getPrice() {
    return calculatePriceCentsToDollars(this.priceCents);
  }

  getStarUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getExtraInfoHTML () {
    return '';
  }
}

export class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = '../images/clothing-size-chart.png';
  }

  getExtraInfoHTML() {
    return `
    <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
    `;
  }
}

export let products = [];

async function fetchProducts() {
  try {
    const response = await fetch('https:supersimplebackend.dev/products');

    // Ensure the response is okay
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (e) {
    console.log('fetchProducts error', e);
  }
}

async function parseProducts(fetchResponse) {
  const productsData = await fetchResponse.json();
  return productsData
}

function convertProductStringsToClasses(productsData) {
  products = productsData.map((productDetails) => {
    if (productDetails.type === 'clothing') {
      return new Clothing(productDetails);
    } else {
      return new Product(productDetails);
    }
  });
}


export async function loadProducts() {
  try {
    const fetchResponse = await fetchProducts();
    const productsData = await parseProducts(fetchResponse);
    
    convertProductStringsToClasses(productsData);
    return products;
  } catch (e) {
    console.log('loadProducts error', e);
  }
}
/*
export function loadProducts() {
  const productPromise = fetch('https:supersimplebackend.dev/products').
  then((response) => {
    return response.json();
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else {
        return new Product(productDetails);
      }
    });
  }).catch((error) => {
    console.log('error !!!', error);
  });
  return productPromise;
} */



/*
export function loadProducts(fun) {
  const productRequest = new XMLHttpRequest();
  productRequest.addEventListener('load', () => { 
    products = JSON.parse(productRequest.response);

    products = products.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else {
        return new Product(productDetails);
      }
    });
    console.log(products);
    fun();
   });
  productRequest.open('GET', 'https://supersimplebackend.dev/products');
  productRequest.send();
} */



