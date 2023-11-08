import React, { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Container, Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


//search results component 
const SearchResults = (props) => {
    //error piece of state for handling potential errors
    const [error, setError] = useState(null);
    //piece of state for     
    const [data, setData] = useState([])
    //results variable to hold results passed as props from searchBar component
    //isArray method to check if the value passed from props is an array or if it's empty
    //if results is empty, set results to an empty array, else set results to the data.results passed as props from the searchBar component
    //this will make it so that if there hasn't been a result , the map method wont render anything, but when a result exists, it will map the data to components
    const results = Array.isArray(props.data.results) ? props.data.results : [];
    
  //function to handle clicking save on a result. it takes the item (which is from using the map method) and calls the function in the app component passed as props with the item as an argument
    const handleSave = (item) => {
      console.log(item)
      //calls props.fav(function passed as a prop from app component) with the item as argument. This basically pushes the item that was clicked into the favourites array
      props.favs(item)
    }
    
    //useEffect hook here to set the results to the data piece of state
    //the hook is dependant on the results variable, so when the results variable changes as a result of data being passed from the searchBar, the code inside executes
    useEffect(() => {
      //check if the current length of results is bigger than 0, meaning data was passed from the searchbar component
      if(results.length > 0){
        //if data was passed from the parent component, set the data piece of state to that data(the results from the search)
        setData(results)
      }
      
    }, [results])

    //handle potential errors
    if(error){
      return <div>Error: {error.message}</div>;
    } else {
      
      //returned is a container component with a grid container.
      //once the data piece of state updates as a result of a search happening, the data is mapped to a grid item component with the key set to the index of the array item
      //each item from the data piece of state array is mapped to a grid item component, which houses a card component that displays properties from the items in the data piece of state
      //i have set the main heading of the typography component to be either the trackName property of the response data, or the collectionName, as the trackName prop isn't available if the item is something weird like an audiobook or tv series
      return (
        <Container>
          <Box>
            <Grid container spacing={2}>
              {data.map((item, index) => (
                <Grid item xs={12} sm={12} md={6} key={index}>
                  <Card
                    style={{ display: 'flex' }}
                  >
                    <CardContent
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      
                      }}
                    >
                    <Typography component="div" variant="h6">
                      {item.trackName || item.collectionName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {item.artistName}
                  
                    </Typography>
                    </CardContent>
                    {/*fav button */}
                    <Button style={{
                        marginLeft: 'auto',
                      }}
                      onClick={()=>handleSave(item)}
                    >
                      {/*this is why the favourites array is passed here as a prop, to check if the item is included in that array, if it is it will render a full heart icon, if it isn't it renders a hollow heart icon */}
                      {props.favsState.includes(item) ?(
                        <FavoriteIcon />
                      ): (
                        <FavoriteBorderIcon />
                      )}
                        
                    </Button>
                    {/*image for cardMedia component is set to the highest res artwork prop of the response data */}
                    <CardMedia
                      component="img"
                      style={{
                        width: 100,
                      
                      }}
                      image={item.artworkUrl100}
                      alt={item.trackName + ' Album Cover'}
                    />
                    
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      );
    }
};

export default SearchResults;

