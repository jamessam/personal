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
  margin: '0 auto',
  maxWidth: '760px',
  textAlign: 'justify',
};
