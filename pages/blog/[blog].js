import PageWrapper from '../../components/PageWrapper';
import SEO from '../../components/SEO';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const BlogPage = (props) => {
  const { blog } = props;
  const fullTitle = `Jim Sam | ${blog.fields.title}`;
  const url = `http://jamessam.com/blog/${blog.fields.slug}`;
  const body = convertBody(blog.fields.body);
  let category = blog.fields.category;
  let categoryName = !category ? 'not categorized' : category.fields.name;

  return (
    <div>
      <SEO
        title={fullTitle}
        description={blog.fields.shortDescription}
        url={url}
      />
      <PageWrapper>
        <h1>
          <a
            href={blog.fields.inspiration}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(0, 0, 0, 0.75)',
              textDecoration: 'none',
            }}
          >
            {blog.fields.title}
          </a>
        </h1>
        <blockquote style={{ fontSize: 'small' }}>
          {blog.fields.writtenOn} | <span>{categoryName}</span>
        </blockquote>
        <div>{body}</div>
      </PageWrapper>
    </div>
  );
};

export default BlogPage;

BlogPage.getInitialProps = async (context) => {
  const blog = await client.getEntries({
    content_type: 'blog',
    'fields.slug': context.query.blog,
  });

  return { blog: blog.items[0] };
};

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
  environment: process.env.ENVIRONMENT_ID,
});

// This is ugly, but convertBody() and parseSocial() are the same code from the
// About page. If you modify this, consider updating the about page.
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
