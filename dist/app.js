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
                       product.categoryId = category.id; 
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
const modalBody = $(".modal-body");
const modalTitle = $("#myModalLabel");


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

const populateProducts = (selectedCategoryId) => {
    let productString = "";
    let columns = 4; //must be even
    let index = 0; 
    products.forEach((product) =>{
        if (selectedCategoryId == product.categoryId) {
            if (index % columns === 0) {
                productString += `<div class="row">`;               
            }
            productString += 
                `<div class="product-card col-md-${12/columns - 1}">
                    <div class="description-container">
                        <h3> ${product.name} </h3>

                    </div>
                    <button id="modal-btn-${product.id}" type="button" class="modal-btn btn btn-default btn-sm" data-toggle="modal" data-target="#myModal">
                    View Details
                </button>
                </div>`;
            if ((index + 1) % columns === 0) {
                productString += `</div>`;           
            }
            index++; 
        }
        
    });
    productsContainer.html(productString); 
};


const populateModal = (productIdstring) => {
    let productBody = '';
    let productHeader = ''; 
    products.forEach((product) => {
        if (product.id == productIdstring) {
            productHeader = product.name;
            productBody += 
            `<p>${product.description}</p>
            <p>Category: ${product.categoryName}</p>
            <p>Type: ${product.typeName}</p>
            <p>Type Description: ${product.typeDescription}</p>
            `;
        }
    });
    modalBody.html(productBody);
    modalTitle.html(productHeader); 
};

module.exports = {
    setCategories,
    getCategories,
    setProducts,
    getProducts,
    populateDropdownOptions,
    populateProducts,
    populateModal
};
},{}],3:[function(require,module,exports){
"use strict";

const dom = require("./dom"); 

const dropdownMenu = $("#category-dropdown-menu");

$('body').on('click', '.category-option', (e) => {
    $('#dropdownMenu1').html(`${e.target.innerText}  <span class="caret"></span>`); 
    dom.populateProducts(e.target.id); 
});


$('body').on('click', '.modal-btn', (e) => {
    let productId = findSelectedProductId(e.target.id); 
    dom.populateModal(productId);
});

const findSelectedProductId = (id) => {
    return id.split("-")[2];
};

module.exports = {};
},{"./dom":2}],4:[function(require,module,exports){
"use strict";

require('./events'); 

const data = require('./data');

$(document).ready(() => {
   data.initializer(); 
});
},{"./data":1,"./events":3}]},{},[4]);
