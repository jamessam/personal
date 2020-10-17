const _ = require('lodash');
const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');
const { createClient } = require('contentful-management');

/**
 * This script migrates the content from v0 content model to v1 content model.
 */

module.exports = function(migration, { makeRequest }) {
  migration.transformEntries({
    contentType: 'sitePage',
    from: ['components'],
    to: ['body'],
    transformEntryForLocale: async function(fromFields) {
      const componentIDs = fromFields.components['en-US'].map(e => e.sys.id);
      const componentEntriesCollection = await makeRequest({
        method: 'GET',
        url: `/entries?sys.id[in]=${componentIDs.join(',')}`
      });
      const aboutPageComponentEntries = componentIDs.map(id =>
        componentEntriesCollection.items.find(entry => entry.sys.id === id)
      );

      const richTextObjects = await Promise.all(
        aboutPageComponentEntries.map(entry =>
          convertAssemblyIntoRichTextObject(entry)
        )
      );

      const richTextArray = richTextObjects.map(assembly => {
        let value = assembly.body;
        value.unshift(assembly.headline);
        return value;
      });

      const finalArray = _.flatten(richTextArray);

      return {
        body: {
          data: {},
          content: finalArray,
          nodeType: 'document'
        }
      };
    }
  });

  async function convertAssemblyIntoRichTextObject(entry) {
    const heading = {
      nodeType: 'heading-2',
      data: {},
      content: [
        {
          nodeType: 'text',
          marks: [],
          data: {},
          value: entry.fields.headline['en-US']
        }
      ]
    };
    const rt = await richTextFromMarkdown(
      entry.fields.text['en-US'],
      parseNonRichText
    );
    return {
      headline: heading,
      body: rt.content
    };
  }

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
      const environment = await space.getEnvironment('richTextMigration');
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
