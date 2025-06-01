function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  
  function getRandomPrime(min = 20, max = 50) {
    let prime;
    do {
      prime = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (!isPrime(prime));
    return prime;
  }
  
  // Fungsi mencari akar primitif dari p
  function findPrimitiveRoot(p) {
    for (let g = 2; g < p; g++) {
      let powers = new Set();
      for (let i = 1; i < p; i++) {
        powers.add(modPow(g, i, p));
      }
      if (powers.size === p - 1) {
        return g;
      }
    }
    return -1; // Tidak ditemukan
  }
  
  function modPow(base, exponent, modulus) {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
      if (exponent % 2 === 1) result = (result * base) % modulus;
      exponent = Math.floor(exponent / 2);
      base = (base * base) % modulus;
    }
    return result;
  }
  
  function showManual() {
    document.getElementById("manualForm").style.display = "block";
    document.getElementById("autoForm").style.display = "none";
    document.getElementById("output").innerText = "";
  }
  
  function showAuto() {
    document.getElementById("manualForm").style.display = "none";
    document.getElementById("autoForm").style.display = "block";
    document.getElementById("output").innerText = "";
  }
  
  function runManual() {
    const p = parseInt(document.getElementById("p").value);
    const g = parseInt(document.getElementById("g").value);
    const a = parseInt(document.getElementById("a").value);
    const b = parseInt(document.getElementById("b").value);
  
    if (!isPrime(p)) {
      alert("Nilai p harus bilangan prima!");
      return;
    }
  
    const A = modPow(g, a, p);
    const B = modPow(g, b, p);
    const sharedA = modPow(B, a, p);
    const sharedB = modPow(A, b, p);
  
    displayResult(p, g, a, b, A, B, sharedA, sharedB);
  }
  
  function runAuto() {
    const p = getRandomPrime(50, 100);
    const g = findPrimitiveRoot(p);
    const a = Math.floor(Math.random() * (p - 2)) + 2;
    const b = Math.floor(Math.random() * (p - 2)) + 2;
  
    document.getElementById("p_auto").value = p;
    document.getElementById("g_auto").value = g;
    document.getElementById("a_auto").value = a;
    document.getElementById("b_auto").value = b;
  
    const A = modPow(g, a, p);
    const B = modPow(g, b, p);
    const sharedA = modPow(B, a, p);
    const sharedB = modPow(A, b, p);
  
    displayResult(p, g, a, b, A, B, sharedA, sharedB);
  }
  
  function displayResult(p, g, a, b, A, B, sharedA, sharedB) {
    const output = `
  📌 Nilai yang digunakan:
  p (prime) = ${p}
  g (akar primitif) = ${g}
  a (private A) = ${a}
  b (private B) = ${b}
  
  🔑 Public key A (g^a mod p) = ${A}
  🔑 Public key B (g^b mod p) = ${B}
  
  🧠 Shared key dihitung A: ${sharedA}
  🧠 Shared key dihitung B: ${sharedB}
  
  ${sharedA === sharedB ? "✅ Kunci bersama berhasil dibentuk!" : "❌ Kunci bersama tidak cocok."}
    `;
    document.getElementById("output").innerText = output;
  }
  