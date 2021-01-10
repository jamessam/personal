import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function convertBody(rawJSON) {
  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        return parseAsset(node);
      },
      'embedded-entry-block': (node) => {
        return parseEntryBlock(node);
      },
      'embedded-entry-inline': (node) => {
        return parseInlineEntry(node);
      },
      'entry-hyperlink': (node) => {
        return parseEntryHyperlink(node);
      },
      hyperlink: (node) => {
        return parseHyperlink(node);
      },
    },
  };
  return documentToReactComponents(rawJSON, options);
}

const parseAsset = (node) => {
  let description = node.data.target.fields.description;
  let url = node.data.target.fields.file.url;
  return <img src={url} alt={description} />;
};

const parseEntryHyperlink = (node) => {
  let contentType = node.data.target.sys.contentType.sys.id;
  if (contentType === 'category') {
    let destination = `/blog/categories/${node.data.target.fields.slug}/`;
    let text = node.data.target.fields.name;
    return constructLink(destination, text);
  } else {
    return 'future link';
  }
};

const parseEntryBlock = (node) => {
  const socialEmbed = parseSocial(node.data.target);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: socialEmbed,
      }}
    />
  );
};

const parseHyperlink = (node) => {
  let destination = node.data.uri;
  let text = node.content[0].value;
  return constructLink(destination, text, true);
};

const parseInlineEntry = (node) => {
  let contentType = node.data.target.sys.contentType.sys.id;
  if (contentType === 'category') {
    let destination = `/blog/categories/${node.data.target.fields.slug}/`;
    let text = node.data.target.fields.name;
    return constructLink(destination, text);
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

const constructLink = (destination, text, externalLink = false) => {
  if (externalLink) {
    return (
      <Link href={destination}>
        <a target="_blank">{text}</a>
      </Link>
    );
  } else {
    return (
      <Link href={destination}>
        <a>{text}</a>
      </Link>
    );
  }
};
