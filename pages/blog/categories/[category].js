import { BlogSummary } from '../_utils';
import PageWrapper from '../../../components/PageWrapper';
import SEO from '../../../components/SEO';
import { createClient } from 'contentful';

const Category = (props) => {
  const { blogs, category, categoryID } = props;

  return (
    <div>
      <SEO
        title={`Jim Sam | ${category}`}
        description=""
        url={`https://jamessam.com/blog/categories/${categoryID}`}
      />
      <PageWrapper>
        <h1>{category}</h1>
        <div>
          {blogs.map((blog) => (
            <BlogSummary blog={blog} key={blog.sys.id} />
          ))}
        </div>
      </PageWrapper>
    </div>
  );
};

export default Category;

Category.getInitialProps = async (context) => {
  const { category } = context.query;
  const categories = await client.getEntries({
    content_type: 'category',
    'fields.slug': category,
  });

  const blogs = await client.getEntries({
    links_to_entry: categories.items[0].sys.id,
  });

  return {
    blogs: blogs.items,
    category: categories.items[0].fields.name,
    categoryID: categories.items[0].sys.id,
  };
};

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
  environment: process.env.ENVIRONMENT_ID,
});
