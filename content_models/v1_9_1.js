module.exports = function(migration) {
  const category = migration.editContentType('category');
  category
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .validations([{ unique: true }])
    .required(true)
    .localized(false)
    .disabled(false)
    .omitted(false);
  category.moveField('slug').afterField('name');
  category.changeFieldControl('slug', 'builtin', 'slugEditor');
};
