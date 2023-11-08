import React, { useEffect, useState } from 'react'
import {Container, Box, Typography} from '@mui/material';
import './App.css';
import SearchBar from './components/SearchBar'
import FavSideBar from './components/FavSideBar'
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    typography: {
      fontFamily: 'Helvetica+Neue'
    },
    palette: {
      primary: {
        main: '#99ffcc',
      },
    },    
})

function App() {
    //piece of state used to store saved favourites
    //this is in this component because the piece of state needs to be shared between the sidebar 
    //component and the search results component
    const [favourites, setFavourites] = useState([]);

    //function to add an item to favourites
    //this function is passed as a prop to the searchBar component and then to the searchResults component
    //so that the like buttons displayed within the results component can add data from there
    const addToFavourites = (item) =>{
      //when this function is called, it sets the current 'favourites' piece of state to the array it is 
      //plus the item passed from the child component as the argument for the function
      //the spread operator is neccessary here so that the array is 'immutable' 
      setFavourites([...favourites, item])
    }

    //function to handle removing items from the favourites array piece of state
    const removeFromFavourites = (item) => {
      //sets the favourites array piece of state to a new copy of the favourites piece of state array with the filter method applied to make a copy with all items excepts items that are equal in type and value to the item passed as an argument from the favSideBar component
      setFavourites(favourites.filter((favourite) => favourite !== item))
    }
    
    useEffect(() => {
      console.log(favourites)
    }, [favourites])

    return (
      <ThemeProvider  theme={theme}>
        <Container>
          <Typography variant="h4" data-testid="heading-component">iTunes Search</Typography>
          <Box sx={{
            display: 'flex',
          }}>
            <SearchBar favs={addToFavourites} favsState = {favourites} />
            <FavSideBar favs={favourites} removeFav = {removeFromFavourites}/>
          </Box>
        </Container>
      </ThemeProvider>
    )
}

export default App;
