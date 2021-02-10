//
// Object property shorthand
//

const name = 'Cade';
const userAge = 23;

// Before ES6
// const user = {
//     name: name,
//     age: userAge,
//     location: 'Brookfield'
// }

// Shorthand - if the variable name is the same name as the key, the key does not need to be defined (name in this case).
const user = {
    name,
    age: userAge,
    location: 'Brookfield'
};

console.log(user);

//
// Object destructuring -- extract object properties into individual variables.
//

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
};

// Old
// const label = product.label;
// const stock = product.stock;

// New in ES6
// label:productLabel is creating a new const with name productLabel that holds the value of the label property on the product object.
// rating = 5 is setting the default value of the rating const ONLY if there is not rating property on the product object.
const {label:productLabel, stock, rating = 5} = product;
console.log(productLabel);
console.log(stock);
// This will be undefined since it does not exist in the product object.
console.log(rating);


// Destructuring the object inline the function parameters
const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock);
};

transaction('order', product);
