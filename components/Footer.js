const Footer = () => {
  return (
    <div style={styles.footerBox}>
      <hr />
      Copyright © Jim Sam
    </div>
  );
};

export default Footer;

const styles = {
  footerBox: {
    margin: '0 auto',
    maxWidth: '700px',
    paddingBottom: '25px',
    textAlign: 'center',
  },
};
