import PageWrapper from '../components/PageWrapper';
import ImageTile from '../components/ImageTile';
import SEO from '../components/SEO';

import { createClient } from 'contentful';

const Home = (props) => {
  const images = props.fields.sections[0].fields.images;

  return (
    <div>
      <SEO
        title={`Jim Sam | ${props.fields.title}`}
        description={props.fields.abstract}
        url="https://www.jamessam.com/"
        image={props.fields.favicon.fields.file.url}
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
};

Home.getInitialProps = async () => {
  const homePages = await client.getEntries({
    content_type: 'page',
    'fields.slug': '/',
  });
  return homePages.items[0];
};

export default Home;

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
  environment: process.env.ENVIRONMENT_ID,
});
