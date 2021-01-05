import PageWrapper from '../components/PageWrapper';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div>
      <SEO
        title={`Jim Sam | Page not found`}
        description="Page not found"
        url="https://www.jamessam.com/404.html"
        image=""
      />
      <PageWrapper>
        <div
          style={{
            marginTop: '100px',
            marginBottom: '100px',
            textAlign: 'center',
          }}
        >
          <h1>That page was not found.</h1>
          <p>
            Hey there. It looks like you're trying to access a page that doesn't
            exist. Can you check your URL again?
          </p>
        </div>
      </PageWrapper>
    </div>
  );
}
