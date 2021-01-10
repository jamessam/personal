import PageWrapper from '../../components/PageWrapper';
import SEO from '../../components/SEO';
import { client } from '../../utils';
import convertBody from '../../rich-text';

export default function BlogPage(props) {
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
}

export async function getStaticProps({ params, preview = false }) {
  const blog = await client.getEntries({
    content_type: 'blog',
    'fields.slug': params.blog,
    include: 2,
  });

  return {
    props: {
      preview,
      blog: blog?.items[0] ?? null,
    },
  };
}

export async function getStaticPaths() {
  const blogs = await client.getEntries({ content_type: 'blog' });
  return {
    paths:
      blogs.items?.map((entry) => {
        return `/blog/${entry.fields.slug}`;
      }) ?? [],
    fallback: false,
  };
}
