Node Server
===========

A node.js server that is ready to use with minimal adjustments to the core server code. This server comes ready to use with a MongoDB database and socket.io connections for communication between the front and back ends. I have also include a very simple example of how to setup an api on the server.

If you have any suggestions on how to improve either this guide or the node server, please let me know!

Purpose
-------

The purpose of this development was to help get those unfamiliar with node.js or server development up-and-running as quickly and easily as possible. I know that developing a server for the first time can be a daunting task, and hopefully this can help those still learning get going. I know that there are also people who have lots of interest in front-end development and want more functionality than a simple static website can offer, but have little to no interest in back-end development - hopefully this server will allow anyone in this group to develop a fully functioning dynamic website with as little trouble as possible.

I will give a brief getting started guide and a quick rundown of the folder/file structure. The easiest way to add additional pages



Getting Started
===============

The remainder of this guide assumes that you have an IDE or text editor available to use for your development. If you do not, I suggest either [Webstorm](https://www.jetbrains.com/webstorm/), which you will have to pay for (they do offer a 30 day trial), or [VS Code](https://code.visualstudio.com/Download), which is free. Both are excellent and are fully capable of getting the job done.

I am also assuming that you have at least minimal knowledge of using the command line, if not, I suggest you look into the free, interactive lesson on [codeacademy](https://www.codecademy.com/learn/learn-the-command-line).


### Download the project

Download (or clone) this project. Change the base directory name to whatever make sesnse for your project.


### Install Node.js

[Install node.js](https://nodejs.org/en/download/) if you do not already have it. Once you have it installed, open the Terminal (or Command Prompt, I will use Terminal from here on out, but whenever I say it, I mean either) and navigate to your project directory. Then run:
```
$ npm init 
```
This will initialize a local node directory where you will install all of the necessary modules. It will also ask you a bunch of questions in order to create your [package.json](https://docs.npmjs.com/files/package.json) file.

Learn more about [node](https://nodejs.org/en/).


### Install Express.js

While still in your project directory run:
```
$ npm install express
```
This will install express.js, a web framework for node.

Learn more about [express](https://expressjs.com/).


### Install Socket.io

Run:
```
$ npm install socket.io
```
This will install socket.io, which allows for bidirectional communication between the front-end and back-end of your site.

Learn more about [socket.io](https://socket.io/).


### Install MongoDB (optional)

This step is optional and only required if you need a database for your webserver - which I am assuming you do, otherwise you would simply be building a static website.

[Download mongo](https://www.mongodb.com/download-center?jmp=nav#community). The community version should suffice. This link also contains instructions for installing via Homebrew.

Once installed, go back to the Terminal and create a directory named *data*. Navigate into that directory and create another directory named *db*. Now navigate back to your project directory and run
```
$ mongod --dbpath ~/path-to-your-project/your-project-directory/data/db
```
If you're on Windows (I'm sorry!) replace "mongod" with "C:\Program Files\MongoDB\Server\3.4\bin\mongo.exe". This will instaniate your mongo database.

Learn more about [mongo](https://docs.mongodb.com/manual/).


### Install Deasync (optional, required if you are using mongo)

This step is also optional, but as you probably are using mongo, you will need to install this too.

Still in your project directory, run:
```
npm install deasync
```
Learn more about [deasync](https://www.npmjs.com/package/deasync).



Folder / File Structure
=======================

If you have downloaded (or cloned) this project, and followed the instructions for installing node and the necessary packages, your file structure should now look like this:

your-project-name/
    client/
        scripts/
            index.js
            quotes.js
            whatever-scripts-you-need
        style/
            index.css
            quotes.css
            whatever-css-files-you-need
        views/
            index.html
            quotes.html
            whatever-html-files-you-need
    data/
        db/
            your-database
    lib/
        socket.js
        database.js
    node_modules/
    routes/
        index.js
        quotes.js
        whatever-routes-you-need
    package.json
    server.js


Base Directory (your-project-name)
----------------------------------

This is the base directory for you project. Name it whatever make sense to you.

#### server.js

This is the main server file and where the server is instantiated from. 

#### package.json

Your package.json file (the file created when executing *npm init*).


Backend Functionality Directory (lib/)
--------------------------------------

This directory contains all of the necessary functionality (excluding routing) for the backend of your app, including communication with the front-end and database.

#### database.js

This file contains all of the database code for instantiating a connection to your mongo database, and for all basic database functionality (query, insert, update, delete). This file can be modified or used as an example for utilizing a mongo database in your app.

#### socket.js

This file contains the socket.io instantiation and the back-end portion of the socket.io code used for communication with the fornt-end. This file can be modified for your needs.


Routing Directory (routes/)
---------------------------

This directory contains all of the files for handling routing within your app. Each page will get it's own routing file. While this may seem unnecessary for a small app, as it grows in size, this will help keep everything clean and organized.

#### indexRouting.js

This file contains the routes for the index.html page and shows an example of how to serve an html page.

#### quotesRouting.js

This file contains the routes for the quotes.html page and shows an example of how to implement an api. The api example includes all CRUD operation: *create*, *retrieve*, *update*, and *delete.*

For doing any api development and/or testing, I highly recommend [Postman](https://www.getpostman.com/), which is an excellent tool for testing your apis. If your app requires an api, this will make your life easier.


Client Directory (client/)
--------------------------

This directory contains all of the front-end code for your web app. It includes three sub-directories:  *scripts/*, *style/*, and *views/*.


### views/

This directory contains all of html files used for creating your webpages.

#### index.html

The main page of your website. This page will also handle navigation to your other webpages.

#### quotes.html

This page was included as an example of how to handle socket.io communication between the front and back ends of your app. Delete this when you are no longer in need of such an example.


### style/

This directory contains all of the CSS code used to style your webpages.

#### index.css

Stylesheet for index.html.

#### quote.cdd

Stylesheet for the quote.html. Delete this whenever you no longer need the quotes example.


### scripts/

This directory contains all of the javascript code used to support your webpages.

#### index.js

Javascript for your index.html.

#### quotes.js

Javascript for your quotes.html. See this file for examples of sending data from your front-end to the backend for processing, database entry, etc. Delete this when you no longer need the example;










