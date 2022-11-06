const Product = require('../models/Product');
const mongoose = require('mongoose');
const mapProduct = require('../mappers/product');
module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;

  if (!subcategory) return next();

  await Product.find({subcategory: subcategory}).then((res) => {
    ctx.body = {products: res.length ? res.map((el) => mapProduct(el)) : []};
  });
};


module.exports.productList = async function productList(ctx, next) {
  if (ctx.params.id) return next();

  await Product.find({}).then((res) => {
    ctx.body = {products: res.length ? res.map((el) => mapProduct(el)) : []};
  });
};

module.exports.productById = async function productById(ctx, next) {
  if (mongoose.isValidObjectId(ctx.params.id)) {
    await Product.findById(ctx.params.id).then((res) => {
      if (!res) {
        ctx.status = 404;
      } else {
        console.log(res);
        ctx.body = {product: {...res, id: res._id}};
      }
    });
  } else {
    ctx.status = 400;
  }
};

