# League of Legends Player Overview Web Tool

## Overview

This React web application provide League of Legends players with a comprehensive overview of their in-game performance and statistics. The application will fetch data from the Riot Games API to display current rank information, active game details, and match history with detailed statistics.

## Features

- Current Rank & Winrate: Display the player's current rank, tier, and winrate for each ranked queue.
- Active Game Details: When the player is currently in a game, display real-time information such as the game mode, duration, champion played, and current score.
- Match History: Display a list of the player's recent matches, including the game mode, duration, result, and detailed statistics for each participant.
- In-Depth Match Analysis: Provide the ability to view detailed data for each match, including champion builds, rune pages, summoner spells, and item timings.

## Technologies

* Front-end: React.js
* Back-end: Node.js
* API: Riot Games API

## Installation

Create a .env file storing your Riot API key "REACT_APP_API_KEY_RIOT"

From the root folder, install the required npm modules : 
	```npm install```

Launch Node server and WebpackDevServer
	```npm run start```