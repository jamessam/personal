/**
 * This script changes the content model to create an assembly of home page images.
 */

module.exports = function(migration) {
  const homePage = migration.createContentType('homePageAssembly');
  homePage.name('Home Page Assembly');

  homePage
    .createField('title')
    .name('Internal Title')
    .type('Symbol')
    .omitted(true);

  homePage
    .createField('images')
    .name('Images')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Asset',
      validations: [{ linkMimetypeGroup: ['image'] }]
    })
    .validations([{ size: { min: 4, max: 4 } }])
    .required(true);

  homePage.displayField('title');

  const contactPage = migration.createContentType('contactPage');
  contactPage.name('Contact Page Assembly');

  contactPage
    .createField('title')
    .name('Title')
    .type('Symbol');

  contactPage
    .createField('images')
    .name('Images')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Asset',
      validations: [{ linkMimetypeGroup: ['image'] }]
    })
    .validations([{ size: { min: 2, max: 2 } }])
    .required(true);

  contactPage.displayField('title');
};
