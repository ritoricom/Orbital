import { FC } from "react";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import { displayPhone } from "@/utils/display";
import { Contacts } from "../types/contacts";
import { displayLocation } from "../utils/display";

export interface ContactsDisplayProps {
  contacts: Contacts;
}

export const ContactsDisplay: FC<ContactsDisplayProps> = ({ contacts }) => (
  <Grid container spacing={2} sx={{ paddingTop: "12px" }}>
    <Grid container item xs={6} spacing={2}>
      <Grid item xs={4}>
        <Typography sx={{ color: "#726B5D" }}>Адрес (рус.)</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{contacts.addresses.ru}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ color: "#726B5D" }}>Адрес (англ.)</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{contacts.addresses.en}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ color: "#726B5D" }}>E-mail</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{contacts.email}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ color: "#726B5D" }}>Номер телефона</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{displayPhone(contacts.phone)}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ color: "#726B5D" }}>Метка на карте</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{displayLocation(contacts.location)}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ color: "#726B5D" }}>Ссылка на ВКонтакте</Typography>
      </Grid>
      <Grid item xs={8}>
        <Link target="_blank" rel="noreferrer" href={contacts.vkLink}>
          {contacts.vkLink}
        </Link>
      </Grid>
    </Grid>
    <Grid container item xs={6}>
      <Box
        width="100%"
        height="100%"
        defaultState={{
          center: contacts.location,
          zoom: 6,
        }}
        component={Map}
        sx={{
          borderRadius: "6px",
        }}
      >
        <Placemark geometry={contacts.location} />
      </Box>
    </Grid>
  </Grid>
);
