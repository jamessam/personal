import { client } from '../../utils';
import PageWrapper from '../../components/PageWrapper';
import SEO from '../../components/SEO';
import BlogSummary from '../../components/BlogSummary';

export default function blogHome(props) {
  const { blogs } = props;

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
}

export async function getStaticProps({ params, preview = false }) {
  const blogPosts = await client.getEntries({
    content_type: 'blog',
    order: '-fields.writtenOn',
  });

  return {
    props: {
      preview,
      blogs: blogPosts.items,
    },
  };
}
