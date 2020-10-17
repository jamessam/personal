/**
 * This script changes the content model to:
 * - Create an SEO object content type.
 * - Create a link to an SEO object on Home Page, Contact Page, and Site Page.
 */

module.exports = function(migration) {
  const seoObject = migration.createContentType('seoObject');
  seoObject.name('SEO Object');

  seoObject
    .createField('title')
    .name('Title')
    .type('Symbol')
    .validations([{ unique: true }])
    .required(true);
  seoObject.displayField('title');

  seoObject
    .createField('description')
    .name('Description')
    .type('Text')
    .required(true);

  seoObject
    .createField('url')
    .name('URL')
    .type('Symbol')
    .required(false)
    .validations([
      {
        regexp: {
          pattern:
            '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$'
        }
      }
    ]);

  seoObject
    .createField('image')
    .name('Image')
    .type('Link')
    .linkType('Asset')
    .validations([{ linkMimetypeGroup: ['image'] }])
    .required(true);

  const homePage = migration.editContentType('homePageAssembly');
  homePage
    .createField('seoObject')
    .name('SEO Object')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['seoObject'] }])
    .required(true);
  homePage.moveField('seoObject').afterField('title');

  const contactPage = migration.editContentType('contactPage');
  contactPage
    .createField('seoObject')
    .name('SEO Object')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['seoObject'] }])
    .required(true);
  contactPage.moveField('seoObject').afterField('title');

  const sitePage = migration.editContentType('sitePage');
  sitePage
    .createField('seoObject')
    .name('SEO Object')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['seoObject'] }])
    .required(true);
  sitePage.moveField('seoObject').afterField('title');
};
