import Link from 'next/link';

export const BlogSummary = ({ blog }) => {
  let urlSlug = `/blog/${blog.fields.slug}`;
  let category = blog.fields.category;
  let categorySlug = !category
    ? '/'
    : `/blog/categories/${category.fields.slug}`;
  let categoryName = !category ? 'not categorized' : category.fields.name;

  return (
    <div>
      <Link href={urlSlug}>
        <a style={styles.headings}>
          <h3 style={{ marginBottom: '0' }}>{blog.fields.title}</h3>
          <div>
            {blog.fields.writtenOn} | {blog.fields.shortDescription}
          </div>
        </a>
      </Link>
      <Link href={categorySlug}>
        <a style={styles.categoryStyle}>{categoryName}</a>
      </Link>
      <br />
    </div>
  );
};

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
