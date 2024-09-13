import { FC } from "react";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PageBar, PagePaper } from "@/ui/layout/";
import { isNonNullable } from "@/utils/eq";
import { CitySelectByUser } from "@/features/misc/ui/CitySelectByUser";
import { EditButton } from "@/features/misc/ui/EditButton";
import { useCitySelectByUser } from "@/features/misc";
import { useContacts } from "../hooks/use-contacts";
import { ContactsDisplay } from "../ui/ContactsDisplay";
import { SkeletonContactsDisplay } from "../ui/SkeletonContactsDisplay";
import { useNavigate } from "react-router-dom";

export const Contacts: FC = () => {
  const navigate = useNavigate();

  const { city, selectProps } = useCitySelectByUser();

  const { isFetching, data: contacts } = useContacts({
    city,
  });

  const handleEditClick = () => {
    navigate(`/contacts/${city}/edit`);
  };

  return (
    <>
      <SEO title="Контакты" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4">Контакты</Typography>
        <PageBar>
          <CitySelectByUser {...selectProps} />
          <EditButton onClick={handleEditClick} />
        </PageBar>
        {isFetching ? (
          <SkeletonContactsDisplay />
        ) : (
          isNonNullable(contacts) && <ContactsDisplay contacts={contacts} />
        )}
      </PagePaper>
    </>
  );
};
