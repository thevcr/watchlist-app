import { Flex, Text, Link } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Flex
      w="full"
      bg="blackAlpha.50"
      minHeight="20vh"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
    >
      <Text mb="3">
        This Website was helped built by{' '}
        <Link href="https://blog.appseed.us/chakra-ui-react-coding-landing-page/" isExternal color="blue.500">
          AppleSeed
        </Link>
      </Text>
      <Text opacity="0.5">Was Helped Built With Open-Source Samples - Buit with Chakra UI</Text>
    </Flex>
  );
};

export default Footer;