import PageWrapper from '../components/PageWrapper';
import SEO from '../components/SEO';
import { client } from '../utils';
import convertBody from '../rich-text';

export default function about(props) {
  const { seoObject, body } = props.about.fields;
  const bodyData = convertBody(body);

  return (
    <div>
      <SEO
        title={`Jim Sam | ${seoObject.fields.title}`}
        description={seoObject.fields.description}
        url="https://www.jamessam.com/"
        image={seoObject.fields.image.fields.file.url}
      />
      <PageWrapper>{bodyData}</PageWrapper>
    </div>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const aboutPages = await client.getEntries({
    content_type: 'sitePage',
    'fields.title': 'About Page',
  });

  return {
    props: {
      preview,
      about: aboutPages.items[0],
    },
  };
}
