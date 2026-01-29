import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";

export default function Row({ blok }) {
  return (
      <div {...storyblokEditable(blok)} className={`row ${blok.class}`}>
          {blok.cols?.map((nestedBlok) => (
                <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
      </div>
  );
}
