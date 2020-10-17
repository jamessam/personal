/**
 * This contraction script changes the content model to eliminate redundent
 * fields following the Rich Text field migration.
 */

module.exports = function(migration) {
  // Remove fields from sitePage
  const sitePage = migration.editContentType('sitePage');
  sitePage.deleteField('headline');
  sitePage.deleteField('components');
  sitePage.deleteField('image');

  // Remove the Static Page Components
  migration.deleteContentType('staticPageComponent');
};
