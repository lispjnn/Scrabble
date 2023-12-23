class WordScoreBoard {
  constructor() {
    this.words = [];
  }

  // TODO #8: Save the word score to the server
  async saveWordScore(name, word, score) {
    this.words.push({name, word, score });
    const response = await fetch('/wordScore', {
      method: 'POST',
      body: JSON.stringify({ name, word, score }),
      headers: {'Content-Type': 'application/json'}
    });
    
    const result = await response.json();
  
  }

  render(element) {
    let html = '<h1>Word Scores</h1>';
    html += '<table>';
    this.words.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.word}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }
}

class GameScoreBoard {
  constructor() {
    this.game = [];
  }

  render(element) {
    let html = '<h1>Game Score</h1>';
    html += '<table>';
    this.game.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }

  // TODO #9: Save the game score to the server
  async saveGameScore(name, score) {
    this.game.push({ name, score });

    await fetch('/gameScore', {
      method: 'POST',
      body: JSON.stringify({ name, score }),
      headers: {'Content-Type': 'application/json'}
    });

  }
}

class TopWordAndGameScoreBoard {
  // TODO #10: Render the top word and game scores
  async render(element) {
    try {
      const topWordScoresResponse = await fetch('/highestWordScores', {
        method: 'GET',
      });
      const topWordScores = await topWordScoresResponse.json();

      const topGameScoresResponse = await fetch('/highestGameScores', {
        method: 'GET',
      });
      const topGameScores = await topGameScoresResponse.json();

      let html = '<h1>Top Word Scores</h1>';
      html += '<table class="top-score-boards">';
      topWordScores.forEach((score) => {
        html += `
          <tr>
            <td>${score.name}</td>
            <td>${score.word}</td>
            <td>${score.score}</td>
          </tr>
        `;
      });
      html += '</table>';
      html += '<h1>Top Game Scores</h1>';
      html += '<table class="top-score-boards">';
      topGameScores.forEach((score) => {
        html += `
          <tr>
            <td>${score.name}</td>
            <td>${score.score}</td>
          </tr>
        `;
      });
      html += '</table>';
      element.innerHTML = "";
      element.innerHTML = html;
    } catch (error) {
      console.error('Error rendering top scores:', error.message);
    }
  }
}

export const wordScoreBoard = new WordScoreBoard();
export const gameScoreBoard = new GameScoreBoard();
export const topWordAndGameScoreBoard = new TopWordAndGameScoreBoard();
