const contentful = require('contentful-management');

async function main() {
  try {
    const cma = contentful.createClient({ accessToken: process.env.MGNT });
    const space = await cma.getSpace(process.env.SPACE_ID);
    const env = await space.getEnvironment(process.env.CF_ENV);

    let promises = contentTypes.map((contentType) =>
      dealWithEntries(env, contentType)
    );
    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
}

async function dealWithEntries(env, contentType) {
  const collection = await env.getEntries({ content_type: contentType });
  let deletedEntries = collection.items.map(async (entry) => {
    let unpublishedEntry = await unpublishEntity(entry);
    await unpublishedEntry.delete();
    return entry.sys.id;
  });
  await Promise.all(deletedEntries);
}

async function unpublishEntity(entity) {
  let unpublishedEntity = entity;
  if (entity.sys.publishedVersion) {
    unpublishedEntity = await entity.unpublish();
  }
  return unpublishedEntity;
}

const contentTypes = ['contactPage', 'homePageAssembly', 'htmlWidget', 'mute'];

main();
