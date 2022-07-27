import AboutUs from './components/AboutUs.js';
import Footer from './components/Footer.js';
import Hero from './components/Hero.js';
import Nav from './components/Nav.js';
import React, { useRef } from 'react';
import { useDisclosure, Box } from '@chakra-ui/react';
import DrawerComponent from './components/DrawerComponent';
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
 
  return (
    <Box>
      <Nav ref={btnRef} onOpen={onOpen} />
      <Hero />
      <AboutUs />
      <Footer />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </Box>
  );
}
 
export default App 
