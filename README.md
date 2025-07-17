# Pokémon Back-and-Forth

A web-based Pokémon-themed game hub featuring multiple interactive game modes:

- **Main Menu**: Navigate to different Pokémon games
- **Pokémon Duel**: Player vs Player on the same device
- **Person vs Robot**: Player vs a randomly chosen Pokémon

## Project Structure

pokemon-back-and-forth/
├── index.html # Home page with game links
├── style.css # Main homepage styles
├── pokemon-duel/
│ ├── index.html # PvP Duel game
│ ├── script.js # Game logic
│ ├── style.css # Duel styling
│ └── data/
│ └── pokedex.json # Pokémon data for the duel
├── person-vs-robot/
│ ├── index.html # Player vs AI game
│ ├── script.js # AI logic
│ ├── style.css # Styling
│ └── data/
│ └── pokedex.json # Pokémon data

markdown
Copy
Edit

## Features

- Multiple game modes with separate interfaces
- Fully client-side using HTML, CSS, and JavaScript
- Pokémon data loaded dynamically from JSON
- Simple navigation between game modes

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pokemon-back-and-forth.git
   cd pokemon-back-and-forth
Open index.html using Live Server in VS Code (recommended), or simply open it in your browser.

Deployment
You can deploy the project to Vercel, Netlify, or GitHub Pages. Make sure the entire folder is deployed as one project so internal links work correctly.

License
This project is for educational and personal use. Pokémon content is owned by Nintendo, Game Freak, and The Pokémon Company.

python
Copy
Edit
