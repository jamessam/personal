const { createClient } = require('contentful-management');

client = createClient({ accessToken: process.env.MGNT });

function fetchEnv(client) {
  return new Promise((resolve, reject) => {
    client
      .getSpace(process.env.SPACE_ID)
      .then(space => space.getEnvironment('richTextMigration'))
      .then(env => resolve(env))
      .catch(err => reject(err));
  });
}

async function main() {
  try {
    const env = await fetchEnv(client);

    // Delete the static page component entries
    const components = await env.getEntries({
      content_type: 'staticPageComponent'
    });
    await Promise.all(
      components.items.map(entry =>
        entry.unpublish().then(entry => entry.delete())
      )
    );
  } catch (e) {
    console.error(e);
  }
}

main();
