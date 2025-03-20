const natural = require("natural");
const { normalizeProductName } = require("../utils/organization-name");

const levenshtein = natural.LevenshteinDistance;

function categorizeProducts(products) {
  return products.reduce((categories, product) => {
    const normalizedProduct = normalizeProductName(product.title);
    let foundCategory = false;

    for (const category of categories) {
      const representative = normalizeProductName(category.products[0].title);

      if (levenshtein(normalizedProduct, representative) < 5) {
        category.products.push(product);
        category.count++;
        foundCategory = true;
        break;
      }
    }

    if (!foundCategory) {
      categories.push({
        categoryName: product.title,
        count: 1,
        products: [product],
      });
    }

    return categories;
  }, []);
}

module.exports = { categorizeProducts };
