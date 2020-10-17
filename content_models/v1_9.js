/**
 * This script changes the content model to:
 * - Add a category content type
 * - Add a reference field to the blog content type
 */

module.exports = function(migration) {
  const category = migration.createContentType('category');
  category.name('Category');

  category
    .createField('name')
    .name('Name')
    .type('Symbol')
    .validations([{ unique: true }])
    .required(true);
  category.displayField('name');

  category
    .createField('subCategory')
    .name('Sub Category')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['category'] }])
    .required(false);
  category.moveField('subCategory').afterField('name');

  const blog = migration.editContentType('blog');
  blog
    .createField('category')
    .name('Category')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['category'] }])
    .required(true);
};
