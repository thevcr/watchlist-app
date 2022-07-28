import { Flex, Spacer, Text, useMediaQuery,Box,
    Button, } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import {  FaSearch, FaFilm, FaRegSave } from 'react-icons/fa';
import React from 'react';
import Movie from '../assets/Movie.jpeg';
import {Link} from 'react-router-dom';


const LandingPage = () => {

  const [isLargerThanMD] = useMediaQuery('(min-width: 48em)');
  const array = [
    {
      id: 1,
      text: " Welcome to WatchList! New films and tv shows just keep coming, but you don't have to drill down to find the next thing to watch.  We understand the struggle with finding a new TV show or Movie that you can binge-watch for hours or days. Don't worry! We got you covered! ",
      icon: FaFilm,
    },
    {
      id: 2,
      text: ' Our App Watchlist gives you the option to decide what TV show or movie to watch through an easy-to-use interface. Simply click on our search button and fill out our quick questionaire. Filter TV shows by genre and streaming platform and we will comb through thousands of titles to help you pick the next new thing to watch!  ',
      icon: FaSearch,
    },
    {
      id: 3,
      text: 'Create an account with us through easy signup! WatchList allows you to browse thousands of movie and show titles.  You even have the ability to keep track of all the titles that interest you by saving them to your account so you can always come back! ',
      icon: FaRegSave,
    },
  ];
  return (
    < > 
   
    
    <Flex
      minH="70vh"
      alignItems="center"
      w="medium"
      px={isLargerThanMD ? '16' : '6'}
      py="16"
      minHeight="10vh"
      justifyContent="space-between"
      flexDirection={isLargerThanMD ? 'row' : 'column'}
    >
      <Box mr={isLargerThanMD ? '6' : '0'} w={isLargerThanMD ? '60%' : 'full'}>
        <Text
          fontSize={isLargerThanMD ? '5xl' : '4xl'}
          fontWeight="bold"
          mb="4"
        >
          {' '}
          Welcome to Watch List!
        </Text>

        <Text mb="6" fontSize={isLargerThanMD ? 'lg' : 'base'} opacity={0.7}>
         Looking for something new to watch? We gotcha!
        </Text>

        <Button
          w="200px"
          colorScheme="red"
          variant="solid"
          h="50px"
          size={isLargerThanMD ? 'lg' : 'md'}
          mb={isLargerThanMD ? '0' : '10'}
          as={Link} to='/search'
        >
          Find your shows now!
        </Button>
        </Box>
        </Flex>
       

  
  <Flex
    minH="70vh"
    alignItems="center"
    justifyContent="space-between"
    w="full"
    py="16"
    px={isLargerThanMD ? '16' : '6'}
    flexWrap="wrap"
    flexDirection={isLargerThanMD ? 'row' : 'column'}
  >


    {array.map((arr) => (
      <>
        <Flex
          height="600px"
          bg="#00000"
          width={isLargerThanMD ? '32%' : 'full'}
          shadow="md"
          p="6"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          flexDirection="column"
          textAlign="center"
          mb={isLargerThanMD ? '0' : '4'}
          border="2px solid #000000"
        >
          <Icon as={arr.icon} boxSize={14} color="red.400" mb="5" />
          <img>{arr.img}</img>
          <Text>{arr.text}</Text>

        </Flex>

        <Spacer />
      </>
    ))}
  </Flex>
  </>
);
};


export default LandingPage