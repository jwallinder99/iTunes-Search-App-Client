import * as React from 'react';
import { useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


//swipeableTemporaryDrawer component from mui is the default exported component
//This is the favourites sidebar component
export default function FavouriteSideBar(props) {

  //function to handle removing an item from the favourites list, takes the event as a parameter
  const handleRemove = (e) => {

    //variable to hold index of item to remove from favourrites array
    //value is gotten from finding the closest component with a class named 'favBtn' and getting it's id prop
    //the id prop is set to the index of the mapped item
    const indexToRemove = e.target.closest('.favBtn').id
    //props.removeFav calls the removeFavourites function from the app.js component
    //the favs array piece of state from app.js that was passed as a prop with the index of the indexToRemoe is passed as an argument to the called function
    props.removeFav(props.favs[indexToRemove])
    
    console.log(e.target.closest('.favBtn').id)
  }

  //Mui code for drawer component
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, left: open });
  };


  const list = (
    <Box
      sx={{ width: 350,
            display: 'flex' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/*the list component renders the favourites piece of state passed as a prop from the app.js component 
        the index from the array is passed as the key for each list item. props from the items in the favourites array are set to the content of each list item*/}
      <List>
        {props.favs.map((item, index) => (
          <ListItem key={index} disablePadding >
            
            <Card
              style={{
                 display: 'flex', 
                 flexDirection: 'row', 
                 width: '100%'
                }}
              
            >
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 2
                }}
              >
              <Typography component="div" variant="body1">
                {item.trackName}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div">
                {item.artistName}
            
              </Typography>
              {/*remove button handles removing an item from the list. it is also given an id that is the index, so that it can be picked up in the event listener function */}
              <Button sx={{
                display: 'flex', 
                alignItems: 'left', 
                justifyContent: 'left'}}
                onClick={handleRemove}
                id={index}
                className="favBtn"
                >
              <RemoveCircleOutlineIcon sx={{color: 'primary.main'}} />
              </Button>
              </CardContent>
              
              <CardMedia
                component="img"
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: 'center'
                  
                }}
                image={item.artworkUrl100}
                alt={item.trackName + ' Album Cover'}
              />
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
                //code from mui component
  return (
    <div>
      <Button onClick={toggleDrawer(true)}><FavoriteIcon /></Button>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
}
