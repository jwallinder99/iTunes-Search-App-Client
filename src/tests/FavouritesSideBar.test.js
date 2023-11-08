import React from 'react';
import { render }  from '@testing-library/react';
import FavouriteSideBar from '../components/FavSideBar';

//dummy data
const mockFavourites = [
    {
        trackName: 'Sample Track 1',
        artistName: 'Sample Artist 1',
        artworkUrl100: 'sample_image_url_1',   
    },
    {
        trackName: 'Sample Track 2',
        artistName: 'Sample Artist 2',
        artworkUrl100: 'sample_image_url_2',      
    },
    {
        trackName: 'Sample Track 3',
        artistName: 'Sample Artist 3',
        artworkUrl100: 'sample_image_url_3',      
    },
]

test('Favourites Sidebar Component Snapshot', () => {
    const { asFragment } = render (
        <FavouriteSideBar favs={mockFavourites} removeFav={()=>{}}/>
    );
    expect( asFragment()).toMatchSnapshot()
})