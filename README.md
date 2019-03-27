# CSE306 Observer Design Pattern

> Chenxu.Fu15 1509284

## Environment Setup

1. The program requires **Node.js** and **NPM**(or **Yarn**) as packager manager installed.

2. From root directory, run `cd original` and `npm install`(or `yarn install`)

3. From root directory, run `cd observer` and `npm install`(or `yarn install`)

## Get started with Original version

1. From root directory, run `cd original` and `npm start`(or `yarn start`)

2. Server will start on port **6395**(default), and browser will open automatically on `http://localhost:8080`

## Improved version using Observer Design Pattern

1. From root directory, run `cd observer` and `npm start`(or `yarn start`)

2. Server will start on port **6396**(default), and browser will open automatically on `http://localhost:8081`

## Principles

Observer Design Pattern decouples different types of objects in terms of Observer and Subject(Observable), defining a one-to-many dependencies, and when the subject changes, all its observers will be updated automatically.

As real world examples, user can subscribe a newsletter, a podcast or chatroom. When new content is added, instead of users actively polling for changes(interval refresh), the users can be notified by the server directly.

### Web example

The detailed webpage example makes use of WebSocket to implement the Observer Design Pattern. In this example, server and client act as both Observer and Subject. When user publishes a new message, The server observes the event emitted from client, and then dispatch the event to other clients. The other clients will observe for events emitted from server and be updated automatically.

### Principle.js

The code abstracts the basic principle of Observer Design Pattern, the Subject(newsletter) can subscribe and unsubscribe multiple Observers(users) by updating the subscription list. When the Subject dispatch an event, it will loop through the subscription list and notify them.

![ouput](https://ws1.sinaimg.cn/large/006tKfTcgy1g1flr3am6wj30hr0ac40e.jpg)

## Full code of original project

[U-CIRCLE - CSE208 Group Project](https://github.com/fuchenxu2008/U-Circle)

## Online product link

[U-CIRCLE](https://quora.kyrie.top/)