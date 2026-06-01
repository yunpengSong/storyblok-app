import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

export default async function Page({ params }) {
  const { slug } = await params;
  const fullSlug = slug ? slug.join('/') : 'home';
  const storyblokApi = getStoryblokApi();

  try {
    let { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
      version: 'draft',
    });
    return <StoryblokStory story={data.story} />;
  } catch (error) {
    console.error('Storyblok error:', error.message);
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Storyblok Content Not Found</h1>
        <p>Slug: <strong>{fullSlug}</strong></p>
        <p style={{ marginTop: '1rem' }}>
          Please create this story in your Storyblok space,
          <br />or use the Storyblok Visual Editor to create content.
        </p>
        <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Error: {error.message}
        </p>
      </div>
    );
  }
}