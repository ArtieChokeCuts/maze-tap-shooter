# Maze Tap Shooter

Maze Tap Shooter is a simple browser-based game. Navigate a fixed maze using the on-screen controls and decide whether to shoot any targets you encounter.

## Running the Game

1. Clone this repository.
2. Open `index.html` in a modern web browser that supports ES modules. For the best experience, serve the files with a local web server to avoid CORS issues.

### Using a simple server (Node.js required)

```bash
npx http-server .
```

Then open the printed local address in your browser.

## Controls

- **⬅️** and **➡️** – rotate left and right.
- **⬆️** – move forward if the path is clear.
- **Tap/Click anywhere** – shoot a target. Hitting nothing adds a penalty and consumes ammo.

Collect all targets before you run out of ammo!
