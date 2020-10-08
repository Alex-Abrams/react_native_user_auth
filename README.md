# README
Ruby API with Json Web Token and Frontend React Native Authentication

This is an Android optimized login/signup/logout configuration.  Users can ceate accounts, log in to their accounts, and log out of their accounts.  The Ruby API assigns a 24 hour JWT that will be used whenever requesting to the backend is necessary.

Using AsyncStorage, the email and authentication token are stored on the device so there is no need for re-entering password/email if coming back to the app within 24 hours. 

Ruby Version: 2.6.3
Expo version: 37.0.3
Redux: 4.0.5

Setup:
  -install gems
    $bundle install
  -set up database
    $rails db:setup
  -setup the package.json
    $npm install
   
