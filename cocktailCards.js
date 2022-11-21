// Card building functions interacting with DOM
function addAllCards(drinkName, drinkInstructions, drinkIngredient, imgUrl) {
    const template = document.getElementById("card-template").content.cloneNode(true);
    template.querySelector('.card-title').innerText = drinkName;
    template.querySelector('.card-text').innerHTML = "Ingredients: " + drinkIngredient;
    template.querySelector('.card-subtitle').innerText = "Method: " + drinkInstructions;
    template.querySelector('.card-image').src = imgUrl;
    template.querySelector('.card-image').alt = "Image not found";
    document.querySelector('#cocktail-cards').appendChild(template);
}

function addSurpriseCard(drinkName, drinkInstructions, drinkIngredient, imgUrl) {
    const template = document.getElementById("surprise-card-template").content.cloneNode(true);
    template.querySelector('.card-title').innerText = drinkName;
    template.querySelector('.card-text').innerText = "Ingredients: " + drinkIngredient;
    template.querySelector('.card-subtitle').innerText = "Method: " + drinkInstructions;
    template.querySelector('.card-image').src = imgUrl;
    template.querySelector('.card-image').alt = "Image not found";
    document.querySelector('#random-cocktail').appendChild(template);
}

function addFoundCocktailCard(drinkName, drinkInstructions, drinkIngredient, imgUrl) {
    const template = document.getElementById("found-card-template").content.cloneNode(true);
    template.querySelector('.card-title').innerText = drinkName;
    template.querySelector('.card-text').innerText = "Ingredients: " + drinkIngredient;
    template.querySelector('.card-subtitle').innerText = "Method: " + drinkInstructions;
    template.querySelector('.card-image').src = imgUrl;
    template.querySelector('.card-image').alt = "Image not found";
    document.querySelector('#found-cocktails').appendChild(template);
}

// button hiding functions
function showAButton(buttonId) {
    document.getElementById(buttonId).style.display = 'inline'
}

function hideAllButton() {
    document.getElementById('cocktail-cards').innerHTML = "";
    document.getElementById('hide-all-cocktails').style.display = 'none';
}

// animation loading symbol functions
function hideLoading(){
    document.getElementById("loading").style.display = 'none'
}
function showLoading(){
    document.getElementById("loading").style.display = 'inline'
}

// Fetch functions, wrapper functions for onclick
function seeAllButton() {
    showLoading()
    document.getElementById('random-cocktail').innerHTML = "";
    showAButton('hide-all-cocktails')
    document.getElementById('cocktail-cards').innerHTML = "";
    document.getElementById('invalidSearch').innerHTML = "";
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            // setTimeout(hideLoading, 3000)
            hideLoading()
            const drinksArray = json.drinks;
            let strIngredientKeys = []
            let strMeasureKeys = []

            function getStrIngredientArray() {
                for (let j = 1; j <= 15; j++) {
                    strIngredientKeys.push("strIngredient" + j)
                }
            }
            getStrIngredientArray()
            
            function getStrMeasureArray() {
                for (let m = 1; m <= 15; m++) {
                    strMeasureKeys.push("strMeasure" + m)
                }
            }
            getStrMeasureArray()

            if ('content' in document.createElement('template')) {
                for (let i in drinksArray) {
                    let allDrinkIngredients = []
                    for (let k in strIngredientKeys) {
                        if (drinksArray[i][strIngredientKeys[k]] != null && drinksArray[i][strMeasureKeys[k]] != null)
                            allDrinkIngredients.push( " " + drinksArray[i][strIngredientKeys[k]] + " " + drinksArray[i][strMeasureKeys[k]] + " ")
                    }
                    addSurpriseCard(drinksArray[i].strDrink, drinksArray[i].strInstructions, allDrinkIngredients, drinksArray[i].strDrinkThumb)
                }
            }
        })
}

