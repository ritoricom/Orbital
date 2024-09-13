import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { ForbiddenError } from "@/errors";
import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { isNonNullable } from "@/utils/eq";
import { assertNotNullable } from "@/utils/assert";
import { City, useCityByUser } from "@/features/misc";
import { useUpdateContacts } from "../hooks/use-update-contacts";
import { useContacts } from "../hooks/use-contacts";
import { Location } from "../types/location";
import { ContactsForm, ContactsFormValues } from "../ui/ContactsForm";

export const EditContacts: FC = () => {
  const navigate = useNavigate();
  const { city } = useParams();
  assertNotNullable(city);

  const { city: cityByUser, accessToOtherCities } = useCityByUser();

  const { isFetched, data: contacts } = useContacts({
    city: city as City,
  });

  const { mutateAsync: updateNewsletter } = useUpdateContacts({
    mutationConfig: {
      onSuccess: () => {
        navigate("/contacts");
      },
    },
  });

  const handleSubmit = async (values: ContactsFormValues) => {
    await updateNewsletter({
      ...values,
      location: values.location as Location,
    });
  };

  const handleCancel = () => {
    navigate("/contacts");
  };

  useEffect(() => {
    if (!accessToOtherCities && city !== cityByUser) {
      throw new ForbiddenError();
    }
  }, [city, cityByUser]);

  return (
    <>
      <SEO title="Редактировать контакты" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4" sx={{ marginBottom: "16px" }}>
          Редактировать контакты
        </Typography>
        {isFetched && isNonNullable(contacts) && (
          <ContactsForm
            submitLabel="сохранить изменения"
            initialValues={contacts}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </PagePaper>
    </>
  );
};
