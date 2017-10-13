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