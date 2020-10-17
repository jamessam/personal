import Header from './Header';
// import Footer from './Footer';

const Container = ({ children }) => (
  <div>
    <Header />
    <div style={styles}>{children}</div>
    {/* <Footer /> */}
  </div>
);

export default Container;

const styles = {
  margin: '0 auto',
  textAlign: 'justify',
};
