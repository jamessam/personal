import Link from 'next/link';

const Header = () => {
  return (
    <div style={styles.outerDiv}>
      <div style={styles.textBox}>
        <div style={{ textAlign: 'center' }}>
          <Link href="/">
            <a style={styles.linkStyle}>Jim Sam</a>
          </Link>{' '}
          |
          <Link href="/about">
            <a style={styles.linkStyle}>About</a>
          </Link>{' '}
          |
          <Link href="/blog">
            <a style={styles.linkStyle}>Blog</a>
          </Link>{' '}
          |
          <Link href="/contact">
            <a style={styles.linkStyle}>Contact</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

const styles = {
  linkStyle: {
    color: '#9f9f9f',
    margin: '0 10px',
    fontSize: '18px',
    textDecoration: 'none',
  },

  outerDiv: {
    backgroundColor: '#222',
    minHeight: '50px',
  },

  textBox: {
    margin: '0 auto',
    maxWidth: '340px',
    padding: '0.4 rem 1.0875rem',
    paddingTop: '12px',
    paddingBottom: '12px',
  },
};
