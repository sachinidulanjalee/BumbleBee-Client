import React, { useState, useEffect } from "react";
import moment from "moment";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EnhancedTable from "../../components/EnhancedTable";
import MovieService from "../../services/MovieService";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CreateMovie,ViewMovie } from "./MovieForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const initialRecordState = () => ({
  id: 0,
  title: "",
  year: 0,
  rated: "",
  released: "",
  runtime: 0,
  genre: "",
  director: "",
  writer: "",
  actors: "",
  plot: "",
  language: "",
  poster: "",
});

const columns = [
  { id: "title", label: "Title" },
  { id: "year", label: "Year" },
  { id: "rated", label: "Rated" },
  { id: "released", label: "Released" },
  { id: "runtime", label: "Runtime" },
  { id: "genre", label: "Genre" },
  { id: "actions", label: "Actions", width: "10%", disableSorting: true },
];
export default function MovieList() {
  const [errorList, setErrorList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(initialRecordState);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    MovieService.getAll()
      .then((response) => {
        setMovies(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCreateDialogOpen = () => {
    setErrorList([]);
    setOpenCreateDialog(true);
  };

  const handleViewDialogOpen = (item) => {
    if (item != null) {
      MovieService.get(item)
        .then((res) => {
          console.log(res.data);
          setSelectedMovie(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setOpenViewDialog(true);
    }
  };

  const handleEditDialogOpen = (item) => {
    if (item != null) {
      MovieService.get(item)
        .then((res) => {
          setSelectedMovie(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setOpenEditDialog(true);
    }
  };

  const handleDeleteDialogOpen = (item) => {
    if (item != null) {
      MovieService.get(item)
        .then((res) => {
          setSelectedMovie(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setOpenDeleteDialog(true);
    }
  };

  const {
    EnhancedTableContainer,
    EnhancedTableHead,
    EnhancedTablePagination,
    recordsAfterPagingAndSorting,
  } = EnhancedTable(columns, movies);

  return (
    <>
      <Card sx={{ m: 5 }}>
        <CardHeader title="Movies"></CardHeader>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            disableElevation
            onClick={handleCreateDialogOpen}
          >
            New Movie
          </Button>
          <EnhancedTableContainer>
            <EnhancedTableHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.year}</TableCell>
                  <TableCell>{movie.rated}</TableCell>
                  <TableCell>
                    {moment(movie.released).format("yyyy-MM-DD")}
                  </TableCell>
                  <TableCell>{movie.runtime}</TableCell>
                  <TableCell>{movie.genre}</TableCell>
                  <TableCell>
                    <button
                      type="submit"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="View"
                      onClick={() => {
                        handleViewDialogOpen(movie.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faFileAlt} size="lg" />
                    </button>
                    <button
                      type="submit"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                      onClick={() => {
                        handleEditDialogOpen(movie.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                    </button>
                    <button
                      type="submit"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                      onClick={() => {
                        handleDeleteDialogOpen(movie.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </EnhancedTableContainer>
          <CreateMovie
            openDialog={openCreateDialog}
            setOpenDialog={setOpenCreateDialog}
            setMovies={setMovies}
            initialRecordState={initialRecordState}
          ></CreateMovie>
          <ViewMovie
            openDialog={openViewDialog}
            setOpenDialog={setOpenViewDialog}
            selectedMovie={selectedMovie}
          ></ViewMovie>
        </CardContent>
      </Card>
    </>
  );
}
