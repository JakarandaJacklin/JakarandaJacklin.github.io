// Complete variable definitions and random functions

const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Raw text strings

const characters = ["Solomon the Great", "Cullen McGuire", "a random pirate"];

const places = ["the entrace to the Divine Dungion", "their local Solar Doe Magic Shopee and Emporium sponsored by the Enteral Kevin Ruler of the Multiverse", "the crossroads"];

const events = [
  "it was the end of the world",
  "they stubbed their toe",
  "the gods have finally aknowledged the existance of mortals",
];

// Partial return random string function

function returnRandomStoryString() {
  const randChar = randomValueFromArray(characters);
  const randPlace = randomValueFromArray(places);
  const randEvent = randomValueFromArray(events);

  let storyText = `It was 94 Fahrenheit outside, when ${randChar} was adventuring. At ${randPlace}, they paused a moment to reflect on life because ${randEvent}. Bob was the eternal watcher, assigned to protect ${randChar} with the weighsof 300 pounds.`;
  return storyText;
}

// Event listener and partial generate function definition

generateBtn.addEventListener("click", generateStory);

function generateStory() {
  let newStory = returnRandomStoryString();

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14) + " stone";
    const temperature = Math.round((94 - 32) * (5 / 9)) + " Celsius";
    newStory = newStory.replace("94 Fahrenheit", temperature);
    newStory = newStory.replace("300 pounds", weight);
  }

  // TODO: replace "" with the correct expression
  story.textContent = newStory;
  story.style.visibility = "visible";
}
