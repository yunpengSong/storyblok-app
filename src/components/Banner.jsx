import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import { parseStyle } from '@/utils/styleParser';

export default function Banner({ blok }) {

  return (
      <div {...storyblokEditable(blok)} 
        className={`banner ${blok.class || ''}`}
        style={{
            ...parseStyle(blok.style),
            backgroundImage: blok.bgImage
            ? `url(${blok.bgImage})`
            : undefined,
        }}
        >
          {blok.content?.map((nestedBlok) => (
                <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
      </div>
  );
}
