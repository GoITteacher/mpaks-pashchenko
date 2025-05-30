const alphabets = {
  en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ua: "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ",
};

function encrypt() {
  const text = document.getElementById("inputText").value;
  const lang = document.getElementById("language").value;
  const mode = document.getElementById("mode").value;
  const encrypted = processText(text, lang, mode, true);
  document.getElementById("outputText").value = encrypted;
}

function decrypt() {
  const text = document.getElementById("inputText").value;
  const lang = document.getElementById("language").value;
  const mode = document.getElementById("mode").value;
  const decrypted = processText(text, lang, mode, false);
  document.getElementById("outputText").value = decrypted;
}

function processText(text, lang, mode, isEncrypt) {
  const alphabet = alphabets[lang];
  const n = alphabet.length;
  let result = "";

  let keyword = document.getElementById("keyword").value.toUpperCase();

  for (let p = 0, kpos = 0; p < text.length; p++) {
    let char = text[p];
    const upperChar = char.toUpperCase();
    const isLower = char === char.toLowerCase() && /[a-zа-яґєії]/i.test(char);
    const index = alphabet.indexOf(upperChar);

    if (index === -1) {
      result += char;
      continue;
    }

    let k = 0;
    if (mode === "linear") {
      const A = parseInt(document.getElementById("A_linear").value) || 0;
      const B = parseInt(document.getElementById("B_linear").value) || 0;
      k = A * p + B;
    } else if (mode === "nonlinear") {
      const A = parseInt(document.getElementById("A_nl").value) || 0;
      const B = parseInt(document.getElementById("B_nl").value) || 0;
      const C = parseInt(document.getElementById("C_nl").value) || 0;
      k = A * p * p + B * p + C;
    } else if (mode === "keyword") {
      if (keyword.length === 0) {
        alert("Введіть гасло");
        return "";
      }
      const kwChar = keyword[kpos % keyword.length];
      const kwIndex = alphabet.indexOf(kwChar);
      if (kwIndex === -1) {
        alert("Гасло містить недопустимі символи!");
        return "";
      }
      k = kwIndex;
      kpos++;
    }

    if (!isEncrypt) k = -k;
    let newIndex = (index + k) % n;
    if (newIndex < 0) newIndex += n;
    let newChar = alphabet[newIndex];
    result += isLower ? newChar.toLowerCase() : newChar;
  }
  return result;
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

function toggleKeyInputs() {
  const mode = document.getElementById("mode").value;
  document.getElementById("linearKeys").style.display =
    mode === "linear" ? "block" : "none";
  document.getElementById("nonlinearKeys").style.display =
    mode === "nonlinear" ? "block" : "none";
  document.getElementById("keywordKey").style.display =
    mode === "keyword" ? "block" : "none";
}
