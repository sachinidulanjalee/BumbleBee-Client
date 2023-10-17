import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea, Container, Box } from "@mui/material";
import avtar from "../../assets/main/user.png";
import { useNavigate } from "react-router-dom";
import professionalService from "../../services/professionalService";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";


const Professional = () => {
  const [professionals, setProfessionals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProfessionals();
  }, []);

  const getProfessionals = () => {
    professionalService.getProfessional()
      .then((response) => {
        console.log(response.data);
        setProfessionals(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
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
      <Box>
        <Typography
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(32,178,170,0.7)",
            minHeight: "50px",
          }}
        >
          <h2 style={{ color: "#ffff" }}>Medical Professionals</h2>

          <Grid item>
            <Link href="/Professionalragistration" variant="body2">
              {"Are you a psychology Professional? Join with us"}
            </Link>
          </Grid>
        </Typography>
      </Box>
      {professionals.map((professional, index) => (
        <Card
          key={index}
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
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {professional.Name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {professional.Qualifications}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact No : {professional.ContactNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email : {professional.Email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => navigate(professional.Link)}
              >
                Visit Linkend Profile
              </Button>
            </CardActions>
          </CardActionArea>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={avtar}
          />
        </Card>
      ))}
    </Container>
  );
};

export default Professional;
