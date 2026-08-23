import { Typography, List, ListItem, Divider } from "@material-ui/core";

function Info() {
  const supporters = [
    "Katherine Marsee",
    "Geoffrey Michaelis",
    "Chris Nahum",
    "ThatOtherRandomHuman",
  ];

  return (
    <div
      style={{
        height: "calc(100vh - 60px)",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5">
          Thank you to the following Patreon supporters:
        </Typography>
        <List sx={{ listStyleType: "disc" }}>
          {supporters.map((supporter) => (
            <ListItem sx={{ display: "list-item" }}>{supporter}</ListItem>
          ))}
        </List>
        <Divider style={{ width: "100%", margin: "10px 0" }} />
        <Typography>
          Currently being supported by darjim and grabnar6 on Discord.
        </Typography>
        <Typography>
          Questions, comments, or concerns can be sent to{" "}
          <a
            href="mailto:crit2block@gmail.com"
            style={{ textDecoration: "none", color: "lightblue" }}
          >
            crit2block@gmail.com
          </a>
          .
        </Typography>
        <Typography>
          All game images, character names, and game pieces are © AMG & ©
          Disney.
        </Typography>
        <Typography>
          Full art upgrade cards created by{" "}
          <a
            href="https://legion.takras.net/print/upgrade"
            style={{ textDecoration: "none", color: "lightblue" }}
          >
            Legion Helper
          </a>
          .
        </Typography>
      </div>
    </div>
  );
}

export default Info;
