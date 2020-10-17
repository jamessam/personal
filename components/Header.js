import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <div className={styles.outerDiv}>
      <div className={styles.textBox}>
        <div>
          <Link href="/">
            <a className={styles.linkStyle}>Jim Sam</a>
          </Link>{' '}
          |
          <Link href="/about">
            <a className={styles.linkStyle}>About</a>
          </Link>{' '}
          |
          <Link href="/blog">
            <a className={styles.linkStyle}>Blog</a>
          </Link>{' '}
          |
          <Link href="/contact">
            <a className={styles.linkStyle}>Contact</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
