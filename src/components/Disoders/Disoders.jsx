import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea, Container } from "@mui/material";
import bgImage from "../../assets/main/GameOver-01-768x461.webp";
import DisoderBg from "../../assets/main/DisoderBg.jpg";
import Depression from "../../assets/main/06-Depression.png";
import GAD from "../../assets/main/GAD.jpg";
import OCD from "../../assets/main/OCD.webp";
import bipolar from "../../assets/main/bipolar-t.jpg";
import Schizophrenia from "../../assets/main/Schizophrenia.jpg";
import PTSD from "../../assets/main/PTSD.jpg";
import { useNavigate } from "react-router-dom";
const Disoders = () => {

  const navigate = useNavigate();

  const navigateToComponent = (path) => {
    // Use the history.push method to navigate to the desired route
    navigate(path);
  };

  return (
    <Container
      disableGutters
      maxWidth="lg"
      sx={{
        px: {
          xs: 2,
          sm: 5,
          md: 3.5,
        },

        my: 15,
      }}

    >
      <Typography
        sx={{
          display: 'flex', // Use flexbox to create a two-column layout
          flexDirection: 'column', // Stack elements vertically
          alignItems: 'flex-start', // Align elements to the left
          p: {
            xs: 2,
            sm: 10,
            md: 2,
          },
          background: `url(${DisoderBg}) center center/cover`,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          minHeight: "400px",
          borderRadius: {
            xs: "0px 0px 27px 27px",
            md: "0px 0px 54px 54px",
          },
        }}
      >
        <div style={{ padding: '20px' }}>
          <h2 style={{ textDecoration: 'underline' }}>Major Psychological Disorders</h2>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            Mental disorders are becoming an increasingly serious problem for <br/> health organizations as more occurrences of mental illness such as  <br/> anxiety disorders, panic disorders,and depression are being  <br/>reported, not to mention their negative impact on those afflicted  <br/> with these disorders.
          </p>
        </div>
      </Typography>



      <Card
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          padding: 5,
          justifyContent: "center",
          gap: 4,
          alignItems: "center",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={Depression}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Major Depression
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pervasive and persistent low mood. Low-self esteem and lost of
              interest or pleasure in normally enjoyable activities.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => navigateToComponent('/MajorDepression')} // Redirect to the '/depression' page
            >
              Learn More
            </Button>

          </CardActions>
        </CardActionArea>

        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={GAD}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Generalized Anxiety Disorder
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Excessive, uncontrollable and often irrational worry. Excessive worry which
              often interferes with daily functioning.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigateToComponent('/GAD')} >Learn More</Button>
          </CardActions>
        </CardActionArea>

        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={OCD}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Obsessive-compulsive Disorder
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Feels the need to check things repeatedly or performs certain routines repeatedly, e.g. hand washing.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigateToComponent('/OCDTest')}>Learn More</Button>
          </CardActions>
        </CardActionArea>

      </Card>

      <Card
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          padding: 5,
          justifyContent: "center",
          gap: 4,
          alignItems: "center",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={bipolar}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Bipolar Disorder
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Periods of elevated mood (highs) and periods of depression (lows). Elevated mood is significant and is known as mania or hypomania.
              There are four distinct types of Bipolar Disorder.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigateToComponent('/BipolarDisorder')} >Learn More</Button>

          </CardActions>
        </CardActionArea>

        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={Schizophrenia}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Schizophrenia
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Abnormal social behaviour and failure to recognize what is real.
              Symptoms include false beliefs, confused thinking or auditory hallucinations.
              It's uncommon for children to be diagnosed with schizophrenia.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigateToComponent('/Schizophrenia')}>Learn More</Button>
          </CardActions>
        </CardActionArea>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={PTSD}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Post-traumatic Stress Disorder (PTSD)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Can develop after a person is exposed to one or more traumatic events, such as sexual assault, warfare, traffic collisions, terrorism or other threats on a person's life.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigateToComponent('/PTSD')} >Learn More</Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </Container>
  );
};
export default Disoders;