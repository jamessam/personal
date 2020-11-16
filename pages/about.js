import PageWrapper from '../components/PageWrapper';
import SEO from '../components/SEO';

import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function about(props) {
  const { seoObject, body } = props.about.fields;
  const bodyData = convertBody(body);

  return (
    <div>
      <SEO
        title={`Jim Sam | ${seoObject.fields.title}`}
        description={seoObject.fields.description}
        url="https://www.jamessam.com/"
        image={seoObject.fields.image.fields.file.url}
      />
      <PageWrapper>{bodyData}</PageWrapper>
    </div>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const aboutPages = await client.getEntries({
    content_type: 'sitePage',
    'fields.title': 'About Page',
  });

  return {
    props: {
      preview,
      about: aboutPages.items[0],
    },
  };
}

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
  environment: process.env.ENVIRONMENT_ID,
});

// This is ugly, but convertBody() and parseSocial() are the same code from the
// blog template. If you modify this, consider updating the blog template.
//
// I structured it this way because I wanted the blog code to be as self-
// contained as possible.
const convertBody = (rawJSON) => {
  const options = {
    renderNode: {
      'embedded-entry-block': (node) => {
        const socialEmbed = parseSocial(node.data.target);
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: socialEmbed,
            }}
          />
        );
      },
    },
  };
  return documentToReactComponents(rawJSON, options);
};

const parseSocial = (entry) => {
  let result;
  if (entry.sys.contentType.sys.id === 'youtube') {
    result = `<center><iframe width="560" height="315" class="you-tube-video" src="https://www.youtube.com/embed/${entry.fields.id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></center>`;
  } else if (entry.sys.contentType.sys.id === 'tweet') {
    result = entry.fields.embedCode;
  } else if (entry.sys.contentType.sys.id === 'bandcamp') {
    result = entry.fields.embedCode;
  }
  return result;
};
