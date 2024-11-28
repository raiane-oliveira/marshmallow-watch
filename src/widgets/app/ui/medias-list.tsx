import { MediaCard } from "@/entities/medias";
import { Media } from "@/shared/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui";
import { getLocale } from "next-intl/server";

interface MediasListProps {
  fetchMedia: () => Promise<Media[]>;
}

export async function MediasList({ fetchMedia }: MediasListProps) {
  const locale = await getLocale();
  const medias = await fetchMedia();

  return (
    <Carousel
      opts={{
        dragFree: true,
        loop: true,
        align: "start",
      }}
    >
      <CarouselContent className="ml-0 w-full">
        {medias?.map((media) => {

          return (
            <CarouselItem
              key={media.id}
              className="min-w-[230px] basis-[16dvw]"
            >
              <MediaCard media={media} locale={locale} />
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
