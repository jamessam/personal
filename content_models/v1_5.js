const _ = require('lodash');
const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');
const { createClient } = require('contentful-management');

/**
 * This script migrates the content from v0 content model to v1 content model
 * for the blog.
 */
module.exports = function(migration, { makeRequest }) {
  migration.transformEntries({
    contentType: 'blog',
    from: ['text'],
    to: ['body'],
    transformEntryForLocale: async function(fromFields) {
      // Convert the markdown to RT, handling HTML widgets
      const rt = await richTextFromMarkdown(
        fromFields.text['en-US'],
        parseNonRichText
      );
      return { body: rt };
    }
  });

  async function parseNonRichText(node) {
    let returnObj;
    switch (node.type) {
      case 'link':
        returnObj = {
          nodeType: 'hyperlink',
          content: [
            {
              data: {},
              marks: [],
              value: node.children[0].value,
              nodeType: 'text'
            }
          ],
          data: {
            uri: node.url
          }
        };
        break;
      case 'html':
        if (node.value === '<br />') {
          break;
        }
        const newEntry = await createHTMLWidget(node);
        returnObj = {
          nodeType: 'embedded-entry-block',
          content: [],
          data: {
            target: {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: newEntry.sys.id
              }
            }
          }
        };
        break;
      default:
        console.log(`The following data was thrown out: ${node.value}`);
    }
    return returnObj;
  }

  async function createHTMLWidget(node) {
    let newEntry;
    const managementClient = createClient({ accessToken: process.env.MGNT });
    try {
      const space = await managementClient.getSpace(process.env.SPACE_ID);
      const environment = await space.getEnvironment('master');
      newEntry = await environment.createEntry('htmlWidget', {
        fields: { html: { 'en-US': node.value } }
      });
      await newEntry.publish();
    } catch (e) {
      throw `Error: ${e}`;
    }
    return newEntry;
  }
};
