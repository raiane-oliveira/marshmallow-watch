import { Genre } from "@/shared/api";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui";
import { useTranslations } from "next-intl";

interface ToggleGroupGenresListProps {
  genres: Genre[]
  value?: string
  onValueChange?: (value: string) => void
}

export function ToggleGroupGenresList({ genres, ...props }: ToggleGroupGenresListProps) {
  const dict = useTranslations("App.MoviesPage");

  return (
    <ToggleGroup {...props} type="single" defaultValue="featured" asChild>
      <section className="flex items-center gap-4-viewport px-8 w-full flex-wrap">
        <ToggleGroupItem value="featured" className="flex-shrink-0">{dict("content.genres.featured")}</ToggleGroupItem>
        {genres.map((genre) => {
          return <ToggleGroupItem key={genre.id} className="flex-shrink-0" value={genre.id}>{genre.name}</ToggleGroupItem>
        })}
      </section>
    </ToggleGroup>
  )
}
