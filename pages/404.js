import PageWrapper from '../components/PageWrapper';

export default function NotFoundPage() {
  return (
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
  );
}
