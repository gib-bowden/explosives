(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const dom = require('./dom');

let fullProducts = [];
let dropdownOptions = []; 

const initializer = () => {
    explosivesGetter();    
}; 

const categoriesJSON = () => {
    return new Promise ((resolve, reject) => {
        $.ajax('./db/categories.json').done((data) => {
            resolve(data.categories); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const typesJSON = () => {
    return new Promise ((resolve, reject) => {
        $.ajax('./db/types.json').done((data) => {
            resolve(data.types); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const productsJSON = () => {
    return new Promise ((resolve, reject) => {
        $.ajax('./db/products.json').done((data) => {
            resolve(data.products); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const explosivesGetter = () => {
    let categories = []; 
    let types = [];
    let products = []; 
    categoriesJSON().then((_categories) => {
        categories = _categories;
        dom.populateDropdownOptions(categories);
        return typesJSON();
    }).then((_types) => {
        types = _types;
        return productsJSON();
    }).then((_products) => {
        products = _products.map((product) => {
            let key = Object.keys(product);
            return product[key];
        });
        combineExplosivies(categories, types, products);
    }); 
};

const combineExplosivies = (categories, types, products) => {
    categories.forEach((category) => {
        types.forEach((type) => {
            if (category.id === type.category) {
                products.forEach((product) => {
                   if (type.id === product.type) {
                       product.categoryName = category.name;
                       product.typeName = type.name;
                       product.typeDescription = type.description; 
                   }
                });
            }
        });
    });
    dom.setProducts(products);
};

module.exports = {
    initializer
}; 


},{"./dom":2}],2:[function(require,module,exports){
"use strict";

let categories = []; 
let products = []; 
const dropdownMenu = $("#category-dropdown-menu");
const productsContainer = $("#products-container");

const setCategories = (_categories) => {
    categories = _categories;
    console.log(categories);
};

const getCategories = () => {
    return categories;
};

const setProducts = (_products) => {
    products = _products; 
};

const getProducts = () => {
    return products;
};


const populateDropdownOptions = (categories) => {
    categories.forEach((category) =>{
        let option = `<li><a class="category-option" id=${category.id} href="#">${category.name}</a></li>`;
        dropdownMenu.append(option); 
    });
};

const populateSelectedProducts = (selectedCategoryId) => {
    let domString = "";
    products.forEach((product) => {
        if (selectedCategoryId == product.categoryId) {
            productsContainer.append(product.name);
        }
    });
};


module.exports = {
    setCategories,
    getCategories,
    setProducts,
    getProducts,
    populateDropdownOptions,
    populateSelectedProducts
};
},{}],3:[function(require,module,exports){
"use strict";

const dom = require("./dom"); 

const dropdownMenu = $("#category-dropdown-menu");

$('body').on('click', '.category-option', (e) => {
    console.log(e.target.id);
    dom.populateSelectedProducts(e.target.id); 
});

module.exports = {};
},{"./dom":2}],4:[function(require,module,exports){
"use strict";

require('./events'); 

const data = require('./data');

$(document).ready(() => {
   data.initializer(); 
});
},{"./data":1,"./events":3}]},{},[4]);
