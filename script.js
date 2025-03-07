function updateLengthLabel(value) {
    document.getElementById("lengthLabel").innerText = value;
}

function copyPassword() {
    const passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");
    alert("Contraseña copiada al portapapeles");
}

function generatePassword() {
    const length = document.getElementById("lengthRange").value;
    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    const uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
    const numbersCharset = "0123456789";
    const symbolsCharset = "!@#$%^&*()_+[]{}|.:/+-<>?";

    let charset = "";
    if (useUppercase) charset += uppercaseCharset;
    if (useLowercase) charset += lowercaseCharset;
    if (useNumbers) charset += numbersCharset;
    if (useSymbols) charset += symbolsCharset;

    if (charset === "") {
        alert("Seleccione al menos una opción para generar la contraseña");
        return;
    }

    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    document.getElementById("password").value = password;
    checkPasswordStrength(password);
}

function checkPasswordStrength(password) {
    const strengthBars = document.querySelectorAll(".strength-bar");
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&#]/.test(password)) strength++;

    strengthBars.forEach((bar, index) => {
        bar.classList.remove("red", "yellow", "green");
        if (index < strength) {
            bar.classList.add(
                strength <= 2 ? "red" :
                strength <= 4 ? "yellow" : "green"
            );
        }
    });
}
