/**
 * This script changes the content model to accomodate the Rich Text field on
 * the blog and the HTML Widget content type introduced in the 1.0 migration.
 *
 * It also creates a writtenOn date field.
 *
 * It needs to be followed by the script to migrate content to the new content
 * model.
 */

module.exports = function(migration) {
  const blog = migration.editContentType('blog');
  blog
    .createField('body')
    .name('Body')
    .type('RichText')
    .required(false);

  blog
    .createField('writtenOn')
    .name('Written On')
    .type('Date')
    .required(true);

  blog.moveField('body').afterField('shortDescription');
  blog.moveField('writtenOn').afterField('slug');

  blog.editField('text').disabled(true);
  blog.editField('picture').disabled(true);
};
