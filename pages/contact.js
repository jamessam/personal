import PageWrapper from '../components/PageWrapper';
import ImageTile from '../components/ImageTile';
import SEO from '../components/SEO';
import { client } from '../utils';

export default function contact(props) {
  const images = props.contact.fields.sections[0].fields.images;

  return (
    <div>
      <SEO
        title={`Jim Sam | ${props.contact.fields.title}`}
        description={props.contact.fields.abstract}
        url="https://www.jamessam.com/"
        image={props.contact.fields.favicon.fields.file.url}
      />
      <PageWrapper>
        <div style={{ paddingTop: '10px', textAlign: 'center' }}>
          <ImageTile
            destination="mailto:jim -atsa- jamessam.com"
            image={images[0]}
          />
          <ImageTile
            destination="https://twitter.com/jamessamsf"
            image={images[1]}
          />
        </div>
      </PageWrapper>
    </div>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const contactPages = await client.getEntries({
    content_type: 'page',
    'fields.slug': 'contact',
  });

  return {
    props: {
      preview,
      contact: contactPages.items[0],
    },
  };
}
