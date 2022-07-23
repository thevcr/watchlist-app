import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, CardGroup } from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveTitleIds, getSavedTitleIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_TITLE } from '../utils/mutations';

const SearchTitles = () => {
  // create state for holding returned google api data
  const [searchedTitles, setSearchedTitles] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved titleId values
  const [savedTitleIds, setSavedTitleIds] = useState(getSavedTitleIds());

  const [saveTitle] = useMutation(SAVE_TITLE);

  // set up useEffect hook to save `savedTitleIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveTitleIds(savedTitleIds);
  });

  // create method to search for titles and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch (`https://api.watchmode.com/v1/list-titles/?apiKey=${process.env.REACT_APP_WATCHMODE_KEY}&search_value=${searchInput}`);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const titleData = items.map((title) => ({
        titleId: title.id,
        title: title.titleDetails.title,
        plotOverview: title.titleDetails.titleDetails.plotOverview,
        type: title.titleDetails.type, 
        runtimeMinutes: title.titleDetails.runtimeMinutes,
        genreNames: title.titleDetails.genreNames || ['No genres to display'],
        userRating: title.titleDetails.userRating,
        criticsRating: title.titleDetails.criticsRating,
        originalLanguage: title.titleDetails.originalLanguage,
        networkNames: title.titleDetails.networkNames || ['No networks to display'],
        trailer: title.titleDetails.trailer,
        sources: title.titleDetails.sources || ['No sources to display'],
      }));

      setSearchedTitles(titleData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a Title to our database
  const handleSaveTitle = async (titleId) => {
    // find the Title in `searchedTitles` state by the matching id
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

      // if Title successfully saves to user's account, save Title id to state
      setSavedTitleIds([...savedTitleIds, titleToSave.titleId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div>
        <Container>
          <h1>Search for Titles!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a Title'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
    </div>

      <Container>
        <h2>
          {searchedTitles.length
            ? `Viewing ${searchedTitles.length} results:`
            : 'Search for a Title to begin'}
        </h2>
        <CardGroup>
          {searchedTitles.map((title) => {
            return (
              <Card key={title.titleId} border='dark'>
                {title.image ? (
                  <Card.Img src={title.image} alt={`The cover for ${title.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{title.title}</Card.Title>
                  <p className='small'>Authors: {title.authors}</p>
                  <Card.Text>{title.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedTitleIds?.some((savedTitleId) => savedTitleId === title.titleId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveTitle(title.titleId)}>
                      {savedTitleIds?.some((savedTitleId) => savedTitleId === title.titleId)
                        ? 'This Title has already been saved!'
                        : 'Save this Title!'}
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
};

export default SearchTitles;
