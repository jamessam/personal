import Link from "next/link";
import { client } from "../../utils";
import PageWrapper from "../../components/PageWrapper";
import SEO from "../../components/SEO";

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
    content_type: "blog",
    order: "-fields.writtenOn",
  });

  return {
    props: {
      preview,
      blogs: blogPosts.items,
    },
  };
}

const BlogSummary = ({ blog }) => {
  let urlSlug = `/blog/${blog.fields.slug}`;
  let category = blog.fields.category;
  let categorySlug = !category
    ? "/"
    : `/blog/categories/${category.fields.slug}`;
  let categoryName = !category ? "not categorized" : category.fields.name;

  return (
    <div>
      <Link href={urlSlug} passHref legacyBehavior>
        <a style={styles.headings}>
          <h3 style={{ marginBottom: "0" }}>{blog.fields.title}</h3>
          <div>
            {blog.fields.writtenOn} | {blog.fields.shortDescription}
          </div>
        </a>
      </Link>
      <Link href={categorySlug} passHref legacyBehavior>
        <a style={styles.categoryStyle}>{categoryName}</a>
      </Link>
      <br />
    </div>
  );
};

const styles = {
  categoryStyle: {
    fontVariantCaps: "all-small-caps",
    color: "#999999",
  },
  headings: {
    color: "inherit",
    textDecoration: "none",
  },
};
