import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_TITLE } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeTitleId } from '../utils/localStorage';

const SavedTitles = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeTitle] = useMutation(REMOVE_TITLE);
  const userData = data?.me || {};

  // create function that accepts the title's mongo _id value as param and deletes the title from the database
  const handleDeleteTitle = async (titleId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
       await removeTitle({
        variables: { titleId },
      });

      // upon success, remove title's id from localStorage
      removeTitleId(titleId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
        <Container>
          <h1>Viewing saved titles!</h1>
        </Container>
      <Container>
        <h2>
          {userData.savedTitles.length
            ? `Viewing ${userData.savedTitles.length} saved ${userData.savedTitles.length === 1 ? 'title' : 'titles'}:`
            : 'You have no saved titles!'}
        </h2>
          {userData.savedTitles.map((title) => {
            return (
                <Card key={title.titleId} border='dark'>
                {title.poster ? (
                  <Card.Img src={title.poster} alt={`The cover for ${title.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{title.title}</Card.Title>
                  <p className='small'>Runtime: {title.runtimeMinutes}</p>
                  <p className='small'>Genres: {title.genreNames}</p>
                  <p className='small'>Type: {title.type}</p>
                  <p className='small'>User Rating: {title.userRating}</p>
                  <p className='small'>Critics Rating: {title.criticsRating}</p>
                  <Card.Text className='mt-3'>{title.plotOverview}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteTitle(title.titleId)}>
                    Delete this Title!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </Container>
    </>
  );
};

export default SavedTitles;