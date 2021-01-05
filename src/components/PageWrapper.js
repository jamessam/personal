import Header from './Header';
import Footer from './Footer';

const PageWrapper = ({ children }) => (
  <div>
    <Header />
    <div style={styles}>{children}</div>
    <Footer />
  </div>
);

export default PageWrapper;

const styles = {
  paddingLeft: '15px',
  paddingRight: '15px',
  margin: '0 auto',
  maxWidth: '740px',
  textAlign: 'justify',
};
