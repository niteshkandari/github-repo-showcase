import React, { useEffect, useState } from "react";
import ServiceProvider from "./service/service.provider";
import Header from "./components/header";
import RepoListing from "./components/repoListing";
import { Slide, Box, Code, Stack } from "@chakra-ui/react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    let timer: null | any = null;
    setIsOpen(true);
    timer = setTimeout(() => {
      setIsOpen(false);
    }, 8000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="App">
      <ServiceProvider>
        <Header />
        <RepoListing />
      </ServiceProvider>
      <Slider isOpen={isOpen}></Slider>
    </div>
  );
}

function Slider(props: any) {
  const { isOpen } = props;
  return (
    <>
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          <Code
            style={{
              fontSize:'20px'
            }}
            colorScheme="yellow"
            children="
            Hoila 🔥 ,Welcome to my git hub portfolio,
            This app is built using react, 
            chakra ui and for getting all the repository 
            data Github api is used."
          />
        </Box>
      </Slide>
    </>
  );
}

export default App;
