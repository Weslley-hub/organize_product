const fs = require("fs");
const path = require("path");
const { categorizeProducts } = require("./service/organization-product");

const productsPath = path.join(__dirname, "data", "data01.json");
const rawData = fs.readFileSync(productsPath);
const products = JSON.parse(rawData);

const categorized = categorizeProducts(products);
console.log(JSON.stringify(categorized, null, 2));
