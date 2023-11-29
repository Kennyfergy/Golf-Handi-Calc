# Golf Handi-Calc

Duration: 2 week sprint

Introducing the WHS Golf Calculator. Golf Handi-Calc revolutionizes your golfing experience by effortlessly managing your scorecards and seamlessly calculating your handicap index and updating local course handicaps specifically for you, using the World Handicap System. Picture this: You complete a round, input your score, and voilà your handicap index is auto-calculated and saved.

### Why did I make this?

When 5 friends and I started golfing in 2022, we had no idea what a handicap index was. One day a gentleman asked us what our handicap was so we said “no idea but we should probably figure that out”. Fast forward a year later, we still didn’t have our handicap index because looking into it, it looked like a lot of work and a lot of calculations.

### Solution

My solution was to create an app that a user can input their scores, and after scores are inputted it will calculate the handicap index. Going by the World Handicap System regulations, a user can use the best 8 rounds out of the last 20, to calculate their handicap. If a new round played is better than any of the current rounds being used to calculate, it will automatically update their handicap index. The app will display a users course handicap for every course they have added.

## Screenshots

- This is the login page

![Login Page](/public/screenshots/login-page.png)

- The home page gives quick data and buttons to add a round or add a course

![Home Page](/public/screenshots/home-page.png)

- The courses page shows all courses added by user and admin. The user added courses can be edited and deleted

![Courses Page](/public/screenshots/courses-page.png)

- Example of editing a course

![Edit a course](/public/screenshots/edit-course.png)

- The rounds page shows every round a user has added. They can be edited or deleted

![Rounds Page](/public/screenshots/rounds-page.png)

- Adding a round example

![Adding a round](/public/screenshots/add-round-page.png)

- Editing a round example

![Editing a round](/public/screenshots/edit-round.png)

- The about page explains using the app and how the calculations work

![About Page](/public/screenshots/about%20page.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

- Create a PostgreSQL database named `golf_handi_calc`
- Use the `database.sql` file to create table
- Open the project in code editor of your choice and run `npm install` in the terminal
- Run `npm run server` in the terminal
- Open another terminal and run `npm run client` in the terminal

## Built With
![GitHub top language](https://img.shields.io/github/languages/top/KennyFergy/Golf-Handi-Calc)


<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a> - [Javascript](https://www.javascript.com/) - Core Language
<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a> - [CSS]([https://expressjs.com/](https://www.w3schools.com/w3css/defaulT.asp)) - CSS styling
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a> - [HTML]([https://www.javascript.com/](https://www.w3schools.com/html)) - HTML5
<a href="https://expressjs.com/"><img src="https://avatars.githubusercontent.com/u/5658226?s=200&v=4" height="40px" width="40px" /></a> - [Express.js](https://expressjs.com/) - RESTful API Web App Framework
<a href="https://www.passportjs.org"><img src="https://avatars.githubusercontent.com/u/1160530?s=200&v=4" height="40px" width="40px" /></a> - [Passport.js](https://www.passportjs.org/) - Authentication
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs) - Password Hashing and Salting
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a> - [React](https://react.dev/) - User interface with components
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a> - [React Redux](https://react-redux.js.org/) - Read store data and dispatch actions to update state
- [React Sagas/Routers](https://redux-saga.js.org/) - Redux side effect manager
<a href="https://axios-http.com"><img src="https://avatars.githubusercontent.com/u/32372333?s=200&v=4" height="40px" width="40px" /></a> - [Axios](https://axios-http.com/) - HTTP client
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a> - [Material_UI](https://mui.com/) - React UI tools
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a> - [PostgreSQL](https://www.postgresql.org/) - Relational Database System
- [Postico2](https://eggerapps.at/postico2/) - Local Database
<a href="https://www.postman.com/"><img src="https://voyager.postman.com/logo/postman-logo-icon-orange.svg" height="40px" width="40px" /></a> - [Postman](https://www.postman.com/) - For testing APIs
<a href="https://sweetalert2.github.io"><img src="https://avatars.githubusercontent.com/u/35137722?s=200&v=4" height="40px" width="40px" /></a> - [SweetAlert2](https://sweetalert2.github.io/) - Customized Popup Boxes
<a href="https://www.fusejs.io/"><img src="https://www.fusejs.io/assets/img/logo.png" height="40px" width="40px" /></a>
 - [Fuse.js](https://www.fusejs.io/) - Fuzzy search library
<a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a> - [Node.js](https://nodejs.org/en/) - runtime enviroment

<!-- ## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->

## Authors

- **Kenny Ferguson** - _Initial work_ - [kennyfergy](https://github.com/Kennyfergy)

## License
![GitHub](https://img.shields.io/github/license/Kennyfergy/Golf-Handi-Calc)


This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Thanks to [Emerging Digital Academy](https://emergingacademy.org/) for the skills and education.
- Thanks to fellow cohort members for tips and advice.
