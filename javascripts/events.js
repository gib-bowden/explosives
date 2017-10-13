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