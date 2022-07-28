import React from "react";
import { Icon } from '@chakra-ui/react'
import { FaPlug } from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="section footer">
      <footer className="footer-div text-center mt-3">
      <a href="https://www.watchmode.com/"><Icon as={FaPlug}/> Streaming data powered by Watchmode.com</a>
      </footer>
    </div>
  );
}

