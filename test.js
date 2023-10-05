const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
//span COPY_ICON kanske inte funkar gave den classnamn copy-hover också
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".inputbox input");
const passIndicator = document.querySelector(".pass-indicator");
const generateButton = document.querySelector(".generate-button");
//checkboxes checked id
const resultEl = document.getElementById('result');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} );


const randomFunc = {
    upper: getUpperCase,
    lower: getLowerCase,
    number: getNumber,
    symbol: getSymbol,
}

generateButton.addEventListener("click", () => {
    const length = +lengthSlider.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
});
function generatePassword(length, lower, upper, number, symbol) {
    let generatedPassword = "";

    const typesArr = Object.filter({'lower':lower, 'upper':upper,'number':number,'symbol':symbol},item => item);
    for (let i = 0; i < length; i++) {
        let func = Object.keys(typesArr)[Math.floor(Math.random() * Object.keys(typesArr).length)];
        generatedPassword += randomFunc[func]();

    }

    return generatedPassword;
}

function getUpperCase() {
    const uppercase = "QWERTYUIOPÅASDFGHJKLÖÄZXCVBNM";
    return uppercase[Math.floor(Math.random() * uppercase.length)];
}

function getLowerCase() {
    const lowercase = "qwertyuiopåasdfghjklöäzxcvbnm";
    return lowercase[Math.floor(Math.random() * lowercase.length)];
}

function getNumber() {
    const numbers = "1234567890";
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    const symbols = "!#¤%&/()=?`^><";
    return symbols[Math.floor(Math.random() * symbols.length)];
}
