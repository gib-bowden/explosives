"use strict";

const dom = require("./dom"); 

const dropdownMenu = $("#category-dropdown-menu");

$('body').on('click', '.category-option', (e) => {
    console.log(e.target.id);
    dom.populateSelectedProducts(e.target.id); 
});

module.exports = {};