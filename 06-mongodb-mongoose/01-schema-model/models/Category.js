const mongoose = require('mongoose');
const connection = require('../libs/connection');

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // excludeIndexes: true,
  },
  subcategories: [subCategorySchema],
});

// вопрос: является ли схема Подкатегорий ребенком схемы Категорий. В каком случае нужно использовать https://mongoosejs.com/docs/api/schema.html#options-for-nested-schemas?
// попросить примеры

module.exports = connection.model('Category', categorySchema);
