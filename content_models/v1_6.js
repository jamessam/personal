/**
 * This contraction script changes the content model to eliminate redundent
 * fields following the Rich Text field migration.
 */

module.exports = function(migration) {
  const blog = migration.editContentType('blog');
  blog.deleteField('text');
  blog.deleteField('picture');
};
