# Target Lane Shooter

A simple Three.js obstacle lane where you shoot enemy targets while avoiding civilians.

## Installation

Clone this repository:

```bash
git clone <repo-url>
cd maze-tap-shooter
```

No additional dependencies are required because the game loads Three.js from a CDN.

## Running Locally

Serve the files using a local web server so that the scripts load correctly:

```bash
python -m http.server
```

Then open `http://localhost:8000/` in your browser. The game should start automatically.

## Project Structure

- `index.html` – main HTML page.
- `style.css` – HUD layout and basic styling.
- `main.js` – game setup and interactions using Three.js.
