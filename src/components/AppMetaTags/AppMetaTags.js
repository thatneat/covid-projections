import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * public/index.html contains meta tags for the home page. Every non-home page
 * will contain react-helmet tags to override the meta tags for the home page.
 * This component helps manage the per-page meta tags.
 *
 * TypeScript definition for props:
 * @param {{canonicalUrl: string, pageTitle?: string, pageDescription: string, shareTitle?: string, shareDescription?: string}} props
 */
export default function AppMetaTags({
  canonicalUrl,
  pageTitle,
  pageDescription,
  // BUG: shareTitle and shareDescription don't work! See note below.
  shareTitle,
  shareDescription,
}) {
  let fullPageTitle = pageTitle
    ? [pageTitle, 'Covid Act Now'].join(' - ')
    : 'Covid Act Now';
  let fullCanonicalUrl = new URL(canonicalUrl, 'http://covidactnow.org/').href;

  shareTitle = shareTitle || fullPageTitle;
  shareDescription = shareDescription || pageDescription;

  return (
    <Helmet>
      {/* Keep these in sync with the meta tags marked data-react-helmet in public/index.html! */}
      <title>{fullPageTitle}</title>
      <link rel="canonical" href={fullCanonicalUrl} />
      <meta name="description" content={pageDescription} />

      {/* BUG: None of these share meta tags work! */}
      {/* https://github.com/covid-projections/covid-projections/issues/450 */}
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={shareTitle} />
      <meta property="og:description" content={shareDescription} />
      <meta name="twitter:title" content={shareTitle} />
      <meta name="twitter:description" content={shareDescription} />
    </Helmet>
  );
}
