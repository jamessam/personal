import Link from 'next/link';

import PageWrapper from '../../components/PageWrapper';
import SEO from '../../components/SEO';

import { createClient } from 'contentful';

const BlogHome = (props) => {
  const blogs = props.items;

  return (
    <div>
      <SEO
        title="Jim Sam | The Inner Monologue"
        description="Hints, allegations, but not things left unsaid in this weblog."
        url="https://jamessam.com/blog"
      />
      <PageWrapper>
        {blogs.map((blog) => (
          <BlogSummary blog={blog} key={blog.sys.id} />
        ))}
      </PageWrapper>
    </div>
  );
};

export default BlogHome;

const BlogSummary = ({ blog }) => {
  let urlSlug = `/blog/${blog.fields.slug}`;
  let category = blog.fields.category;
  let categorySlug = !category ? '/' : `categories/${category.fields.slug}`;
  let categoryName = !category ? 'not categorized' : category.fields.name;

  return (
    <div>
      <Link href={urlSlug}>
        <a style={styles.headings}>
          <h3 style={{ marginBottom: '0' }}>{blog.fields.title}</h3>
          <div>
            <Link href={categorySlug}>
              <a style={styles.categoryStyle}>{categoryName}</a>
            </Link>
            <br />
            {blog.fields.writtenOn} | {blog.fields.shortDescription}
          </div>
        </a>
      </Link>
    </div>
  );
};

BlogHome.getInitialProps = async () => {
  const blogPosts = await client.getEntries({
    content_type: 'blog',
    order: '-fields.writtenOn',
  });
  return blogPosts;
};

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
  environment: process.env.ENVIRONMENT_ID,
});

const styles = {
  categoryStyle: {
    fontVariantCaps: 'all-small-caps',
    color: '#999999',
  },
  headings: {
    color: 'inherit',
    textDecoration: 'none',
  },
};
