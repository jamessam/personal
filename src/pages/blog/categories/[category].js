import Link from "next/link";
import { client } from "../../../utils";
import PageWrapper from "../../../components/PageWrapper";
import SEO from "../../../components/SEO";

export default function category(props) {
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
}

export async function getStaticProps({ params, preview = false }) {
  const { category } = params;

  const categories = await client.getEntries({
    content_type: "category",
    "fields.slug": category,
  });

  const blogs = await client.getEntries({
    links_to_entry: categories.items[0].sys.id,
  });

  return {
    props: {
      preview,
      blogs: blogs.items,
      category: categories.items[0].fields.name,
      categoryID: categories.items[0].sys.id,
    },
  };
}

export async function getStaticPaths() {
  const categories = await client.getEntries({ content_type: "category" });

  return {
    paths:
      categories.items?.map((entry) => {
        return `/blog/categories/${entry.fields.slug}`;
      }) ?? [],
    fallback: false,
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
      <Link href={urlSlug}>
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
