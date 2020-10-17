/**
 * This script changes the content model to:
 * - Add a YouTube content type
 * - Add a Twitter content type
 */

module.exports = function(migration) {
  const yt = migration.createContentType('youtube').name('YouTube');

  yt.createField('title')
    .name('Title')
    .type('Symbol')
    .validations([{ unique: true }])
    .required(true);
  yt.displayField('title');

  yt.createField('id')
    .name('ID')
    .type('Symbol')
    .validations([{ unique: true }, { size: { min: 10, max: 12 } }])
    .required(true);

  const tweet = migration
    .createContentType('tweet')
    .name('Tweet')
    .description('')
    .displayField('internalTitle');

  tweet
    .createField('internalTitle')
    .name('Internal Title')
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

  tweet
    .createField('embedCode')
    .name('Embed Code')
    .type('Text')
    .localized(false)
    .required(true)
    .validations([
      {
        regexp: {
          pattern:
            '^<blockquote class="twitter-tweet"><p lang="en" dir="ltr">\\w.*<\\/blockquote>\\s{1}<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\\/script>',
          flags: null,
        },
      },
      {
        prohibitRegexp: {
          pattern:
            '<script \\w.*<\\/blockquote>\\s{1}<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\\/script>',
          flags: null,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  tweet.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  tweet.changeFieldControl('embedCode', 'builtin', 'markdown', {});

  const bandcamp = migration
    .createContentType('bandcamp')
    .name('bandcamp')
    .description('')
    .displayField('internalTitle');

  bandcamp
    .createField('internalTitle')
    .name('Internal Title')
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

  bandcamp
    .createField('embedCode')
    .name('Embed Code')
    .type('Text')
    .localized(false)
    .required(true)
    .validations([
      {
        prohibitRegexp: {
          pattern: '<script',
          flags: null,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  bandcamp.changeFieldControl('internalTitle', 'builtin', 'singleLine', {});
  bandcamp.changeFieldControl('embedCode', 'builtin', 'markdown', {});
};
