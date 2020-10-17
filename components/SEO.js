import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

class SEO extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  };

  render() {
    let { props } = this;
    let favicon = `${props.image}?w=48&h=48`;
    return (
      <Head>
        {/* General tags */}
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="image" content={props.image} />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" type="image/jpg" href={favicon} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={props.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content="https://www.jamessam.com/jim.jpg" />
        <meta property="og:site_name" content="Jim Sam" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@jamessamsf" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:image" content="https://www.jamessam.com/jim.jpg" />
      </Head>
    );
  }
}

export default SEO;
