
//------------------------------DATA SET ARRAYS--------------------------------------------

// Array of lowercase characters to be included in password
const lowerCasedCharacters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
];

// Array of uppercase characters to be included in password
const upperCasedCharacters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of special characters to be included in password
const specialCharacters = [
    '@',
    '%',
    '+',
    '\\',
    '/',
    "'",
    '!',
    '#',
    '$',
    '^',
    '?',
    ':',
    ',',
    ')',
    '(',
    '}',
    '{',
    ']',
    '[',
    '~',
    '-',
    '_',
    '.'
];

//----------------------------------------------ONLOAD LOGIC-----------------------------------------------------

//logic below causes checkboxes to toggle off if the page in refreshed
//this prevents undesirable behaviour that caused checkbox toggles to work incorrectly
//onload logic taken from link: https://stackoverflow.com/questions/12364007/uncheck-all-checkbox-on-pageload-using-javascript


const uncheckAll = () => { 
    let w = document.getElementsByTagName('input'); 

    for (var i = 0; i < w.length; i++) { 

        if (w[i].type=='checkbox') { 

            w[i].checked = false; 
            
        }
    }
} 


//---------------------------------------------PASSWORD GENERATION OPTIONS LOGIC-----------------------------

//stores chosen passLength as a variable
const passwordLength = () => {

    let passLength = document.getElementById("passLength").value;

    if(passLength < 8 || passLength > 128) {
        alert("Error: Passwords require length of 8-128 characters.");
        document.getElementById("passLength").value = 8;
    }

    console.log(`Password Length set to: ${document.getElementById("passLength").value}.`);


}


//bool functions for checkboxes. need to make these DRY
//also note that if the user refreshes the page with boxes checked this logic will be inverted
const lowercaseToggle = () => {

    let lowercaseToggle = document.getElementById("lowercase").value;

    //converts value to type bool --- will need this later
    //let lowercaseToggleBool = (lowercaseToggle === true)
    
    
    if (lowercaseToggle == "false") {

        document.getElementById("lowercase").value = "true";

    } else if (lowercaseToggle == "true") {

        document.getElementById("lowercase").value = "false";

    } else {

        console.log("error, check conditionals");

    }
    
    console.log(`lowercase toggle: ${document.getElementById("lowercase").value}`);

}

const uppercaseToggle = () => {
    
    let uppercaseToggle = document.getElementById("uppercase").value;
    
    if (uppercaseToggle == "false") {

        document.getElementById("uppercase").value = "true";

    } else if (uppercaseToggle == "true") {

        document.getElementById("uppercase").value = "false";

    } else {

        console.log("error, check conditionals");

    }

    console.log(`uppercase toggle: ${document.getElementById("uppercase").value}`);

};

const numericToggle = () => {
    
    let numericToggle = document.getElementById("numeric").value;
    
    if (numericToggle == "false") {

        document.getElementById("numeric").value = "true";

    } else if (numericToggle == "true") {

        document.getElementById("numeric").value = "false";

    } else {

        console.log("error, check conditionals");

    }
    
    console.log(`numeric toggle: ${document.getElementById("numeric").value}`);

};

const specialCharToggle = () => {
    
    //value is default string
    let specialCharToggle = document.getElementById("specialChar").value;
    
    if (specialCharToggle == "false") {

        document.getElementById("specialChar").value = "true";

    } else if (specialCharToggle == "true") {

        document.getElementById("specialChar").value = "false";

    } else {

        console.log("error, check conditionals");

    }

    console.log(`numeric toggle: ${document.getElementById("specialChar").value}`);

};

//--------------------------------PASSWORD GENERATOR LOGIC--------------------




// Function to generate password with user input
const generatePassword = () => {
    //variables for password generation
    let passwordLength = document.getElementById("passLength").value;
    let lowercaseToggle = document.getElementById("lowercase").value;
    let uppercaseToggle = document.getElementById("uppercase").value;
    let numericToggle = document.getElementById("numeric").value;
    let specialCharToggle = document.getElementById("specialChar").value;


    valuesArr = {
        "lowercaseToggle": lowercaseToggle,
        "uppercaseToggle": uppercaseToggle, 
        "numericToggle": numericToggle, 
        "specialCharToggle": specialCharToggle
    };

    //array to be filled with selected checkbox options
    let desiredValuesArr = [];

    //array to be filled with all chosen characters based on desiredValuesArr
    let desiredCharDataArr = [];

    //array to be filled with random characters taken from desiredCharDataArr
    let generatedPassArr = [];

    //if no password options have been toggled no password is generated & error message is displayed.
    if(lowercaseToggle == "false" && uppercaseToggle == "false" && numericToggle == "false" && specialCharToggle == "false") {

        const generatedPass = "Error: Please select at least one checkbox option.";
        return generatedPass;

    } else {
        //password generator logic here

        for(const [key, value] of Object.entries(valuesArr)) {
            
            if(value == "true") {
                //arr is filled with all desired elements
                desiredValuesArr.push(key);

            }
        }

        //logs desired elements
        //console.log(desiredValuesArr);

        desiredValuesArr.forEach(function(toggle){
            //confirms current toggles
            //console.log(toggle);

            if(toggle == "lowercaseToggle") {
                for(chars in lowerCasedCharacters) {

                    desiredCharDataArr.push(lowerCasedCharacters[chars]);
                }
            }

            if(toggle == "uppercaseToggle") {
                for(chars in upperCasedCharacters) {

                    desiredCharDataArr.push(upperCasedCharacters[chars]);
                }
            }

            if(toggle == "numericToggle") {
                for(chars in numericCharacters) {

                    desiredCharDataArr.push(numericCharacters[chars]);
                }
            }

            if(toggle == "specialCharToggle") {
                for(chars in specialCharacters) {

                    desiredCharDataArr.push(specialCharacters[chars]);
                }
            }

        });

        //logs array filled with all desired characters
        //console.log(`Array filled with all desired checkbox options: ${desiredCharDataArr}`);
        //console.log(`Total Password Length: ${passwordLength}`);

        let counter = 0;

        while(counter < passwordLength) {
            let randomChar = desiredCharDataArr[Math.floor(Math.random() * desiredCharDataArr.length)];
            generatedPassArr.push(randomChar);
            counter++
        }

        const generatedPass = generatedPassArr.join('');
        //console.log(`Generated Password: ${generatedPass}`);
        return generatedPass;

    }
};



// Get references to the #generate element
let generateBtn = document.querySelector('#generate');

// Write password to the #password input
const writePassword = () => {
    let password = generatePassword();
    let passwordText = document.querySelector('#password');

    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);