![](https://raw.githubusercontent.com/ics-software-engineering/meteor-application-template-react/master/doc/landing-page.png)

Meteor-application-template-react is a sample Meteor 1.6 application that illustrates:

  * A standard directory layout using 'imports/' as recommended in the [Meteor Guide](https://guide.meteor.com/structure.html) 
  * A basic set of Meteor packages and example usage (Accounts, React)
  * Use of [Semantic UI React](https://react.semantic-ui.com/) for user interface.
  * Use of [Uniforms](https://github.com/vazco/uniforms) for form development
  * Use of [alanning:Roles](https://github.com/alanning/meteor-roles) to implement a special "Admin" user.
  * Simple authorization/authentication and use of settings files for initialization.
  * Simple quality assurance using [ESLint](http://eslint.org) with packages to partially enforce the [Meteor Coding Standards](https://guide.meteor.com/code-style.html) and the [AirBnB Javascript Style Guide](https://github.com/airbnb/javascript).

The goal of this template is to help you get quickly started doing Meteor development by providing a reasonable directory structure for development and deployment, a set of common extensions to the core framework, and boilerplate code to implement basic page display, navigation, forms, roles, and collection manipulation.

To keep this codebase simple and small, some important capabilities are intentionally excluded from this template:

  * Testing. 
  * Security (meteor-application-template-react enables the insecure packages)

Examples of the these capabilities will be provided elsewhere.

## Installation

First, [install Meteor](https://www.meteor.com/install).

Second, [create a new GitHub repository](https://help.github.com/articles/create-a-repo/), and clone it into your local workspace.

Third, [download a zip file containing a snapshot of meteor-application-template-react](https://github.com/ics-software-engineering/meteor-application-template-react/archive/master.zip).

Fourth, uncompress the zip file, and copy the following files and directories into your repo:

  * app/  
  * config/
  * .gitignore
  
You don't need to copy the README.md or index.md files (you should write your own), and you don't need to copy the doc/ directory (it contains only screenshots displayed in this page of documentation.)

Now your local repo should contain the template. To test that everything is OK, cd into the app directory install the required libraries with:


```
$ meteor npm install
```

Once the libraries are installed, you can run the application by invoking the ["start" script in the package.json file](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/app/package.json):

```
$ meteor npm run start
```


**Note regarding bcrypt warning.** You will get the following message when you run this application:

```
Note: you are using a pure-JavaScript implementation of bcrypt.
While this implementation will work correctly, it is known to be
approximately three times slower than the native implementation.
In order to use the native implementation instead, run

  meteor npm install --save bcrypt

in the root directory of your application.
```

On some operating systems (particularly Windows), installing bcrypt is much more difficult than implied by the above message. Bcrypt is only used in Meteor for password checking, so the performance implications are negligible until your site has very high traffic. You can safely ignore this warning without any problems during initial stages of development.

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000).  You can login using the credentials in [settings.development.json](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/config/settings.development.json), or else register a new account.

Lastly, you can run ESLint over the code in the imports/ directory with:

```
meteor npm run lint
```

## Walkthrough

The following sections describe the major features of this template.

### Directory structure

The top-level directory structure is:

```
app/        # holds the Meteor application sources
config/     # holds configuration files, such as settings.development.json
doc/        # holds developer documentation, user guides, etc.
.gitignore  # don't commit IntelliJ project files, node_modules, and settings.production.json
```

This structure separates documentation files (such as screenshots) and configuration files (such as the settings files) from the actual Meteor application.

The app/ directory has this structure:

```
client/
  main.html      # The boilerplate HTML with a "root" div to be manipulated by React.
  main.js        # import startup files.

imports/
  api/           # Define collections
  startup/       # Define code to run when system starts up (client-only, server-only, both)
    both/          
    client/        
    server/        
  ui/
    layouts/     # Contains top-level layout (<App> component).
    pages/       # Contains components for each page. 
    components/  # Contains page elements, some of which could appear on multiple pages. 

node_modules/    # managed by Meteor

public/          # static assets (like images) can go here.
  
server/
   main.js       # import the server-side js files.
```

### Import conventions

This system adheres to the Meteor 1.4 guideline of putting all application code in the imports/ directory, and using client/main.js and server/main.js to import the code appropriate for the client and server in an appropriate order.

### Application functionality

The application implements a simple CRUD application for managing "Stuff", which is a Mongo Collection consisting of a name (String), a quantity (Number), and a condition (one of 'excellent', 'good', 'fair', or 'poor').

By default, each user only sees the Stuff that they have created.  However, the settings file enables you to define default accounts.  If you define a user with the role "admin", then that user gets access to a special page 

#### Landing page

Implemented by the Landing component. 

![](https://raw.githubusercontent.com/ics-software-engineering/meteor-application-template-react/master/doc/landing-page.png)

You must login to access any page other than the Home page. 

#### List Stuff page

You must login to see the contents of the Stuff collection.

![](https://raw.githubusercontent.com/ics-software-engineering/meteor-application-template-react/master/doc/list-page.png)

#### Add Stuff page

You must login to add new documents to the Stuff collection.

![](https://raw.githubusercontent.com/ics-software-engineering/meteor-application-template-react/master/doc/add-page.png)

#### Edit Stuff page

You must login to add edit documents in the Stuff collection.

![](https://raw.githubusercontent.com/ics-software-engineering/meteor-application-template-react/master/doc/edit-page.png)


### Collections

The application implements a single Collection called "Stuff". Each Stuff document has two fields: a String "name" and a Number "quantity".

The Stuff collection is defined in [imports/api/stuff/stuff.js](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/app/imports/api/stuff/stuff.js).

The Stuff collection is initialized in [imports/startup/server/stuff.js](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/app/imports/startup/server/stuff.js).

### CSS

The application uses the [React implementation of Semantic UI](http://react.semantic-ui.com/).


### Routing

For display and navigation among its four pages, the application uses [React Router](https://reacttraining.com/react-router/).

Routing is defined in [imports/ui/layouts/App.jsx](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/app/imports/ui/layouts/App.jsx).


### Authentication

For authentication, the application uses the Meteor accounts package, with some simple customization in [imports/startup/server/accounts.js](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/app/imports/startup/server/accounts.js).

When the application is run for the first time, a settings file (such as [config/settings.development.json](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/config/settings.development.json)) should be passed to Meteor. That will lead to a default account being created through the code in [imports/startup/server/accounts.js](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/app/imports/startup/server/accounts.js).

The application allows users to register and create new accounts at any time.

### Authorization

Only logged in users can manipulate Stuff documents (but any registered user can manipulate any Stuff document, even if they weren't the user that created it.)

### Configuration

The [config](https://github.com/ics-software-engineering/meteor-application-template-react/tree/master/config) directory is intended to hold settings files.  The repository contains one file: [config/settings.development.json](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/config/settings.development.json).

The [.gitignore](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/.gitignore) file prevents a file named settings.production.json from being committed to the repository. So, if you are deploying the application, you can put settings in a file named settings.production.json and it will not be committed.

### Quality Assurance

#### ESLint

The application includes a [.eslintrc](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/app/.eslintrc) file to define the coding style adhered to in this application. You can invoke ESLint from the command line as follows:

```
[~/meteor-application-template-react/app]-> meteor npm run lint

> meteor-application-template-react@ lint /Users/philipjohnson/meteor-application-template-react/app
> eslint --quiet ./imports
```

ESLint should run without generating any errors.  

It's significantly easier to do development with ESLint integrated directly into your IDE (such as IntelliJ).

## Screencast

Click the image below to watch a walkthrough of this system. This screencast was generated for a previous version of meteor-application-template, so there may be small differences in the code base. 

[<img src="https://raw.githubusercontent.com/ics-software-engineering/meteor-application-template-react/master/doc/meteor-application-template-youtube.png" width="600">](https://youtu.be/ik9WigX8y7k)

