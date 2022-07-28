import React, { useState, useEffect } from "react";
import { Button, Container, Row, Form, Card, CardGroup } from "react-bootstrap";
import { fetchListTitles } from "../utils/list-titles";
import Auth from '../utils/auth';
import { saveTitleIds, getSavedTitleIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_TITLE } from "../utils/mutations";
import { fetchTitleDetails } from "../utils/title-details";

const QuizPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [genres, setGenres] = useState([]);
  const [sources, setSources] = useState([]);
  // create state for holding returned titleid data
  const [searchedTitles, setSearchedTitles] = useState([])
  const [displayedTitles, setDisplayedTitles] = useState([])
  const [sourceValues, setSourceValues] = useState([]);
  const [genreValues, setGenreValues] = useState([]);
  const [typeValues, setTypeValues] = useState([]);


  // create state to hold saved titleId values
  const [savedTitleIds, setSavedTitleIds] = useState(getSavedTitleIds());
  const [saveTitle] = useMutation(SAVE_TITLE);

  // set up useEffect hook to save `savedTitleIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveTitleIds(savedTitleIds);
  });

  const types = [
    { name: "TV Series", value: "tv_series" },
    { name: "Movies", value: "movie" },
    { name: "TV Special", value: "tv_special" },
    { name: "TV Miniseries", value: "tv_miniseries" },
    { name: "Short Film", value: "short_film" },
  ];

  useEffect(() => {
    fetch(
      `https://api.watchmode.com/v1/sources/?apiKey=Vrelb0zKfG8oeTDGR0jV3fYed2WlvJR4xctxiwrB`
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
      `https://api.watchmode.com/v1/genres/?apiKey=Vrelb0zKfG8oeTDGR0jV3fYed2WlvJR4xctxiwrB`
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

  const handleUserSelection = async (sources, genres, values) => {
    try {
      const response = await fetchListTitles(sourceValues, genreValues, typeValues);
      

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { titles } = await response.json();
      

      const titleData = titles.map((title) => ({
        titleId: title.id
      }));

      setSearchedTitles(titleData); 
      console.log(titleData[0].titleId);
   

      const detailsResponse = await fetchTitleDetails((titleData[0].titleId));
      if (!detailsResponse.ok) {
        throw new Error("something went wrong!");
      }

      const { details } = await detailsResponse.json();

      const detailsData = details.map((detail) => ({
        titleId: detail.id,
        title: detail.title,
        plotOverview: detail.plot_overview,
        type: detail.type,
        poster: detail.poster,
        runtimeMinutes: detail.runtime_minutes,
        genreNames: detail.genre_names || ['No genres to display'],
        userRating: detail.user_rating,
        criticsRating: detail.critic_score,
        originalLanguage: detail.original_language,
        networkNames: detail.network_names || ['No networks to display'],
        trailer: detail.trailer,
        sources: detail.sources || ['No sources to display'],

      }));

      setDisplayedTitles(detailsData);

    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a title to our database
  const handleSaveTitle = async (titleId) => {
    // find the title in `searchedTitles` state by the matching id
    const titleToSave = searchedTitles.find((title) => title.titleId === titleId);

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

  const handleChangeSource = (event) => {
    event.preventDefault();

    setSourceValues(
      [...event.target.selectedOptions].map((option) => option.value)
    );
  };

  const handleChangeType = (event) => {
    event.preventDefault();

    setTypeValues(
      [...event.target.selectedOptions].map((option) => option.value)
    );
  };
  const handleChangeGenre = (event) => {
    event.preventDefault();

    setGenreValues(
      [...event.target.selectedOptions].map((option) => option.value)
    );
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Container fluid="md">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Select
                className="mt-3"
                multiple={true}
                onChange={handleChangeType}
              >
                <option name="types" disabled>
                  Select Types(s){" "}
                </option>
                {isLoaded &&
                  types.map((type) => (
                    <option value={type.value}>{type.name}</option>
                  ))}
              </Form.Select>
            </Row>
            <Row>
              <Form.Select
                className="mt-3"
                multiple={true}
                onChange={handleChangeSource}
              >
                <option name="sources" disabled>
                  Select Source(s){" "}
                </option>
                {isLoaded &&
                  sources.map((source) => (
                    <option value={source.id}>{source.name}</option>
                  ))}
              </Form.Select>
            </Row>
            <Row>
              <Form.Select
                className="mt-3"
                multiple={true}
                onChange={handleChangeGenre}
              >
                <option name="genres" disabled>
                  Select Genre(s){" "}
                </option>
                {isLoaded &&
                  genres.map((genre) => (
                    <option value={genre.id}>{genre.name}</option>
                  ))}
              </Form.Select>
            </Row>
            <Row>
              <Button className="mt-3" type="submit">
                {" "}
                Find Your Shows/Movies{" "}
              </Button>
            </Row>
          </Form>
        </Container>

        <Container>
        <h2>
          {searchedTitles.length
            ? `Viewing ${searchedTitles.length} results:`
            : ''}
        </h2>
        <CardGroup>
          {searchedTitles.map((detail) => {
            return (
              <Card key={detail.titleId} border='dark'>
                {detail.poster ? (
                  <Card.Img src={detail.poster} alt={`The cover for ${detail.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{detail.title}</Card.Title>
                  <p className='small'>Runtime: {detail.runtimeMinutes}</p>
                  <Card.Text>{detail.plotOverview}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedTitleIds?.some((savedTitleId) => savedTitleId === detail.titleId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveTitle(detail.titleId)}>
                      {savedTitleIds?.some((savedTitleId) => savedTitleId === detail.titleId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
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

//store the selected options in states
//on submit on the form, call a switch case function that returns the corresponding value
// call genres api - pass array of genres - get back genres id
// call list titles function and pass params to return list of movie/show data
// on the component you display liked movies you call the title details api and pass the title id stored under user when movie/show is liked.
//when you click on find your show/movie button, then we need to send selected options to movie rec api
//if you get any results back from api then display them on page, make another component file for that
//movie rec library should be use to generate the list of genres and streaming services.