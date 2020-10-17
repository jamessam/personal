const contentful = require('contentful-management');
const client = contentful.createClient({ accessToken: process.env.MGNT });

async function main() {
  try {
    const space = await client.getSpace(process.env.SPACE_ID);
    const cfEnv = await space.getEnvironment(process.env.CF_ENV);
    const widgets = await cfEnv.getEntries({ content_type: 'htmlWidget' });
    parseWidgets(cfEnv, widgets.items);
  } catch (err) {
    console.error(err);
  }
}

function parseWidgets(cfEnv, widgets) {
  return widgets.map(async (widget) => {
    try {
      if (widget.fields.html['en-US'].includes('bandcamp')) {
        await createBandcamp(cfEnv, widget);
      }
      if (widget.fields.html['en-US'].includes('youtube')) {
        await createYouTube(cfEnv, widget);
      }
      if (widget.fields.html['en-US'].includes('tweet')) {
        await createTweet(cfEnv, widget);
      }
    } catch (error) {
      throw error;
    }
  });
}

async function createBandcamp(cfEnv, widget) {
  const entry = await cfEnv.createEntry('bandcamp', {
    fields: {
      internalTitle: widget.fields.title,
      embedCode: widget.fields.html,
    },
  });
  return entry;
}

async function createTweet(cfEnv, widget) {
  const result = await cfEnv.createEntry('tweet', {
    fields: {
      internalTitle: widget.fields.title,
      embedCode: widget.fields.html,
    },
  });
  return result;
}

async function createYouTube(cfEnv, widget) {
  const youTubeId = extractId(widget);
  const result = await cfEnv.createEntry('youtube', {
    fields: {
      title: widget.fields.title,
      id: { 'en-US': youTubeId },
    },
  });
  return result;
}

function extractId(widget) {
  const html = widget.fields.html['en-US'];
  const subStringIndex = html.indexOf('https://www.youtube.com/embed/');
  const youTubeId = html.substring(subStringIndex + 30, subStringIndex + 41);
  return youTubeId;
}

main();
