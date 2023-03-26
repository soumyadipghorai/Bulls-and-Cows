let predictButton = document.getElementById("prediction Button");
predictButton.addEventListener('click', check); 
let getLengthButton = document.getElementById("getLength");
getLengthButton.addEventListener('click', getLengthFunction); 

var playSectionFlag = false;
var lengthSectionFlag = true;
function getLengthFunction(){
    var ele = document.getElementsByClassName('radio-button-for-length');

    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked){
            console.log(ele[i].value);
            playSectionFlag = true;
            document.getElementById("guessSection").style.display = "block";
            document.getElementById("lengthSection").style.display = "none";
            // console.log(playSectionFlag);
            return ele[i].value;
        }        
    }
}
console.log(playSectionFlag);
if (playSectionFlag === false){
    document.getElementById("guessSection").style.display = "none";
    lengthSectionFlag = false; 
}


function createCowBull(secret, guess){
    let bullCount = 0; 
    let cowCount = 0; 

    var secretLetterCount = {};
    var guessLetterCount = {};
    var commonCount = {};

    for (let i = 0; i < secret.length; i++){
        if (secret[i] === guess[i]){
            if (secretLetterCount[secret[i]] === undefined )
                secretLetterCount[secret[i]] = 1
            else
                secretLetterCount[secret[i]]++;

            if (guessLetterCount[secret[i]] === undefined )
                guessLetterCount[secret[i]] = 1
            else
                guessLetterCount[secret[i]]++;

            if (commonCount[secret[i]] === undefined )
                commonCount[secret[i]] = 1
            else
                commonCount[secret[i]]++;

            bullCount++;
        }
        else{
            if (secretLetterCount[secret[i]] === undefined )
                secretLetterCount[secret[i]] = 1
            else
                secretLetterCount[secret[i]]++;
            
            if (guessLetterCount[guess[i]] === undefined )
                guessLetterCount[guess[i]] = 1
            else
                guessLetterCount[guess[i]]++;
        }
    }

    for (var key in secretLetterCount){
        if (guessLetterCount[key] != undefined){
            if (commonCount[key] != undefined){
                cowCount = cowCount + Math.min(secretLetterCount[key], guessLetterCount[key]) - commonCount[key];
            }
            else{
                cowCount = cowCount + Math.min(secretLetterCount[key], guessLetterCount[key])
            }
        }
    }

    return bullCount +" "+ cowCount;

}

function generateRandomNumber(length){
    var secretNumber = Math.floor(Math.random()*Math.pow(10, length));
    return secretNumber.toString();
}

var counter = 0;
var secret = "";
var flag = true;
function check(){ 
    if (flag){
        var length = Number(getLengthFunction());
        secret = generateRandomNumber(length);
        flag = false;
        while (secret.length != length){
            secret = secret + '0';
        }
    }
    var guessedNumber = document.getElementById('guess').value; 
    console.log(secret, guessedNumber);
    console.log(createCowBull(secret, guessedNumber));
    document.getElementById("heroImage").innerHTML = "";
    if (secret == guessedNumber){
        document.getElementById("heroImage").innerHTML = '<img src="images/congrats.png" alt="dancing-bull" class="dancing-bull" id="bullImage" style="max-width: 100%; margin-left: 2%;">';
        document.getElementById('bullsAndCows').innerHTML = "";
        secret = "";
        counter = 0;
        flag = true;
    }
    else{
        if (Number(secret) > Number(guessedNumber)){
            console.log("large");
        }
        else{
            console.log("small");
        }
        document.getElementById('guess').value = "";
        var bullCount = createCowBull(secret, guessedNumber)[0];
        var cowCount = createCowBull(secret, guessedNumber)[createCowBull(secret, guessedNumber).length - 1];
        document.getElementById('bullsAndCows').innerHTML = '<img src="images/cowBulls/'+cowCount+'-cow-'+bullCount+'-bulls.gif" alt="dancing-bull" class="dancing-bull" id="bullImage" style="max-width: 100%; margin-left: 2%;">'
    }
    counter++; 
    console.log(counter);
}