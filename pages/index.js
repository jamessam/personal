import PageWrapper from '../components/PageWrapper';
import ImageTile from '../components/ImageTile';
import SEO from '../components/SEO';
import { client } from '../utils';

export default function home(props) {
  const images = props.home.fields.sections[0].fields.images;

  return (
    <div>
      <SEO
        title={`Jim Sam | ${props.home.fields.title}`}
        description={props.home.fields.abstract}
        url="https://www.jamessam.com/"
        image={props.home.fields.favicon.fields.file.url}
      />
      <PageWrapper>
        <div style={{ paddingTop: '10px', textAlign: 'center' }}>
          <ImageTile destination="/about" image={images[0]} />
          <ImageTile
            destination="https://github.com/jamessam"
            image={images[1]}
          />
          <ImageTile
            destination="http://www.linkedin.com/in/jamessam"
            image={images[2]}
          />
          <ImageTile
            destination="https://belligerator.bandcamp.com/album/acid-rain-dance-ep"
            image={images[3]}
          />
        </div>
      </PageWrapper>
    </div>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const homePages = await client.getEntries({
    content_type: 'page',
    'fields.slug': '/',
  });

  return {
    props: {
      preview,
      home: homePages.items[0],
    },
  };
}
