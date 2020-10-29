import { BlogSummary } from '../../utils';
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
