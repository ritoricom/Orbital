import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { Nullable } from "@/types/utility";
import { LangRecord, mapLangRecord } from "@/features/misc";
import {
  fromEmptyStringToNullable,
  fromEmptyStringToOptional,
} from "@/utils/from";
import { useCreateSpecialOffer } from "../hooks/use-create-special-offer";
import {
  SpecialOfferFormValues,
  SpecialOfferForm,
} from "../ui/SpecialOfferForm";

export const CreateSpecialOffer: FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: createSpecialOffer } = useCreateSpecialOffer({
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
    await createSpecialOffer({
      ...values,
      notes: mapLangRecord(fromEmptyStringToNullable)(
        values.notes
      ) as LangRecord<Nullable<string>>,
      primaryPhone: fromEmptyStringToOptional(values.primaryPhone),
      secondaryPhone: fromEmptyStringToOptional(values.secondaryPhone),
    });
  };

  return (
    <>
      <SEO title="Добавить спецпредложение" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4" sx={{ marginBottom: "16px" }}>
          Добавить спецпредложение
        </Typography>
        <SpecialOfferForm
          submitLabel="добавить"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </PagePaper>
    </>
  );
};
