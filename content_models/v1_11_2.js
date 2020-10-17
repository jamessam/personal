const contentful = require('contentful-management');

async function main() {
  try {
    const cma = contentful.createClient({ accessToken: process.env.MGNT });
    const space = await cma.getSpace(process.env.SPACE_ID);
    const env = await space.getEnvironment(process.env.CF_ENV);

    let entry;
    entry = await env.getEntry('2MRXolZHiSF5ISe177yFLy');
    await createNewPage(env, entry, 'setOfTwoImages', 'contact');
    entry = await env.getEntry('4aZIRhtcK0LW71i7YOfdOY');
    await createNewPage(env, entry, 'setOfFourImages', '/');
  } catch (error) {
    console.error(error);
  }
}

async function createNewPage(env, entry, contentType, slug) {
  let newPage;
  try {
    const seo = await env.getEntry(entry.fields.seoObject['en-US'].sys.id);

    const imagesAssembly = await env.createEntry(contentType, {
      fields: {
        title: { 'en-US': `${entry.fields.title['en-US']} images` },
        images: entry.fields.images,
      },
    });
    await imagesAssembly.publish();

    newPage = await env.createEntry('page', {
      fields: {
        title: seo.fields.title,
        slug: { 'en-US': slug },
        favicon: seo.fields.image,
        abstract: seo.fields.description,
        sections: {
          'en-US': [
            {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: imagesAssembly.sys.id,
              },
            },
          ],
        },
      },
    });
    await newPage.publish();
  } catch (error) {
    throw `There was a problem creating a new page ${error}`;
  }

  return newPage;
}

main();
