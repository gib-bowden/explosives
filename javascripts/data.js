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

