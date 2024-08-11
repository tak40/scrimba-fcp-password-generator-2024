// prettier-ignore
// const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
// "/"];

// prettier-ignore
const alphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

// prettier-ignore
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

// prettier-ignore
const symbols  = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]

const generatePasswordBtn = document.getElementById("generate-password-btn")
const password1 = document.getElementById("password1")
const password2 = document.getElementById("password2")
const passwordLengthSlider = document.getElementById("password-length-slider")
const numbersEl = document.getElementById("numbers")
const symbolsEl = document.getElementById("symbols")

let passwordLength = 15

let availableCharacters = [...alphabets]
console.log(availableCharacters)

// Event listener
passwordLengthSlider.addEventListener("input", function () {
    passwordLength = passwordLengthSlider.value
})

numbersEl.addEventListener("change", function () {
    if (numbersEl.checked) {
        availableCharacters.push(...numbers)
    } else {
        availableCharacters = availableCharacters.filter(function (character) {
            return !numbers.includes(character)
        })
    }
})

symbolsEl.addEventListener("change", function () {
    if (symbolsEl.checked) {
        availableCharacters.push(...symbols)
    } else {
        availableCharacters = availableCharacters.filter(function (character) {
            return !symbols.includes(character)
        })
    }
})

generatePasswordBtn.addEventListener("click", updatePassword)

// Functions

function generateRandomIndex() {
    return Math.floor(Math.random() * availableCharacters.length)
}

function generatePassword(length) {
    let password = ""
    for (let i = 0; i < length; i++) {
        password += availableCharacters[generateRandomIndex()]
    }
    return password
}

function updatePassword() {
    password1.textContent = generatePassword(passwordLength)
    password2.textContent = generatePassword(passwordLength)
}
