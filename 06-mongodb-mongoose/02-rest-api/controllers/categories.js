const Category = require('../models/Category');
const mapCategory = require('../mappers/category');
module.exports.categoryList = async function categoryList(ctx, next) {
  await Category.find({}).then((res) => {
    ctx.body = {categories: res.map((el) => mapCategory(el))};
  });

  // почему если не использовать mapCategory возвращается объект с числами?
  // спросить про правильность формата.
  // спросить как компас подхватывает новые базы. Они у меня неожиданно появляются. какая механика?
  // ctx.body = {categories: []};
};
