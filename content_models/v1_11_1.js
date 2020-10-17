module.exports = function(migration) {
  const setOfTwoImages = migration
    .createContentType('setOfTwoImages')
    .name('Set of Two Images')
    .description('')
    .displayField('title');

  setOfTwoImages
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  setOfTwoImages
    .createField('images')
    .name('Images')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          min: 2,
          max: 2,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkMimetypeGroup: ['image'],
        },
      ],

      linkType: 'Asset',
    });

  setOfTwoImages.changeFieldControl('title', 'builtin', 'singleLine', {});
  setOfTwoImages.changeFieldControl(
    'images',
    'builtin',
    'assetLinksEditor',
    {}
  );
  const setOfFourImages = migration
    .createContentType('setOfFourImages')
    .name('Set of Four Images')
    .description('')
    .displayField('title');

  setOfFourImages
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  setOfFourImages
    .createField('images')
    .name('Images')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          min: 4,
          max: 4,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkMimetypeGroup: ['image'],
        },
      ],

      linkType: 'Asset',
    });

  setOfFourImages.changeFieldControl('title', 'builtin', 'singleLine', {});
  setOfFourImages.changeFieldControl(
    'images',
    'builtin',
    'assetLinksEditor',
    {}
  );
  const page = migration
    .createContentType('page')
    .name('Page')
    .description('')
    .displayField('title');

  page
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  page
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
    .createField('favicon')
    .name('Favicon')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  page
    .createField('abstract')
    .name('Abstract')
    .type('Text')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
    .createField('sections')
    .name('Sections')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [],
      linkType: 'Entry',
    });

  page.changeFieldControl('title', 'builtin', 'singleLine', {});
  page.changeFieldControl('slug', 'builtin', 'slugEditor', {});
  page.changeFieldControl('favicon', 'builtin', 'assetLinkEditor', {});
  page.changeFieldControl('abstract', 'builtin', 'markdown', {});
  page.changeFieldControl('sections', 'builtin', 'entryLinksEditor', {});
};
