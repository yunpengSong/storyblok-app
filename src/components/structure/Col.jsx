import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";

export default function Col({ blok }) {

  return (
      <div {...storyblokEditable(blok)} className={`col-12 ${blok.class}`}>
          {blok.content?.map((nestedBlok) => (
                <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
      </div>
  );
}
