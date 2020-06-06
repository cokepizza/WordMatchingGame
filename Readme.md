# WordMatchingGame

Word Mathing Game. you can play here <https://hixxx.me/wordMatchingGame>

----

## Table of contents

[● Technical Stack](#Technial-Stack)  
[● Service Overview](#Service-Overview)   

## Technical Stack

* Backend
  * Node.js
  * Express
  * Nginx
  * AWS EC2

* Frontend
  * Single Page Application (SPA)
  * ES6, ES7 Only
  * Jest
  * WebPack Dev Server & Hot loading

## Service Overview

* How this service works
  * State Propagation
    * Game Page has many dynamic UI such as score change, timer change, word change, etc
    * Similar to React, how to pass state
    * When each component needs to handle the corresponding state, it can be easily handled in the form of ${state}_handler
    * Model that makes the UI into each component and then spreads the state to sub-components based on the main Home component
    * Extensible structure that can convey state change even if there are sub-components under children again
  * Class based
    * Define individual components and methods based on class
    * Create common class and share setState and render methods
  * SPA & Routing
    * When accessing, only index.html is rendered. Dynamic UI change and routing are implemented with CSR
    * Provide routing of '/', '/result' pages by navigation using the history API
* Test
  * Divided into Initialization Phase, Loading Phase and Game Phase to conduct jest test
  * Check whether each component variable is properly given a value for each step
  * In the Home component, in the relationship of each component, the scenario is checked for success or failure