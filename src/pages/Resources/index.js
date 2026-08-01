import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";

const resourse = {
  Youtube: [
    {
      id: 1,
      text: "Crit2Block YouTube",
      url: "https://www.youtube.com/@crit2block",
    },
    {
      id: 2,
      text: "Kokozula YouTube",
      url: "https://www.youtube.com/@kokozula",
    },
  ],
  Official: [
    {
      id: 1,
      text: "AMG Legion Docs",
      url: "https://www.atomicmassgames.com/swlegiondocs/",
    },
  ],
  Community: [
    { id: 1, text: "Legion Roller", url: "https://www.legionroller.com" },
    { id: 2, text: "Legion Helper", url: "https://legion.takras.net/" },
  ],
  "Tournament Resources": [
    { id: 1, text: "Longshanks", url: "https://legion.longshanks.org/" },
    { id: 2, text: "Event Finder", url: "https://www.legionevents.app/" },
  ],
};

function Resources() {
  return (
    <Container>
      <Grid container spacing={4} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4">Resources</Typography>
        </Grid>
        {Object.keys(resourse).map((type) => (
          <Grid key={type} container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h5">{type}</Typography>
            </Grid>
            {resourse[type].map((item) => (
              <Grid>
                <Card
                  variant="outlined"
                  key={item.id}
                  style={{
                    marginBottom: 3,
                    backgroundColor: "transparent",
                  }}
                >
                  <CardActionArea
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardContent>
                      <Typography>{item.text}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Resources;
