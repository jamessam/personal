/**
 * This script changes the content model to accomodate the Rich Text field and
 * HTML Widget content type. It needs to be followed by the script to migrate
 * content to the new content model.
 */

module.exports = function(migration) {
  const sitePage = migration.editContentType('sitePage');
  sitePage
    .createField('body')
    .name('Body')
    .type('RichText')
    .required(false);

  sitePage.editField('headline').disabled(true);
  sitePage.editField('components').disabled(true);
  sitePage.editField('image').disabled(true);

  const htmlWidget = migration
    .createContentType('htmlWidget')
    .name('HTML Widget');
  htmlWidget
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(false)
    .validations([{ unique: true }])
    .omitted(true);
  htmlWidget
    .createField('html')
    .name('HTML')
    .type('Text')
    .required(true);
  htmlWidget.displayField('title');
};
