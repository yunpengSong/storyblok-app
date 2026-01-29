import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";

export default function Container({ blok }) {
  return (
    <div {...storyblokEditable(blok)} className={`container ${blok.class}`}>
        {blok.content?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </div>
  );
}
