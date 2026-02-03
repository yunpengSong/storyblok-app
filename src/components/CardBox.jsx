import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import { parseStyle } from '@/utils/styleParser';

export default function CardBox({ blok }) {
  return (
      <div {...storyblokEditable(blok)} className={`${blok.class}`} style={parseStyle(blok.style)}>
          {blok.content?.map((nestedBlok) => (
                <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
      </div>
  );
}
