#  🎮 Tic-Tac-Toe Game ❌🔵

✨ A modern and enhanced web-based Tic-Tac-Toe game with selectable grid sizes and audio feedback. ✨  

[Play Online Here!](https://shankar-tictactoe-game.netlify.app/)

---

## ✨ Features

* **🔢 Variable Grid Sizes**: Choose between 3x3, 4x4, or 5x5 grids for different levels of challenge.
* **🖱️ Interactive Gameplay**: Smooth interface with clear turn indicators.
* **🏆 Win Detection**: Automatically detects and highlights row, column, and diagonal wins.
* **🤝 Draw Detection**: Declares a draw when the board is full with no winner.
* **🎉 Winning Animation**: Celebratory confetti animation upon winning.
* **🔊 Audio Feedback**: 🎵 Background music and 🔊 sound effects for moves, wins, and draws (toggleable).
* **💾 Audio Settings Persistence**: Remembers your audio preferences using localStorage.
* **📱 Responsive Design**: Adapts to different screen sizes for play on various devices.
* **🔄 Replay Options**: Easily start a new game with the same settings or return to the main menu to choose a different grid size.

---

## 📁 Project Structure 📁

```
Shankar-TicTacToe-Game/
├── css/
│   └── style.css       # 🎨 Styles for layout, responsiveness, and appearance
├── js/
│   └── script.js       # 🧠 Game logic, event handling, state management
├── audio/
│   ├── background_music.mp3 # 🎵 Background music file
│   ├── move_sound.wav       # 🔊 Sound for placing a mark
│   ├── win_sound.wav        # 🎉 Sound for winning
│   └── draw_sound.wav       # 🤝 Sound for a draw game
├── index.html          # 📄 Main HTML structure for the game screens and elements
└── README.md
```

---

## 🛠️ Technical Implementation 🛠️

* **🌐 Frontend**: Built with HTML, CSS, and vanilla JavaScript.
* **🖥️ DOM Manipulation**: JavaScript is used to dynamically create the game board, handle user interactions, update the UI, and manage game state.
* **📝 State Management**: A `gameState` object tracks the current player, grid size, board state, game over status, and audio settings.
* **👂🏼 Event Listeners**: Handle clicks for grid size selection, starting the game, cell interactions, and control buttons.
* **🔊 Audio**: HTML5 `<audio>` elements are used for background music and sound effects, controlled via JavaScript.
* **🎭 Animation**: CSS animations for mark placement and a JavaScript-based canvas animation for confetti on win.
* **📦 LocalStorage**: Saves and loads user audio preferences.

---

## 🌐 Browser Compatibility

This hangman game is designed to be fully responsive across different browsers, devices, and screen sizes.

---

## 🚀 Future Enhancements 🚀

* **🤖 AI Opponent**: Implement different difficulty levels for playing against the computer.
* **🎨 Themes**: Add options for different visual themes (colors, mark styles).
* **📊 Score Keeping**: Track wins/losses/draws across sessions.
* **🛜 Multiplayer Mode**: Allow two players to play over a network.
* **🎭 More Animations**: Add more visual flair and animations for game events.

---

## 🎯 Ready to Play?

[Play online here](https://shankar-tictactoe-game.netlify.app/), or clone the repo, run the program, and start playing! 🚀
