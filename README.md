# Onboarding Post-it App
Create post-it sticker app following this description. Read all instructions first, then start with explaining your workflow to your onboarding developer.

## App has 2 pages
* About
* Dashboard with all notes

## Implemented functions
* Add post on right click for cursor position
* Add comment to post
* Mark post as finished
* Delet post

## Running application
* server/package.json - start - starts server which servers json file with posts
* [ROOT] package.json - serve - serves static files


## Menu
Will only contain single navigation item pointing to dashboard

## Dashboard page
There will be nice graphic interface showing all post-it stickers and following functionality

* User can add stickers which consist of header and description
* User can "finish" stickers. Finished sticker will have "crossed of" look

## Detail page
Will show only one given sticker with possibility to add and removing comments.

On reload, app will reset to default state which is 3 post-it stickers, one of which will have comments and one will in finished state.

## Use cases - additional info
**Add new post-it** - Will happen on click somewhere on the dashboard page. New post-it will be created on the spot of mouse click and will have random rotation (so it creates feel of real sticker)

**Finish post-it** - there will be empty square on every post-it. Clicking on it will check of the square and post-it will be crossed off (including animation of developers choice)

**Commenting** - on detail page, there will be list of comments on the bottom and above them, new input box with submit button.

## Dummy data
Use your own nodeJS server for serving initial data into the app

## Use following technologies and follow given rules
- [x] Vue-CLI - init of the app
- [x] Axios - HTTP requests
- [x] Node express server - mock server with dummy data (initial post-it data)
- [x] Normalizr - for data normalization (splitting comments and post-it data)
- [x] Vuex - state of the application
- [x] Use at least 1 functional component where it makes sense
- [x] Vuejs router
- [x] Use Flexbox layout styling
- [x] BEM naming convention
- [ ] Write tests for store getters, mutations, actions

## Follow JS guidelines and principals
https://cnfl.myfortuna.eu/display/IVW/JS+Naming+conventions

https://cnfl.myfortuna.eu/display/IVW/Vue.js+codestyle

https://cnfl.myfortuna.eu/display/IVW/CSS+Variable+conventions

## Note
Split your work into logical commits and submit them as Pull Requests in correct branch (feature, bugfix) under this repository.

Before development, consult your workflow first.
