document.getElementById("sendButton").addEventListener("click", function () {
  const userInput = document.getElementById("userInput").value;
  if (userInput.trim() !== "") {
    addMessage("You", userInput);
    getBotResponse(userInput);
    document.getElementById("userInput").value = "";
  }
});

function addMessage(sender, message) {
  const chatbox = document.getElementById("chatbox");
  const messageDiv = document.createElement("div");
  messageDiv.textContent = `${sender}: ${message}`;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(userInput) {
  // Simple bot logic (replace with advanced AI later)
  let botMessage = "Sorry, I didn't understand that.";
  if (userInput.toLowerCase().includes("hello")) {
    botMessage = "Hi there! How can I assist you today?";
  }
  addMessage("Bot", botMessage);
}
