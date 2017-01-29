# Manage a Record Trading Club

## Overview

This app allows users to search for, list and trade records from their personal collection.
The client is written with Angular v2.x and Typescript backed by Meteor.js v1.4 for real-time 
database synchronization.

A demo version of this app is deployed at: [https://angular-trading.herokuapp.com/](https://angular-trading.herokuapp.com/)

![](public/img/app-screenshot.png?raw=true)

This project was built as part of the Free Code Camp cirriculum based 
on the following user stories:

* I can view all books posted by every user.
* I can add a new book.
* I can update my settings to store my full name, city, and state.
* I can propose a trade and wait for the other user to accept the trade.

## Install

If you need to install [Meteor](https://www.meteor.com/), run the following:

```
curl https://install.meteor.com/ | sh
```

Clone this repository and install npm dependencies:

```
git clone git@github.com:cjsheets/angular-trading-app.git
cd angular-trading-app
npm install
```

## Run

To access the Last.FM API, [you'll need a key](http://www.last.fm/api). Once registered, create
`package.json` in the root of the repository:

```
{
  "public": {
    "last_fm": {
      "key" : "xxxxxxxxxxxxxxxxxxxxxxxxxx"
    },
    "api_url": "http://localhost:3000/api/proxy?"
  }
}
```

Finally, build and run the app using the settings file.

```
meteor run --settings settings.json
```

Navigate to `http://localhost:3000`

## Technology Stack

This package contains:

| Front-End | Back-End |
| ------- | ------- |
| Angular v2.x | Meteor.js |
| Meteor.js | MongoDB |
| MiniMongo | Node.js |
| RxJS |  |
| HTML5/SCSS |  |

| Both | 
| ------- |
| Typescript |
| Mocha/Chai | 

Deployed to [Heroku](https://www.heroku.com/) using [this buildpack](https://github.com/AdmitHub/meteor-buildpack-horse)


### Folder Structure

The folder structure is a mix between [Angular 2 recommendation](https://johnpapa.net/angular-2-styles/) and [Meteor 1.3 recommendation](https://guide.meteor.com/structure.html).

### Testing

* *Work in progress*

The testing environment in this boilerplate based on [Meteor recommendation](https://guide.meteor.com/testing.html), and uses Mocha as testing framework along with Chai for assertion.

There is a main test file that initialize Angular 2 tests library, it located under `/client/init.test.ts`.

All other test files are located near the component/service it tests, with the `.test.ts` extension.

### To-Do

* lint the code for each app (fix lint errors)
* write tests for each app
* change notification icon for different trade states
* add typecasting to all possible functions

### License

MIT License

[![Analytics](https://cjs-beacon.appspot.com/UA-10006093-3/github/cjsheets/angular-trading-app?pixel)](https://github.com/cjsheets/angular-trading-app)
