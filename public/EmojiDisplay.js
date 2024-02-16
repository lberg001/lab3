// EmojiDisplay.js
class EmojiDisplay {
    constructor(data) {
      this.data = data; // The loaded JSON data
      this.emojis = [];
      this.emojiString = [];
      this.topic = 5; // Initial topic index
      this.displayText = "";
    }
  
    setup() {
      // Initialize emojis from data
      this.emojis = this.data.emojis;
    }
  
    draw(emoji, positionX, positionY) {
      this.displayText=emoji;
      textSize(50);
      textAlign(CENTER);
      text(this.displayText, positionX, positionY);
    }
  
    displayEmojiCategory(emojiCategory) {
      this.emojiString = []; // Reset emojiString array to handle category changes
      for (let i = 0; i < this.emojis.length; i++) {
        if (this.emojis[i].Group === emojiCategory) {
          this.emojiString.push(this.emojis[i].Representation);
        }
      }
  
      return this.emojiString;
    }
  
  }
  