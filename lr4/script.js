// script.js

function encrypt() {
  const text = document.getElementById("inputText").value;
  const key = document.getElementById("key").value;
  const iv = document.getElementById("iv").value;
  const algo = document.getElementById("algorithm").value;

  if (!key) {
    alert("Будь ласка, введіть ключ.");
    return;
  }

  let encrypted;
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const ivUtf8 = iv
    ? CryptoJS.enc.Utf8.parse(iv)
    : CryptoJS.enc.Utf8.parse("00000000");

  switch (algo) {
    case "DES":
      encrypted = CryptoJS.DES.encrypt(text, keyUtf8, {
        iv: ivUtf8,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      break;
    case "TripleDES":
      encrypted = CryptoJS.TripleDES.encrypt(text, keyUtf8, {
        iv: ivUtf8,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      break;
    case "AES":
      encrypted = CryptoJS.AES.encrypt(text, keyUtf8, {
        iv: ivUtf8,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      break;
    default:
      alert("Невідомий алгоритм");
      return;
  }

  document.getElementById("outputText").value = encrypted.toString();
}

function decrypt() {
  const text = document.getElementById("inputText").value;
  const key = document.getElementById("key").value;
  const iv = document.getElementById("iv").value;
  const algo = document.getElementById("algorithm").value;

  if (!key) {
    alert("Будь ласка, введіть ключ.");
    return;
  }

  let decrypted;
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const ivUtf8 = iv
    ? CryptoJS.enc.Utf8.parse(iv)
    : CryptoJS.enc.Utf8.parse("00000000");

  try {
    switch (algo) {
      case "DES":
        decrypted = CryptoJS.DES.decrypt(text, keyUtf8, {
          iv: ivUtf8,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        break;
      case "TripleDES":
        decrypted = CryptoJS.TripleDES.decrypt(text, keyUtf8, {
          iv: ivUtf8,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        break;
      case "AES":
        decrypted = CryptoJS.AES.decrypt(text, keyUtf8, {
          iv: ivUtf8,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        break;
      default:
        alert("Невідомий алгоритм");
        return;
    }

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    document.getElementById("outputText").value = result;
  } catch (e) {
    alert("Помилка при розшифруванні. Перевірте ключ, IV та вхідні дані.");
  }
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
