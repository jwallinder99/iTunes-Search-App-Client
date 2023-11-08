import React, { useState} from 'react'
import SearchResults from './SearchResults'
import { TextField, Box, Stack, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button'
import baseUrl from '../utils/baseUrl';
const SearchBar = (props) => {

    //piece of state for storing data to send to backend
    const [requestData, setRequestData] = useState({
        term: '',
        catagory: ''
    })

    //piece of state for received data
    const [ receivedData, setReceivedData] = useState([])

    //function to handle storing catagory in request
    const handleRadioClick = e => {
        //read the value prop of the target event
        const { value } = e.target;
        //set the value prop as the catagory key-value of the request piece of state
        //requestData state is destructured with spread operator to maintain value in other key
        setRequestData({...requestData, catagory: value})
    }

    //function to handle storing term in request
    const handleSearchChange = e => {
        //get value prop from event target
        const { value } = e.target
        //set requestData state's term prop to value from event target
        setRequestData({...requestData, term: value})
    }

    //function to handle submiting a search when search button is clicked(async to fetch request to server)
    const handleSearch = async () => {
       
        //try catch blocks for making a request to the server
        try {
            //response variable to get data from /search path of server. '?term' for the api endpoint is the search term, so insert requestData's term prop and replace empty space with + 
            //insert requestData's catagory prop into entity query parameter for the catagory. If the entity query parameter is empty, the api will respond with 'all' catagories 
            const response = await fetch(`${baseUrl}/search?term=${requestData.term.replace(' ', '+')}&entity=${requestData.catagory}`, {
                //specify method for request. Get because we are just getting information from the server
                method: 'GET',
                //specify content type of request in headers of request
                headers: {
                    'content-type': 'application/json',
                },
                
            })

            //if response status is not okay
            if(!response.ok){
                throw new Error('Network response was not okay');
            }
            //data variable to hold awaited response 
            const data = await response.json()

            console.log(data)
            //set receivedData piece of state to received data from request to server
            setReceivedData(data)
            //reset requestData state to empty
            setRequestData({
                term: '',
                catagory: ''
            })
            //hanle potential errors
        } catch (error) {
            console.error('Error adding project: ', error)
        }
    }
    //return a container component with a grid component containing the search form
    //the value of the textfield component is set to the requestData.term's prop, which is a state variable, so this remebers the input from the textbox to plug into the endpoint for the server request
    //this also means when we reset the state after making a request, it will clear the textbox
    //onChange prop for the search textfield is set to the handleSearchChange function, which allows the funciton to use the value prop
    //radio group component is used for selecting a catagory 
    //each radio button is set to the handleRadioClick function, and the value for each button is the corresponding entity prop from the api to search from that particular catagory

    //the searcHReseults component is inserted under the box component representing the search form, it is passed the receivedData as props, aswell as the favourites array from the app component, and the favourites state from the app component
    return (
        <Container>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} >
                    <Box
                      component="form"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'

                      }}
                      noValidate
                      autoComplete="off"
                    >
                    <Stack direction="row" spacing={2}>
                    <TextField 
                    id="standard-basic" 
                    label="Search" 
                    variant="standard" 
                    value={requestData.term}
                    onChange={handleSearchChange}
                    sx={{width: 500}}
                    />
                    <Button variant="contained" color="primary" sx={{my: 1, color: 'white'}} onClick={handleSearch}>
                        Search
                    </Button>
                    </Stack>
                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Catagories</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="musicTrack" control={<Radio />} label="Music" onClick={handleRadioClick} />
                      <FormControlLabel value="movie" control={<Radio />} label="Movies" onClick={handleRadioClick} />
                      <FormControlLabel value="podcast" control={<Radio />} label="Podcasts" onClick={handleRadioClick} />
                      <FormControlLabel value="musicVideo" control={<Radio />} label="Music Video" onClick={handleRadioClick} />
                      <FormControlLabel value="audiobook" control={<Radio />} label="Audio Book" onClick={handleRadioClick} />
                      <FormControlLabel value="shortFilm" control={<Radio />} label="Short Film" onClick={handleRadioClick} />
                      <FormControlLabel value="tvEpisode" control={<Radio />} label="TV Show" onClick={handleRadioClick} />
                      <FormControlLabel value="ebook" control={<Radio />} label="E-Book" onClick={handleRadioClick} />
                    </RadioGroup>
                    </FormControl>
                    </Box>
                    <SearchResults data={receivedData} favs={props.favs} favsState = {props.favsState}/>
                </Grid>
            </Grid>   
        </Container>    
    )
}

export default SearchBar;