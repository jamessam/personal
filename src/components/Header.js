import Link from "next/link";

const Header = () => {
  return (
    <header style={styles.outerDiv} role="header">
      <div style={styles.textBox}>
        <nav style={{ textAlign: "center" }} role="navigation">
          <Link href="/" passHref legacyBehavior>
            <a style={styles.linkStyle} title="link to home">
              Jim Sam
            </a>
          </Link>{" "}
          |
          <Link href="/about">
            <a style={styles.linkStyle}>About</a>
          </Link>{" "}
          |
          <Link href="/blog" passHref legacyBehavior>
            <a style={styles.linkStyle}>Blog</a>
          </Link>{" "}
          |
          <Link href="/contact" passHref legacyBehavior>
            <a style={styles.linkStyle}>Contact</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

const styles = {
  linkStyle: {
    color: "#9f9f9f",
    margin: "0 10px",
    fontSize: "18px",
    textDecoration: "none",
  },

  outerDiv: {
    backgroundColor: "#222",
    minHeight: "50px",
  },

  textBox: {
    margin: "0 auto",
    maxWidth: "340px",
    padding: "0.4 rem 1.0875rem",
    paddingTop: "12px",
    paddingBottom: "12px",
  },
};
