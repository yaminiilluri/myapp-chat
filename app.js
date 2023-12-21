// @ts-nocheck

const johnSelectorBtn = document.querySelector("#raj-selector");
const janeSelectorBtn = document.querySelector("#mini-selector");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearChatBtn = document.querySelector(".clear-chat-button");

const messages = JSON.parse(localStorage.getItem("messages")) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === "Raj" ? "blue-bg" : "gray-bg"}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = "Raj";

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender}'s Window`;
  chatInput.placeholder = `${messageSender} typing...`;

  if (name === "Raj") {
    johnSelectorBtn.classList.add("active-person");
    janeSelectorBtn.classList.remove("active-person");
  }
  if (name === "Mini") {
    janeSelectorBtn.classList.add("active-person");
    johnSelectorBtn.classList.remove("active-person");
  }

  /* auto-focus the input field */
  chatInput.focus();
};

johnSelectorBtn.onclick = () => updateMessageSender("Raj");
janeSelectorBtn.onclick = () => updateMessageSender("Mini");

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  /* Save message to local storage */
  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message);

  /* Clear input field */
  chatInputForm.reset();

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener("submit", sendMessage);

clearChatBtn.addEventListener("click", () => {
  localStorage.clear();
  chatMessages.innerHTML = "";
});