function surpriseMeButton() {
    showLoading()
    document.getElementById('random-cocktail').innerHTML = "";
    document.getElementById('invalidSearch').innerHTML = "";
    document.getElementById('cocktail-cards').innerHTML = "";
    document.forms.searchForm.searchText.value = ""
    document.getElementById('hide-all-cocktails').style.display = 'none';
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            hideLoading()

            const drinksArray = json.drinks;
            let strIngredientKeys = []
            let strMeasureKeys = []

            function getStrIngredientArray() {
                for (let j = 1; j <= 15; j++) {
                    strIngredientKeys.push("strIngredient" + j)
                }
            }
            getStrIngredientArray()
            
            function getStrMeasureArray() {
                for (let m = 1; m <= 15; m++) {
                    strMeasureKeys.push("strMeasure" + m)
                }
            }
            getStrMeasureArray()

            if ('content' in document.createElement('template')) {
                let i = Math.floor(Math.random() * drinksArray.length)
                let allDrinkIngredients = []
                for (let k in strIngredientKeys) {
                    if (drinksArray[i][strIngredientKeys[k]] != null && drinksArray[i][strMeasureKeys[k]] != null)
                        allDrinkIngredients.push(" " + drinksArray[i][strIngredientKeys[k]] + " " + drinksArray[i][strMeasureKeys[k]])
                }

                addSurpriseCard(drinksArray[i].strDrink, drinksArray[i].strInstructions, allDrinkIngredients, drinksArray[i].strDrinkThumb)
            }

        })
}

function searchByIngredient() {
    showLoading()
    document.getElementById('invalidSearch').innerHTML = "";
    document.getElementById('found-cocktails').innerHTML = "";
    document.getElementById('random-cocktail').innerHTML = "";
    document.getElementById('found-cocktails').innerHTML = "";
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then((response) => response.json())
        .then((json) => {
            hideLoading()
            console.log(json)
            const drinksArray = json.drinks;
            
            let strIngredientKeys = []
            let strMeasureKeys = []

            function getStrIngredientArray() {
                for (let j = 1; j <= 15; j++) {
                    strIngredientKeys.push("strIngredient" + j)
                }
            }
            getStrIngredientArray()
            
            function getStrMeasureArray() {
                for (let m = 1; m <= 15; m++) {
                    strMeasureKeys.push("strMeasure" + m)
                }
            }
            getStrMeasureArray()
            
            // accessing search bar user input, transforming to uppercase for searching
            let userSearch = document.forms.searchForm.searchText.value
            let userSearchUpperCase = userSearch.toUpperCase()
            
            console.log(userSearch.toUpperCase())

            // Checking if user input is empty
            if (userSearch === ""){
                document.getElementById("invalidSearch").innerHTML = "Please search for an ingredient"
            }
            // If not empty then the search begins
            else {
            let found = false;
            
            for (let i in drinksArray) {
                let allDrinkIngredients = []
                // chaning object values into upper case string for searching
                let ObjValsArray = Object.values(drinksArray[i])
                let ObjsValsArrayJoined = ObjValsArray.join(' ')
                let ObjsValsArrayJoinedUpperCase = ObjsValsArrayJoined.toUpperCase()

                if (ObjsValsArrayJoinedUpperCase.includes(userSearchUpperCase)) {
                    found = true;
                    foundDrinkId = Object.values(drinksArray[i].idDrink)
                    console.log(foundDrinkId)
                    let anotherDrinkArray = Array.from(foundDrinkId)
                    let foundDrinkIdJoined = anotherDrinkArray.join('')
                    console.log("the found drink's ID is " + foundDrinkIdJoined)

                    if (drinksArray[i].idDrink === foundDrinkIdJoined) {
                        console.log(drinksArray[i])
                        // Creating the card like in previous functions
                        if ('content' in document.createElement('template')) {

                            for (let k in strIngredientKeys) {
                                if (drinksArray[i][strIngredientKeys[k]] != null && drinksArray[i][strMeasureKeys[k]] != null) {
                                    allDrinkIngredients.push(" " + drinksArray[i][strIngredientKeys[k]] + " " + drinksArray[i][strMeasureKeys[k]])
                                }
                            }
                            addSurpriseCard(drinksArray[i].strDrink, drinksArray[i].strInstructions, allDrinkIngredients, drinksArray[i].strDrinkThumb)
                        }

                    }
                    
                }
            }
            if (!found){
                document.getElementById("invalidSearch").innerHTML = userSearch + " was not  found in any of our cocktails!"
            }

        }
    }
    )
}

// Trying to add function of pressing enter key to search
// document.getElementById('searchInput').addEventListener("keypress", function(event) {
//     // If the user presses the "Enter" key on the keyboard
//     if (event.key === "Enter") {
//       // Trigger the button element with a click
//       document.getElementById("searchButton").click();
//     }
//   });

// Lee's way of getting rid of the stuff you dont wanna see anymore
// document.getElementById('card-list').replaceChildren();
