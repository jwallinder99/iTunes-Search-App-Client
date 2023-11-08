## HOW TO RUN APP ON LOCAL MACHINE

Click on the code button in the github repo and download the zip
unzip the contents into a folder on your local machine
navigate to the backend directory in the terminal and type 'npm start' to start the server
navigate to the frontend directory in the terminal and type 'npm start' to start the frontend react app

## HOW TO USE THE APP
The app features a searchbar, and radio buttons to select a search term
enter your search term in the searchbox and click enter to display results of all catagories
click on a radio button to only get results of that specific catagory

## SECURITY MEASURES
The server has been set up to use the Helmet module, which helps secure the app by setting various HTTP headers.

The frontend doesn't directly deal with API keys, securing communication with the backend through HTTPS ensures data integrity

The iTunes api endpoint is not directly exposed in the frontend, rather the backend acts as a server to the frontend and then makes a request to the iTunes api from the backend, which prevents the iTunes search api endpoint to be visible from the client side

