# snake-game-angular

Emoji coded:
🙏 - required (3,4)
🚀 - extra points (5)

Requirements:

🙏 app should consist of 2+ pages (DONT USE ROUTING FOR THAT 😈 as we dont know routing yet)
🙏 use ngModel to build form with validators
🙏 form shoul be user friendly: display errors and block buttons
🙏 components communication (inputs, outputs): pass collected data between pages/components
🚀 register user interactions and their timing (or any other data than can be use as list)
🚀 display list - filterable and sortable (pipes)

Example project
🙏 Two pages
- Intro page with intro text and player form
- Game page

1. Intro page specification
🙏 basic version

- some quick introductory text
- form with two inputs
- player name
- player email
- start game button
- upon clicking 'start' we check name and email and notify player whats wrong
- if name and email are fine then store this data and move to the game page

2. Game page specification
🙏 basic version
- there should be a button 'exit game' which will move player to intro page
- there should be nice, personalized welcome message (with player name)
- integrate ngx-tetris or ngx-snake or ngx-race
- big indication of the game status (ready, started, paused...)
- we need points counting mechanism (each cleared line counts)
- display current amount of points
- display time spent wile playing

🚀 extra points version should additionally have:

- there should be a 'gameplay history' with all actions and each entry should have
- timestamp
- action name (player started the game, paused, line cleared...)
- gameplay history should be
- filterable by event type (e.g., show only 'line cleared' events)
- sortable by timestamp (latest first or oldest first)
