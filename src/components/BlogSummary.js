import React from 'react';
import Link from 'next/link';

const BlogSummary = ({ blog }) => {
  let urlSlug = `/blog/${blog.fields.slug}`;
  let category = blog.fields.category;

  let categories = blog.fields.categories || [];

  return (
    <div>
      <Link href={urlSlug} passHref legacyBehavior>
        <a style={styles.headings}>
          <h3 style={{ marginBottom: '0' }}>{blog.fields.title}</h3>
          <div>
            {blog.fields.writtenOn} | {blog.fields.shortDescription}
          </div>
        </a>
      </Link>
      {categories.map((category, index) => {
        let categorySlug = `blog/categories/${category.fields.slug}`;
        return (
          <React.Fragment key={category.fields.slug}>
            {index > 0 && ' | '}
            <Link href={categorySlug} passHref legacyBehavior>
              <a style={styles.categoryStyle}>{category.fields.name}</a>
            </Link>
          </React.Fragment>
        );
      })}
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
export default BlogSummary;
