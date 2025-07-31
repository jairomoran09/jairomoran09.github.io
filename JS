    const gridData = [
      ['P', 'Y', 'T', 'H', 'O', 'N', 'K', 'S', 'B', 'C'],
      ['A', 'T', 'G', 'V', 'Z', 'A', 'O', 'T', 'Ñ', 'D'],
      ['C', 'L', 'A', 'S', 'S', 'M', 'B', 'R', 'I', 'I'],
      ['T', 'X', 'G', 'X', 'I', 'O', 'J', 'I', 'Q', 'C'],
      ['S', 'T', 'J', 'I', 'N', 'R', 'E', 'N', 'F', 'T'],
      ['I', 'U', 'O', 'X', 'Y', 'E', 'C', 'G', 'A', 'C'],
      ['L', 'P', 'N', 'G', 'L', 'Y', 'T', 'A', 'L', 'O'],
      ['X', 'N', 'K', 'P', 'Y', 'B', 'J', 'S', 'O', 'M'],
      ['D', 'I', 'U', 'T', 'H', 'I', 'A', 'Y', 'O', 'O'],
      ['X', 'T', 'I', 'M', 'P', 'O', 'R', 'T', 'P', 'F']
    ];

    const words = ["PYTHON", "CLASS", "LIST", "DICT", "LOOP", "TUPLE", "STRING", "INPUT", "IMPORT", "OBJECT"];
    let selected = [];
    let foundWords = [];
    const gridElement = document.getElementById("grid");
    const messageElement = document.getElementById("message");
    const wordsContainer = document.getElementById("words");
    const snakeOverlay = document.getElementById("snake-overlay");
    const introOverlay = document.getElementById("intro-overlay");

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = gridData[row][col];
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("click", () => selectCell(cell));
        gridElement.appendChild(cell);
      }
    }

    function selectCell(cell) {
      const key = cell.dataset.row + "," + cell.dataset.col;
      if (cell.classList.contains("selected")) {
        cell.classList.remove("selected");
        selected = selected.filter(k => k !== key);
      } else {
        selected.push(key);
        cell.classList.add("selected");
      }
      checkSelection();
    }

    function checkSelection() {
      const letters = selected.map(pos => {
        const [row, col] = pos.split(',').map(Number);
        return gridData[row][col];
      });
      const word = letters.join('');
      const reversed = letters.slice().reverse().join('');
      for (const w of words) {
        if ((word === w || reversed === w) && !foundWords.includes(w)) {
          foundWords.push(w);
          markAsFound(selected);
          updateWordList();
          selected = [];
          if (foundWords.length === words.length) {
            messageElement.textContent = "";
            showSnakeAnimation();
          }
          return;
        }
      }
    }

    function markAsFound(positions) {
      positions.forEach(pos => {
        const [row, col] = pos.split(',').map(Number);
        const index = row * 10 + col;
        const cell = gridElement.children[index];
        cell.classList.remove("selected");
        cell.classList.add("found");
      });
    }

    function updateWordList() {
      wordsContainer.innerHTML = words.map(w =>
        foundWords.includes(w) ? `<s>${w}</s>` : w
      ).join(", ");
    }

    function showSnakeAnimation() {
      snakeOverlay.classList.add("active");
      // Opcional: ocultar overlay después de X segundos
      setTimeout(() => {
        snakeOverlay.classList.remove("active");
      }, 8000);
    }

    // Quitar la intro después de 4s para mostrar el juego
    window.addEventListener('load', () => {
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 4000);
    });