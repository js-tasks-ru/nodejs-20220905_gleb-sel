const Product = require('../models/Product');
const mapProduct = require('../mappers/product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const {query} = ctx.query;
  if (!query) {
    await Product.find({}).then((res) => {
      ctx.body = {products: res.length ? res.map((el) => mapProduct(el)) : []};
    });
  } else {
    await Product.find({$text: {$search: query}}).then((res) => {
      ctx.body = {products: res.length ? res.map((el) => mapProduct(el)) : []};
    });
  }

  // ctx.body = {products: []};
};
