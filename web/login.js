async function hashPassword(password, salt, iterations) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations,
      hash: "SHA-512"
    },
    keyMaterial,
    512
  );

  return [...new Uint8Array(bits)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function login() {
  const name = accounts[document.getElementById("accounts").value].name;
  console.log(name)
  const password = document.getElementById("password").value;
  console.log(password)
  const result = document.getElementById("result");

  const user = accounts.find(a => a.name === name);
  console.log(user)

  if (!user || !user.passwordHash) {
    result.textContent = "❌ User not found or not registered.";
    return;
  }

  const hash = await hashPassword(
    password,
    user.salt,
    user.iterations
  );

  if (hash === user.passwordHash) {
    result.textContent = "✅ Login successful!";
    connectWallet();
  } else {
    result.textContent = "❌ Invalid password.";
  }
}
