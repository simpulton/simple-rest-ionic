# Simple REST with ionic
A simple project using [Ionic framework](http://ionicframework.com) demonstrating CRUD powered by [Backand](https://www.backand.com).

## Prerequisites
You will need:
* [Git](http://git-scm.com/)
* [NodeJS and NPM](https://gist.github.com/isaacs/579814)

## Getting Started ##
1. Create new App in Backand with the following model (or just keep the default Model):

```json
[
  {
    "name": "items",
    "fields": {
      "name": {
        "type": "string"
      },
      "description": {
        "type": "text"
      },
      "user": {
        "object": "users"
      }
    }
  },
  {
    "name": "users",
    "fields": {
      "email": {
        "type": "string"
      },
      "firstName": {
        "type": "string"
      },
      "lastName": {
        "type": "string"
      },
      "items": {
        "collection": "items",
        "via": "user"
      }
    }
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
  $ ionic platform add ios
  $ ionic build ios
  $ ionic emulate ios
  ```

Ionic's [Getting Started](http://ionicframework.com/getting-started/) pages provide more help getting-started.
