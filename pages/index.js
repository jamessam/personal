import Head from 'next/head';
import Container from '../components/Container';
import ImageTile from '../components/ImageTile';

import { createClient } from 'contentful';

const Home = (props) => {
  const images = props.items[0].fields.sections[0].fields.images;

  return (
    <div>
      <Container>
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
      </Container>
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  const homePages = await client.getEntries({
    content_type: 'page',
    'fields.slug': '/',
  });

  return homePages;
};

export default Home;

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
  environment: process.env.ENVIRONMENT_ID,
});
