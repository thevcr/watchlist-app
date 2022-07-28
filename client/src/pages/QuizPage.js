import React, { useState, useEffect } from "react";
import { Box, Container, Divider, VStack, FormControl, Button, FormLabel, Image, Heading, Text, useBoolean, FormErrorMessage } from '@chakra-ui/react';
import { Select, CreatableSelect } from "chakra-react-select";
import { useForm, useController } from "react-hook-form";
// import { Button, Container, Row, Form, Card, CardGroup } from "react-bootstrap";
import { fetchListTitles } from "../utils/list-titles";
import Auth from '../utils/auth';
import { saveTitleIds, getSavedTitleIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_TITLE } from "../utils/mutations";
import { fetchTitleDetails } from "../utils/title-details";
// import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";
import { FaRegistered } from "react-icons/fa";

const ControlledSelect = ({ control, name, id, label, rules, ...props }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules
  });

  return (
    <FormControl py={4} isInvalid={!!error} id={id}>
      <FormLabel>{label}</FormLabel>

      <Select
        isMulti
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        {...props}
      />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

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
    { label: "TV Series", value: "tv_series" },
    { label: "Movies", value: "movie" },
    { label: "TV Special", value: "tv_special" },
    { label: "TV Miniseries", value: "tv_miniseries" },
    { label: "Short Film", value: "short_film" },
  ];

  useEffect(() => {
    fetch(
      `https://api.watchmode.com/v1/sources/?apiKey=5nZyqpvJWGqV4CpMBVHkdfj36cAQD20UjZ4DIk6l`
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
      `https://api.watchmode.com/v1/genres/?apiKey=5nZyqpvJWGqV4CpMBVHkdfj36cAQD20UjZ4DIk6l`
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
        sourceValues,
        genreValues,
        typeValues
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
  
 
  const handleChangeSource = (event) => {
    if (event.target === "select-multiple") {
      setSourceValues(
        [...event.target.selectedOptions].map((option) => option.value)
      );
    }
  };

  const handleChangeType = (event) => {
    if (event.target === "select-multiple") {
      setTypeValues(
        [...event.target.selectedOptions].map((option) => option.value)
      );
    }
  };
  const handleChangeGenre = (event) => {
    if (event.target === "select-multiple") {
      setGenreValues(
        [...event.target.selectedOptions].map((option) => option.value)
      );
    }
  };
 

const onSubmit = data => {
  console.log(data);
handleUserSelection(data)};

  const defaultValues = { types: [], genres: [], sources: [] };

  const { control, handleSubmit } = useForm({ defaultValues, mode: 'onSubmit' });

  const [isLoading, setLoading] = useBoolean(false);

 
 
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Box>
          <Container as="form" p={4} onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>
              Select type of show or movie
            </FormLabel>
               <Select 
                isMulti         
                name="types"
                options={types}
                size="md"
                placeholder="select one or more types"
                closeMenuOnSelect={false}
                control={control}
                onChange={handleChangeType} // send value to hook form
                
                />
                          
              <Select
                isMulti
                defaultValues="sources"
                name="sources"
                options={sources.map(({id, name}) => ({ value: id, label: name }))}
                size="md"
                placeholder="Select one or more viewing sources"
                closeMenuOnSelect={false}
                control={control}
                onChange={handleChangeSource} // send value to hook form
              />
           
           
              <Select
                isMulti
                name="genres"
                options={genres.map(({id, name}) => ({ value: id, label: name }))}
                size="md"
                placeholder="Select one or more genres"
                closeMenuOnSelect={false}
                control={control}
                onChange={handleChangeGenre} // send value to hook form
              />
              
            
              <Button isLoading={isLoading} my={16} colorScheme='blue' type="submit">
                {" "}
                Find Your Shows/Movies{" "}
              </Button>
              </Container>
          </Box>


<Divider/>

        <Box>
          <Heading> {displayedTitles.length
              ? `Viewing ${displayedTitles.length} results:`
              : ""}</Heading>
          <Image  src={detail.poster}
                      alt={`The cover for ${detail.title}`}
                    />
          
          <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='blue'>
            
          </Badge>
          <Box color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'>
            {displayedTitles.map((detail) => {
              return (
                <Box id={detail.titleId}>
                 </Box>)})}
            </Box>
            </Box>

            
          
          
            
                  <Box>
                    <Heading>{detail.title}</Heading>
                    <p className="small">Runtime: {detail.runtimeMinutes}</p>
                    <p className="small">Genres: {detail.genreNames}</p>
                    {/* <p className='small'>Sources: {detail.sources.name}</p> */}
                    <p className="small">Type: {detail.type}</p>
                    <p className="small">User Rating: {detail.userRating}</p>
                    <p className="small">
                      Critics Rating: {detail.criticsRating}
                    </p>

                    <Text className="mt-3">
                      {detail.plotOverview}
                    </Text>
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
                  </Box>          
                  </Box>
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
