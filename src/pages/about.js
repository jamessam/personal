import PageWrapper from '../components/PageWrapper';
import SEO from '../components/SEO';
import { client } from '../utils';
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

// This is ugly, but convertBody() and parseSocial() are the same code from the
// blog template. If you modify this, consider updating the blog template.
//
// I structured it this way because I wanted the blog code to be as self-
// contained as possible.
const convertBody = (rawJSON) => {
  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        return parseAsset(node);
      },
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
      'embedded-entry-inline': (node) => {
        return parseInlineEntry(node);
      },
      'entry-hyperlink': (node) => {
        return parseHyperlink(node);
      },
    },
  };
  return documentToReactComponents(rawJSON, options);
};

const parseAsset = (node) => {
  let description = node.data.target.fields.description;
  let url = node.data.target.fields.file.url;
  return <img src={url} alt={description} />;
};

const parseHyperlink = (node) => {
  let contentType = node.data.target.sys.contentType.sys.id;
  if (contentType === 'category') {
    return constructLink(node);
  } else {
    return 'future link';
  }
};

const parseInlineEntry = (node) => {
  let contentType = node.data.target.sys.contentType.sys.id;
  if (contentType === 'category') {
    return constructLink(node);
  } else {
    return 'future link';
  }
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

const constructLink = (node) => {
  let destination = node.data.target.fields.slug;
  let text = node.data.target.fields.name;
  return (
    <Link href={`/blog/categories/${destination}/`}>
      <a>{text}</a>
    </Link>
  );
};
