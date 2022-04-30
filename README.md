# Lightrays
A modern and lightweight web design framework, with normal Website, ReactJS and Sass support.

Demo Website: https://ncoder77.github.io/Lightrays/

![Lightrays example image](/non-react-example/img/Logos/readmeHead.png "LR example: responsive Web App")

 

## Usage
### Normal website
For a blank new website, download the [non-react folder](https://downgit.github.io/#/home?url=https://github.com/Ncoder77/Lightrays/tree/alpha/non-react), and you’re ready to go! <br>
If you want to use Lightrays in an existing website, include the following links:<br>

`
    <link rel='stylesheet' href='https://ncoder77.github.io/Lightrays/non-react/style/css/Lightrays.css'>
    <script src='https://ncoder77.github.io/Lightrays/non-react/Lightrays.js'>
`

<br>

### React usage
*Disclaimer: Lightrays uses Typescript. You can find a tutorial on how to set up typescript for React here.*
<br>
For a blank new React App, download the [react](https://downgit.github.io/#/home?url=https://github.com/Ncoder77/Lightrays/tree/alpha/react) folder, and build all npm files.
<br>
If you want to use Lightrays in an existing React App, download the [Lightrays](https://downgit.github.io/#/home?url=https://github.com/Ncoder77/Lightrays/tree/alpha/react/src/Lightrays) folder, and copy it into the src folder of your React Application. Next, import the CSS in your App.tsx file: <br>

` import './Lightrays/css/style.css'; `

That’s it, you’re ready to go! To use a component, for ex. The Nav, import it like so: <br>

` import * as Nav from "./Lightrays/LWDNav"; `

<br>

If you want to try out the Example page, replace <App /> with <ExampleApp /> in the index.tsx.

### Sass support
Lightrays comes with default sass support. To use the sass files, import the sass file like so:<br>

` @import "style/scss/main.scss"; `

<br>
In your HTML or App.jsx React file, you then just need to include your own css file instead of the Lightrays css file.

## Components
### Overview
LWDNav<br>
LWDFunctions<br>
LWDBox<br>

<br>

**Developers:**
* [JAcoder7](https://github.com/JAcoder7 "go to his github-accont")
* [Ncoder77](https://github.com/Ncoder77 "go to his github-accont")
<br><br>