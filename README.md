# Book Sale Application
This is a simple frontend for book selling application. We are using angularjs to show some simple bindings and browser's localstorage to cache some user data.

## Requirements
*   NodeJS & Npm
*   Yeoman , Grunt , Bower

## How to Build And Run

First you need to install nodejs and npm package manager. 

Inside the base folder run following comammands to install requirements :

* npm install -g yo grunt-cli bower

Then run following commands to install other dependencies :

* npm install
* bower install

Finally run this command to start up application :

* grunt serve

You can build all project with this:

* grunt build

Checkout build subdirectory for deployment ready code.

** Some of requirements may need to call nodejs as node. Create a symbolic link for that cases.

## How to Test

We need to install grunt-karma & firefox launcher plugin to test easily :

* npm install grunt-karma
* npm install karma-firefox-launcher

Now all you need to do is :

* grunt karma



