import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";

export default function ColX({ blok }) {
  return (
      <div {...storyblokEditable(blok)} className={`col-${blok.colnum} ${blok.class}`}>
          {blok.content?.map((nestedBlok) => (
                <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
      </div>
  );
}
