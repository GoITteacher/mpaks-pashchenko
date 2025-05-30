// Алфавіти для двох мов
const alphabets = {
  en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ua: "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ",
};

// Зашифрування
function encrypt() {
  const text = document.getElementById("inputText").value;
  const key = parseInt(document.getElementById("key").value);
  const lang = document.getElementById("language").value;

  if (isNaN(key)) {
    alert("Введіть коректний числовий ключ!");
    return;
  }

  document.getElementById("outputText").value = caesarCipher(text, key, lang);
}

// Розшифрування
function decrypt() {
  const text = document.getElementById("inputText").value;
  const key = parseInt(document.getElementById("key").value);
  const lang = document.getElementById("language").value;

  if (isNaN(key)) {
    alert("Введіть коректний числовий ключ!");
    return;
  }

  document.getElementById("outputText").value = caesarCipher(text, -key, lang);
}

// Brute Force
function bruteForce() {
  const text = document.getElementById("inputText").value;
  const lang = document.getElementById("language").value;
  const alphabet = alphabets[lang];
  let results = "";

  for (let k = 1; k < alphabet.length; k++) {
    results += `Ключ ${k}:\n` + caesarCipher(text, -k, lang) + "\n\n";
  }
  document.getElementById("outputText").value = results;
}

// Основна функція шифрування/розшифрування
function caesarCipher(text, shift, lang) {
  const alphabet = alphabets[lang];
  const n = alphabet.length;
  let result = "";

  for (let char of text) {
    const upperChar = char.toUpperCase();
    const isLower = char === char.toLowerCase() && /[a-zа-яґєії]/i.test(char);
    const index = alphabet.indexOf(upperChar);

    if (index === -1) {
      result += char;
    } else {
      let newIndex = (index + shift) % n;
      if (newIndex < 0) newIndex += n;
      let newChar = alphabet[newIndex];
      result += isLower ? newChar.toLowerCase() : newChar;
    }
  }
  return result;
}

// Збереження в файл
function saveFile() {
  const text = document.getElementById("outputText").value;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "result.txt";
  link.click();
}

// Завантаження з файлу
function loadFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("inputText").value = e.target.result;
  };
  reader.readAsText(file);
}
