import React from "react";
import useForm from "../../hooks/useForm";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Select, InputLabel, Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MovieService from "../../services/MovieService";
import Alert from "../../common/alert";

export function CreateMovie({
  openDialog,
  setOpenDialog,
  initialRecordState,
  setMovies,
}) {
  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(initialRecordState);

  const onDialogClose = () => {
    setOpenDialog(false);
  };

  const validate = () => {
    let temp = {};
    temp.title = values.title !== "" ? "" : "This field is required";
    temp.year = values.year !== "" ? "" : "This field is required";
    temp.rated = values.rated !== "" ? "" : "This field is required";
    temp.released = values.released !== "" ? "" : "This field is required";
    temp.runtime = values.runtime !== "" ? "" : "This field is required";
    temp.genre = values.genre !== "" ? "" : "This field is required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const saveRecord = (e) => {
    e.preventDefault();
    console.log(values);
    if (validate()) {
      MovieService.create(values)
        .then((res) => {
          MovieService.getAll()
            .then((res2) => {
              setMovies(res2.data);
            })
            .catch((e) => {
              console.log(e);
            });
          setOpenDialog(false);
          Alert("Record Created Successfully", 1);
          setValues(initialRecordState);
        })
        .catch((e) => {
          console.log(e);
          Alert(e.response.data.message, 3);
        });
    }
  };

  return (
    <>
      <Dialog open={openDialog} onClose={onDialogClose}>
        <DialogTitle>Create new movie</DialogTitle>
        <form noValidate autoComplete="on" onSubmit={saveRecord}>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Title"
                  name="title"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.title}
                  onChange={handleInputChange}
                  {...(errors.title && {
                    error: true,
                    helperText: errors.title,
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Year"
                  name="year"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={values.year}
                  onChange={handleInputChange}
                  {...(errors.year && { error: true, helperText: errors.year })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Released"
                  name="released"
                  type="date"
                  fullWidth
                  variant="standard"
                  value={values.released}
                  onChange={handleInputChange}
                  {...(errors.released && {
                    error: true,
                    helperText: errors.released,
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="rated-select-label">Rated</InputLabel>
                <Select
                  margin="dense"
                  labelId="rated-select-label"
                  label="Rated"
                  name="rated"
                  fullWidth
                  variant="standard"
                  value={values.rated}
                  onChange={handleInputChange}
                  {...(errors.rated && {
                    error: true,
                    helperText: errors.rated,
                  })}
                >
                  <MenuItem value="G">G</MenuItem>
                  <MenuItem value="PG">PG</MenuItem>
                  <MenuItem value="PG-13">PG-13</MenuItem>
                  <MenuItem value="R">R</MenuItem>
                  <MenuItem value="NC-17">NC-17</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Runtime"
                  name="runtime"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={values.runtime}
                  onChange={handleInputChange}
                  {...(errors.runtime && {
                    error: true,
                    helperText: errors.runtime,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Genre"
                  name="genre"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.genre}
                  onChange={handleInputChange}
                  {...(errors.genre && {
                    error: true,
                    helperText: errors.genre,
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Director"
                  name="director"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.director}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Writer"
                  name="writer"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.writer}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Actors"
                  name="actors"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.actors}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Plot"
                  name="plot"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.plot}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Language"
                  name="language"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.language}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Poster"
                  name="poster"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.poster}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export function ViewMovie({ openDialog, setOpenDialog, selectedMovie }) {
  const onDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={onDialogClose} maxWidth="lg">
        <DialogTitle>View movie</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Title"
                    name="title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedMovie.title}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    label="Year"
                    name="year"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={selectedMovie.year}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    label="Released"
                    name="released"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={selectedMovie.released}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel
                    sx={{ fontSize: 12, mt: 0.8 }}
                    id="rated-select-label"
                  >
                    Rated
                  </InputLabel>
                  <Select
                    margin="dense"
                    labelId="rated-select-label"
                    label="Rated"
                    name="rated"
                    fullWidth
                    variant="standard"
                    value={selectedMovie.rated}
                  >
                    <MenuItem value="G">G</MenuItem>
                    <MenuItem value="PG">PG</MenuItem>
                    <MenuItem value="PG-13">PG-13</MenuItem>
                    <MenuItem value="R">R</MenuItem>
                    <MenuItem value="NC-17">NC-17</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    label="Runtime"
                    name="runtime"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={selectedMovie.runtime}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Genre"
                    name="genre"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedMovie.genre}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    label="Director"
                    name="director"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedMovie.director}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    label="Writer"
                    name="writer"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedMovie.writer}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Actors"
                    name="actors"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedMovie.actors}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Plot"
                    name="plot"
                    type="text"
                    multiline
                    fullWidth
                    variant="standard"
                    value={selectedMovie.plot}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Language"
                    name="language"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedMovie.language}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <img src={selectedMovie.poster} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
