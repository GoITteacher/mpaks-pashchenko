// script.js

const alphabets = {
  en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ua: "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ",
};

function encrypt() {
  const text = document.getElementById("inputText").value;
  const lang = document.getElementById("language").value;
  const gamma = document.getElementById("gamma").value;
  const result = gammaCipher(text, gamma, lang, true);
  document.getElementById("outputText").value = result;
}

function decrypt() {
  const text = document.getElementById("inputText").value;
  const lang = document.getElementById("language").value;
  const gamma = document.getElementById("gamma").value;
  const result = gammaCipher(text, gamma, lang, false);
  document.getElementById("outputText").value = result;
}

function gammaCipher(text, gamma, lang, isEncrypt) {
  const alphabet = alphabets[lang];
  const n = alphabet.length;
  let result = "";

  if (gamma.length === 0) {
    alert("Будь ласка, введіть гамму");
    return "";
  }

  let gammaUpper = gamma.toUpperCase();
  let gammaIndex = 0;

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    const upperChar = char.toUpperCase();
    const isLower = char === char.toLowerCase() && /[a-zа-яґєії]/i.test(char);
    const index = alphabet.indexOf(upperChar);

    if (index === -1) {
      result += char;
      continue;
    }

    const gammaChar = gammaUpper[gammaIndex % gammaUpper.length];
    const gammaCharIndex = alphabet.indexOf(gammaChar);

    if (gammaCharIndex === -1) {
      alert("Гамма містить недопустимі символи!");
      return "";
    }

    let shift = gammaCharIndex;
    if (!isEncrypt) shift = -shift;
    let newIndex = (index + shift) % n;
    if (newIndex < 0) newIndex += n;

    let newChar = alphabet[newIndex];
    result += isLower ? newChar.toLowerCase() : newChar;
    gammaIndex++;
  }

  return result;
}

function generateRandomGamma() {
  const text = document.getElementById("inputText").value;
  const lang = document.getElementById("language").value;
  const alphabet = alphabets[lang];
  const textLength = text.length || 20;
  let randomGamma = "";

  for (let i = 0; i < textLength + 10; i++) {
    const randIndex = Math.floor(Math.random() * alphabet.length);
    randomGamma += alphabet[randIndex];
  }
  document.getElementById("gamma").value = randomGamma;
}

function saveFile() {
  const text = document.getElementById("outputText").value;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "result.txt";
  link.click();
}

function loadFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("inputText").value = e.target.result;
  };
  reader.readAsText(file);
}
