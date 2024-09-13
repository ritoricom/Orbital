import { FC } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { SEO } from "@/lib/meta";
import { PageBar, PagePaper } from "@/ui/layout/";
import { isNonNullable } from "@/utils/eq";
import { range } from "@/utils/misc";
import { CitySelectByUser } from "@/features/misc/ui/CitySelectByUser";
import { SkeletonImageCard } from "@/features/images/ui/SkeletonImageCard";
import { ImageCard } from "@/features/images/ui/ImageCard";
import { Image } from "@/features/images";
import { useCitySelectByUser } from "@/features/misc";
import { useDeleteHotelImageConfirm } from "../hooks/use-delete-hotel-image-confirm";
import { useHotelImages } from "../hooks/use-hotel-images";
import { AddHotelImageButton } from "../ui/AddHotelImageButton";

export const HotelImages: FC = () => {
  const { city, selectProps } = useCitySelectByUser();

  const {
    isFetching,
    data: paginatedHotelImages,
    refetch,
  } = useHotelImages({
    city,
  });

  const { canDelete, openDeleteHotelImageConfirm } = useDeleteHotelImageConfirm(
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const handleSuccessAdd = () => {
    refetch();
  };

  const handleDelete = (image: Image) => {
    openDeleteHotelImageConfirm(image.id);
  };

  return (
    <>
      <SEO title="Фотографии отеля" />
      <PagePaper>
        <Typography variant="h4">Фотографии отеля</Typography>
        <PageBar>
          <CitySelectByUser {...selectProps} />
          <AddHotelImageButton city={city} onSuccess={handleSuccessAdd} />
        </PageBar>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: "215px",
            gap: "22px",
            marginTop: "16px",
          }}
        >
          {isFetching
            ? range(0, 5).map((_, idx) => <SkeletonImageCard key={idx} />)
            : isNonNullable(paginatedHotelImages) &&
              paginatedHotelImages.items.map((image) => (
                <ImageCard
                  key={image.id}
                  disabledDelete={!canDelete}
                  image={image}
                  onDelete={handleDelete}
                />
              ))}
        </Box>
      </PagePaper>
    </>
  );
};
