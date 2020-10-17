import Container from '../components/Container';
import ImageTile from '../components/ImageTile';
import SEO from '../components/SEO';

import { createClient } from 'contentful';

const Contact = (props) => {
  const images = props.fields.sections[0].fields.images;

  return (
    <div>
      <SEO
        title={`Jim Sam | ${props.fields.title}`}
        description={props.fields.abstract}
        url="https://www.jamessam.com/"
        image={props.fields.favicon.fields.file.url}
      />
      <Container>
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
      </Container>
    </div>
  );
};

Contact.getInitialProps = async () => {
  const contactPages = await client.getEntries({
    content_type: 'page',
    'fields.slug': 'contact',
  });
  return contactPages.items[0];
};

export default Contact;

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
  environment: process.env.ENVIRONMENT_ID,
});
