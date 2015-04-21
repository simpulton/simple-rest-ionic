# Simple REST with ionic
A simple project uisng [Ionic framework](http://ionicframework.com) demonstrating CRUD, built using AngularJS, and powered by [Backand](https://www.backand.com).

## Prerequisites
You will need:
* [Git](http://git-scm.com/)
* [NodeJS and NPM](https://gist.github.com/isaacs/579814)

## Getting Started ##
1. Create new App in Backand with the following model:

  ```json
  [
    {
      "name": "items",
      "fields": [
        {
          "name": "name",
          "type": "ShortText"
        },
        {
          "name": "description",
          "type": "LongText"
        }
      ]
    }
  ]
  ```
2. Once the App is ready, run the following commands:

  ```bash
  $ git clone git@github.com:backand/simple-rest-ionic.git
  $ cd simple-rest-ionic
  $ npm install
  $ bower install
  ```
    
3. Ensure you have ionic installed:
  ```bash
  $ npm install -g cordova ionic
  ```
  
4. You can run ionic in the browser or simulator:

  Run in the web browser:
  ```bash
  $ ionic serve
  ```
  or 
  
  Run in an iOS simulator:
  ```bash
  $ cordova platform add ios
  $ ionic build ios
  $ ionic emulate ios
  ```

Ionic's [Getting Started](http://ionicframework.com/getting-started/) pages provide more help getting-started.
