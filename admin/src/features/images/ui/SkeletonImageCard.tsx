import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export const SkeletonImageCard = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    }}
  >
    <Skeleton
      variant="rounded"
      sx={{
        width: "100%",
        height: "calc(100% - 44px)",
        borderRadius: "4px",
      }}
    />
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "3px",
      }}
    >
      <Skeleton variant="circular" width={44} height={44} />
      <Skeleton variant="circular" width={44} height={44} />
    </Box>
  </Box>
);
