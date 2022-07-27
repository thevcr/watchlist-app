import {
    Box,
    Button,
    Flex,
    Img,
    Spacer,
    Text,
    useMediaQuery,
  } from '@chakra-ui/react';
  import React from 'react';
  import Movie from '../assets/Movie.jpeg';
  
  const Hero = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    return (
      <Flex
        alignItems="center"
        w="full"
        px={isLargerThanLG ? '16' : '6'}
        py="16"
        minHeight="90vh"
        justifyContent="space-between"
        flexDirection={isLargerThanLG ? 'row' : 'column'}
      >
        <Box mr={isLargerThanLG ? '6' : '0'} w={isLargerThanLG ? '60%' : 'full'}>
          <Text
            fontSize={isLargerThanLG ? '5xl' : '4xl'}
            fontWeight="bold"
            mb="4"
          >
            {' '}
            Welcome to Watch List!
          </Text>
  
          <Text mb="6" fontSize={isLargerThanLG ? 'lg' : 'base'} opacity={0.7}>
            Having trouble looking for the next movie or show? My WatchList can help you out! Simply fill out our quick questionaire to assist you in discovering the next show or movie!
          </Text>
  
          <Button
            w="200px"
            colorScheme="blue"
            variant="solid"
            h="50px"
            size={isLargerThanLG ? 'lg' : 'md'}
            mb={isLargerThanLG ? '0' : '10'}
            onClick={(e) => {
              e.preventDefault();
              window.location.href='PUTLINKHERE';
              }}
          >
            Take The Questionaire!
          </Button>
        </Box>
        <Spacer />
        <Flex
          w={isLargerThanLG ? '40%' : 'full'}
          alignItems="center"
          justifyContent="center"
        >
          <Img src={Movie} alt="Chakra UI" />
        </Flex>
      </Flex>
    );
  };
  
  export default Hero;