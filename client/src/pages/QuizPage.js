import React, { useState, useEffect } from "react";
import { Card, CardGroup } from "react-bootstrap";
import { fetchListTitles } from "../utils/apis/list-titles";
import Auth from "../utils/auth";
import { saveTitleIds, getSavedTitleIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_TITLE } from "../utils/mutations";
import { fetchTitleDetails } from "../utils/apis/title-details";
import {
  Spinner,
  Divider,
  Box,
  Container,
  VStack,
  FormControl,
  Button,
  FormLabel,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Select, CreatableSelect } from "chakra-react-select";
import { FaRegistered } from "react-icons/fa";

const QuizPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [genres, setGenres] = useState([]);
  const [sources, setSources] = useState([]);
  // create state for holding returned titleid data
  const [searchedTitles, setSearchedTitles] = useState([]);
  const [displayedTitles, setDisplayedTitles] = useState([]);
  // create state for holding returned selected source, genre, type vals
  const [sourceValues, setSourceValues] = useState([]);
  const [genreValues, setGenreValues] = useState([]);
  const [typeValues, setTypeValues] = useState([]);
  // create state to hold saved titleId values
  const [savedTitleIds, setSavedTitleIds] = useState(getSavedTitleIds());
  const [saveTitle] = useMutation(SAVE_TITLE);

  // hard coding types
  const types = [
    { value: "tv_series", label: "TV Series",  },
    { value: "movie", label: "Movies" },
    { value: "tv_special" , label: "TV Special"},
    { value: "tv_miniseries" , label: "TV Miniseries" },
    { value: "short_film", label: "Short Film" },
  ];

  // set up useEffect hook to save `savedTitleIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveTitleIds(savedTitleIds);
  });

  useEffect(() => {
    fetch(
      `https://api.watchmode.com/v1/sources/?apiKey=X2hnuJI9waQggvjnLIG4Z7q6JPK68Z9NRZdE0sNP`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setSources(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(
      `https://api.watchmode.com/v1/genres/?apiKey=X2hnuJI9waQggvjnLIG4Z7q6JPK68Z9NRZdE0sNP`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setGenres(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const handleUserSelection = async () => {
    try {
      const response = await fetchListTitles(
        sourceValues.map(source => source.value),
        genreValues.map(genre => genre.value),
        typeValues.map(type => type.value)
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { titles } = await response.json();

      const titleData = titles.map((title) => ({
        titleId: title.id,
      }));

      setSearchedTitles(titleData);

      let detailsResponse = [];

      for (let index = 0; index < titleData.length; index++) {
        const detailsRes = await fetchTitleDetails(titleData[index].titleId);

        const json = await detailsRes.json();
        detailsResponse.push(json);

        if (!detailsRes.ok) {
          throw new Error("something went wrong!");
        }
      }

      const detailsData = detailsResponse.map((detail) => ({
        titleId: detail.id,
        title: detail.title,
        plotOverview: detail.plot_overview,
        type: detail.type.charAt(0).toUpperCase() + detail.type.slice(1),
        poster: detail.poster,
        runtimeMinutes:
          detail.runtime_minutes + " mins" || "No runtime to display",
        genreNames: detail.genre_names.join(", ") || "No genres to display",
        userRating: detail.user_rating,
        criticsRating: detail.critic_score,
        networkNames: detail.network_names || "No networks to display",
        trailer: detail.trailer || "No trailers to display",
      }));

      setDisplayedTitles(detailsData);
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a title to our database
  const handleSaveTitle = async (titleId) => {
    // find the title in `searchedTitles` state by the matching id
    const titleToSave = displayedTitles.find(
      (title) => title.titleId === titleId
    );

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveTitle({
        variables: { titleData: { ...titleToSave } },
      });

      // if title successfully saves to user's account, save title id to state
      setSavedTitleIds([...savedTitleIds, titleToSave.titleId]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUserSelection();
  };

  console.log("source val " + sourceValues);
  console.log("genre val " + genreValues);
  console.log("type val " + typeValues);

  // const handleChangeSource = (event) => {
  //   if (event.target === "select-multiple")
  //     setSourceValues(
  //       [...event.target.selectedOptions].map((option) => option.value)
  //     );
  // };
  // console.log(sourceValues);

  // const handleChangeType = (event) => {
  //   if (event.target === "select-multiple") {
  //     setTypeValues(
  //       [...event.target.selectedOptions].map((option) => option.value)
  //     );
  //   }
  //   console.log(typeValues);
  // };
  // const handleChangeGenre = (event) => {
  //   if (event.target === "select-multiple") {
  //     setGenreValues(
  //       [...event.target.selectedOptions].map((option) => option.value)
  //     );
  //   }
  // };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  } else {
    return (
      <>
        <Box>
          <FormControl p={4}>
            <FormLabel>Select type of show or movie</FormLabel>
            <Select
              isMulti
              isSearchable
              options={types}
              size="md"
              placeholder="Select one or more types"
              value={typeValues}
              closeMenuOnSelect={false}
              onChange={setTypeValues}
              className="selectTypes"
            ></Select>

            <Select
              isMulti
              isSearchable
              options={
                isLoaded &&
                sources.map(({ id, name }) => ({ value: id, label: name }))
              }
              size="md"
              placeholder="Select one or more viewing sources"
              closeMenuOnSelect={false}
              onChange={setSourceValues}
              value={sourceValues}
              className="selectSource"
            ></Select>

            <Select
              isMulti
              isSearchable
              options={
                isLoaded &&
                genres.map(({ id, name }) => ({ value: id, label: name }))
              }
              size="md"
              placeholder="Select one or more genres"
              closeMenuOnSelect={false}
              onChange={setGenreValues}
              value={genreValues}
              className="selectGenres"
            ></Select>

            <Button my={16} colorScheme="blue" type="submit" onClick={handleSubmit}>
              {" "}
              Find Your Shows/Movies{" "}
            </Button>
          </FormControl>
        </Box>

        <Divider />
        <Container>
          <h2>
            {displayedTitles.length
              ? `Viewing ${displayedTitles.length} results:`
              : ""}
          </h2>
          <CardGroup>
            {displayedTitles.map((detail) => {
              return (
                <Card key={detail.titleId} border="dark">
                  {detail.poster ? (
                    <Card.Img
                      src={detail.poster}
                      alt={`The cover for ${detail.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{detail.title}</Card.Title>
                    <p className="small">Runtime: {detail.runtimeMinutes}</p>
                    <p className="small">Genres: {detail.genreNames}</p>
                    {/* <p className='small'>Sources: {detail.sources.name}</p> */}
                    <p className="small">Type: {detail.type}</p>
                    <p className="small">User Rating: {detail.userRating}</p>
                    <p className="small">
                      Critics Rating: {detail.criticsRating}
                    </p>

                    <Card.Text className="mt-3">
                      {detail.plotOverview}
                    </Card.Text>
                    {/* <p className="mt-3">
                      <iframe
                        width="230"
                        height="205"
                        src={detail.trailer}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </p> */}
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedTitleIds?.some(
                          (savedTitleId) => savedTitleId === detail.titleId
                        )}
                        className="btn-block btn-info mt-3"
                        onClick={() => handleSaveTitle(detail.titleId)}
                      >
                        {savedTitleIds?.some(
                          (savedTitleId) => savedTitleId === detail.titleId
                        )
                          ? "Added to your Watchlist"
                          : "Add to Watchlist"}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </CardGroup>
        </Container>
      </>
    );
  }
};

export default QuizPage;
