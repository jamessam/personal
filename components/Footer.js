const Footer = () => {
  return (
    <div style={styles.footerBox}>
      <hr style={styles.hr} />
      Copyright © Jim Sam
    </div>
  );
};

export default Footer;

const styles = {
  footerBox: {
    margin: '0 auto',
    maxWidth: '700px',
    textAlign: 'center',
  },
  hr: {
    margin: '0 auto',
    maxWidth: '300px',
    marginTop: '15px',
    marginBottom: '15px',
  },
};
