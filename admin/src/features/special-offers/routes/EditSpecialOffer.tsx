import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { assertNotNullable } from "@/utils/assert";
import { isNonNullable } from "@/utils/eq";
import { Nullable } from "@/types/utility";
import {
  fromEmptyStringToOptional,
  fromEmptyStringToNullable,
} from "@/utils/from";
import { LangRecord, mapLangRecord } from "@/features/misc";
import { useSpecialOffer } from "../hooks/use-special-offer";
import { useUpdateSpecialOffer } from "../hooks/use-update-special-offer";
import {
  SpecialOfferForm,
  SpecialOfferFormValues,
} from "../ui/SpecialOfferForm";

export const EditSpecialOffer: FC = () => {
  const navigate = useNavigate();
  const { specialOfferID } = useParams();
  assertNotNullable(specialOfferID);

  const { isFetching, data: specialOffer } = useSpecialOffer({
    specialOfferID,
  });

  const { mutateAsync: updateSpecialOffer } = useUpdateSpecialOffer({
    mutationConfig: {
      onSuccess: () => {
        navigate("/special-offers");
      },
    },
  });

  const handleCancel = () => {
    navigate("/special-offers");
  };

  const handleSubmit = async (values: SpecialOfferFormValues) => {
    await updateSpecialOffer({
      ...values,
      notes: mapLangRecord(fromEmptyStringToNullable)(
        values.notes
      ) as LangRecord<Nullable<string>>,
      primaryPhone: fromEmptyStringToOptional(values.primaryPhone),
      secondaryPhone: fromEmptyStringToOptional(values.secondaryPhone),
      specialOfferID,
    });
  };

  return (
    <>
      <SEO title="Редактировать спецпредложение" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4" sx={{ marginBottom: "16px" }}>
          Редактировать спецпредложение
        </Typography>
        {!isFetching && isNonNullable(specialOffer) && (
          <SpecialOfferForm
            submitLabel="сохранить изменения"
            initialValues={specialOffer}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </PagePaper>
    </>
  );
};
