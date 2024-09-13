import { FC } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export const SkeletonContactsDisplay: FC = () => (
  <Grid container spacing={2} sx={{ paddingTop: "12px" }}>
    <Grid container item xs={6} spacing={2}>
      <Grid item xs={4}>
        <Typography>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ color: "#726B5D" }}>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ color: "#726B5D" }}>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ color: "#726B5D" }}>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ color: "#726B5D" }}>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>
          <Skeleton variant="text" />
        </Typography>
      </Grid>
    </Grid>
    <Grid container item xs={6}>
      <Skeleton variant="rounded" sx={{ width: "100%", height: "100%" }} />
    </Grid>
  </Grid>
);
