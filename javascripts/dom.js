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