class Player {
    username: string;
    score: number;
  
    constructor(username: string, score: number = 0) {
      this.username = username;
      this.score = score;
    }
  
    saveToLocalStorage() {
      localStorage.setItem("player", JSON.stringify({ username: this.username, score: this.score }));
    }
  
    static loadFromLocalStorage(): Player | null {
      const playerData = localStorage.getItem("player");
      return playerData ? JSON.parse(playerData) : null;
    }
  
    updateScore(newScore: number) {
      this.score = newScore;
      this.saveToLocalStorage();
    }
  }
  
  export default Player;
  