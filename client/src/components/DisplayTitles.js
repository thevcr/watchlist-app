// import React, { useState, useEffect } from "react";
// import { Button, Container, Row, Form, Card, CardGroup } from "react-bootstrap";
// import Auth from '../utils/auth';
// import QuizPage from "../pages/QuizPage";

// const DisplayTitles = () => {
//     const [displayedTitles, setDisplayedTitles] = useState([])
//     const [savedTitleIds, setSavedTitleIds] = useState(getSavedTitleIds());

//     return (
//         <>
//         <QuizPage></QuizPage>
//         <Container>
//         <h2>
//           {displayedTitles.length
//             ? `Viewing ${displayedTitles.length} results:`
//             : ''}
//         </h2>
//         <CardGroup>
//           {displayedTitles.map((detail) => {
//             return (
//               <Card key={detail.titleId} border='dark'>
//                 {detail.poster ? (
//                   <Card.Img src={detail.poster} alt={`The cover for ${detail.title}`} variant='top' />
//                 ) : null}
//                 <Card.Body>
//                   <Card.Title>{detail.title}</Card.Title>
//                   <p className='small'>Runtime: {detail.runtimeMinutes} mins</p>
//                   <p className='small'>Genres: {detail.genreNames}</p>
//                   <p className='small'>Type: {detail.type}</p>
//                   <p className='small'>User Rating: {detail.userRating}</p>
//                   <p className='small'>Critics Rating: {detail.criticsRating}</p>
//                   <Card.Text className='mt-3'>{detail.plotOverview}</Card.Text>
//                   <p className="mt-3"><iframe width="230" height="205" src={detail.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
//                   {Auth.loggedIn() && (
//                     <Button
//                       disabled={savedTitleIds?.some((savedTitleId) => savedTitleId === detail.titleId)}
//                       className='btn-block btn-info mt-3'
//                       onClick={() => handleSaveTitle(detail.titleId)}>
//                       {savedTitleIds?.some((savedTitleId) => savedTitleId === detail.titleId)
//                         ? 'This book has already been saved!'
//                         : 'Save this Title!'}
//                     </Button>
//                   )}
//                 </Card.Body>
//               </Card>
//             );
//           })}
//         </CardGroup>
//       </Container>
//       </>
//     );
// };



// export default DisplayTitles;