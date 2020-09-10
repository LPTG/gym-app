# Workout Builder
## Description
This webapp currently allows users to build templates and workouts from those templates. A template is defined as the structure for a workout. A workout can be created with or without a template. If a template is used to build a workout, the template will be displayed as placeholder text in the workout creator form. See template structure and workout structure for more information. Also see <a href="#roadmap">roadmap</a> for future development plans.

## Installation
This project was developed using Node v12.14.1 and React v16.13.1
- Clone this repo
- npm install
- npm run dev

## Examples
### Login Page
![Login Page](https://i.imgur.com/mJZc7pE.png)
The default state of the landing page/login page

### After Clicking 'Need to Register'
![Registration Page](https://i.imgur.com/4oEIY3M.png)
If you are not already registered, you can click 'Need to Register' which will expand the login options to include an email address field.

### Workouts List
![Workouts List](https://i.imgur.com/rVoYr7s.png)
Workouts can be created from scratch or, if you want to use a template, you can select a template to use from the templates list page.

### Templates List
![Templates List](https://i.imgur.com/QOZCs4p.png)
Any templates you create will be listed here to view or to select for use in building a workout.

### Example Template
![Example Template](https://i.imgur.com/pdZgxKW.png)

### Example Workout Created From Template
![Workout created from template](https://i.imgur.com/AUBmiKj.png)

## Roadmap
The current build allows users to login and provides full CRUD functionality for workouts and templates. This section will list goals and expectations for future builds.
- [x] Create REST API for workouts, templates, and login
- [x] Manage user sessions in a MongoDB store
- [x] Build React components for login/registration forms
- [x] Build React components for templates/workouts list
- [x] Build React components for template/workout forms
- [x] Require user authentication to access API
- [ ] \(Optional) Switch to token based authentication for API
- [ ] Build user profile page
- [ ] Allow users to share templates/workouts with other users
- [ ] Allow users to upload videos of their workouts
- [ ] Auto fill workout names based on previous workouts
- [ ] Build workout list page to hold information on how to perform certain workouts