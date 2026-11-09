import { Typography } from "@mui/material";
import ranks from "constants/ranks";
import upgradeTypes from "constants/upgradeTypes";

function IconBadge({ avatar, count = 1, upgradeType, rank, hidden }) {
  let alt = "";
  let src = "";
  if (upgradeType && upgradeType in upgradeTypes) {
    alt = upgradeType;
    src = upgradeTypes[upgradeType].icon;
  } else if (rank && rank in ranks) {
    alt = rank;
    src = ranks[rank].icon;
  }
  return (
    <div sx={{ display: "flex", flexDirection: "row", marginLeft: -10 }}>
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <span
          sx={{
            width: 22,
            height: 22,
            borderRadius: 25,
            left: 12,
            backgroundColor: "white",
            position: "relative",
            border: "1px solid #1e2125",
            visibility: count < 2 ? "hidden" : "visible",
          }}
        >
          <Typography
            variant="button"
            sx={{
              bottom: 2,
              left: count < 10 ? 6 : 1.5,
              color: "black",
              position: "relative",
            }}
          >
            {count}
          </Typography>
        </span>
        {!hidden && (
          <span
            sx={{
              width: 22,
              height: 22,
              borderRadius: 25,
              left: 12,
              top: 1,
              backgroundColor: "white",
              position: "relative",
              border: "1px solid #1e2125",
            }}
          >
            <img alt={alt} src={src} sx={{ width: 20, height: 20 }} />
          </span>
        )}
      </div>
      {avatar}
    </div>
  );
}

export default IconBadge;
