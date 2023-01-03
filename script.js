let projects = [
    {
        id: 0,
        name: '¿Tú qué crees?',
        text: 'What do you believe?'
    },
    {
        id: 1,
        name: 'En mi opinión...',
        text: 'In my opinion...'
    },
    {
        id: 2,
        name: 'Desde mi punto de vista...',
        text: 'From my point of view...'
    },
    {
        id: 3,
        name: 'Creo que deberías...',
        text: 'I think you ought to'
    }
]; // array that holds card objects

// webpage will stop working an element in incorrectly defined
let btnAdd = document.getElementById("submitButton");
let nameInput = document.getElementById("projectName");
let textInput = document.getElementById("projectText");
let projectDisplayList = document.getElementById("projectList");
let displayCards = document.getElementById("display-card-button");
let cardGrid = document.getElementsByClassName("card-grid")[0]; // class name needs [0] for some reason
let projectForm = document.getElementById("projectForm");
let displayCardArea = document.getElementsByClassName("display-cards")[0];
let quizCard = document.getElementsByClassName("displayed-card")[0];
let editBool = false;
cardId = 4;


btnAdd.addEventListener('click', () => { 
    if(nameInput.value.length != 0 || textInput.value.length != 0) // corresponds to html submit button. Requires both form fields to have content
    {
        if(!editBool) { // if the card is not being edited, add a new object to the card array
            projects.push({id: cardId, name: nameInput.value, text: textInput.value});
            nameInput.value="";
            textInput.value="";
            cardId++;
        }
    }
});

// quiz page functionality. On click the cards text content is changed to the next object in the car array
// BREAKS AFTER A CARD IS DELETED
    // breaks as the id of the card is deleted, thus ids are: 1, 2, 4. Id 3 is skipped and thus it is not rendered on te card
    // fix so that Ids are changed when a card is deleted. Create a method almost like the ArrayList class
    // project.length is also being reached before the final card is found. Perhaps use the largest id rather than projects.length
var pos = 0;
var cardName = document.getElementById('card-name'); 
var cardText = document.querySelector('#card-text');
// var cardContainer = document.getElementById('displaying-card');
displayCards.addEventListener('click', () => {
    cardName.textContent = projects[pos].name;
    cardText.textContent = projects[pos].text;
    pos++;
    if(pos >= projects.length) {
        pos = 0;
    }
})
// show/hide quiz card answers
quizCard.addEventListener("click", () => {
    // cardContainer.classList.toggle("hide");
    if (isvisible(cardName) && !isvisible(cardText)) {
        cardName.style.display = "none";
        cardText.style.display = "inline";
        console.log("hidden")
    } else if(!isvisible(cardName) && isvisible(cardText)) {
        cardName.style.display = "inline";
        cardText.style.display = "none";
        console.log("visible")
    }
})
function isvisible(obj) {
    return obj.offsetWidth > 0 && obj.offsetHeight > 0;
}

// card grid functionality. The for each loop makes it so the cards index does not need to be tracked in order to edit the card or delete
function showGrid() {
    cardGrid.innerHTML=""; // so that cards aren't readded to the container
    projects.forEach((project) => {
        let card = document.createElement("div");
        card.innerHTML += `<p class="name-div">Name: ${project.name}</p>`;

        //text
        var displayText = document.createElement("p"); // document.createElement should be used rather than explicitely creating the element
        displayText.classList.add("text-div", "hide");
        displayText.innerText="Text: " + project.text; // adds project object text variable to <p> element

        // creates a link that can be clicked. The entire card is the link rather than text
        card.setAttribute("href", "#");
        card.addEventListener("click", () => {
            displayText.classList.toggle("hide");
        });

        //card.appendChild(link);
        card.appendChild(displayText); // text is appened to the card div element whcih holds the project name

        card.className="grid-card-shown";
        cardGrid.appendChild(card); // card grid is the container for holding the cards in the frid

        // edit cards
        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        var editButton = document.createElement("button");
        editButton.setAttribute("class", "edit"); // class name that can be accessed elsewhere such as in CSS
        editButton.addEventListener("click", () => {
            tempId = project.id; // project.id is changing back to the original in btnAdd event listener. Thus it is stored here
            projectForm.classList.remove("hide"); // shows the form so new text can be added
            editBool = true; // editBool is required so that a new card is not created

            btnAdd.addEventListener('click', () => { 
                if(editBool) { // editBool is now true, thus a new card is not added
                    nameEdit = nameInput.value;
                    textEdit = textInput.value;
                    nameInput.value="";
                    textInput.value="";
                    editBool = false;

                    projects[tempId].name = nameEdit;
                    projects[tempId].text = textEdit; 
                    projectForm.classList.add("hide"); // hides the input form once more
                    showGrid(); // showGrid is called to reload the page to display the updates to the projects array
                }
            })
        })

        // delete
        var deleteButton = document.createElement("button"); // document.createElement() is better than explicitly creating the element
        deleteButton.setAttribute("class", "delete");
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        card.appendChild(buttonContainer);

        deleteButton.addEventListener("click", () => {
            delete projects[project.id];
            showGrid();
        })
    })
}

// functionaliity for the nav element
let homeNavigation = document.getElementById("homeNavigation");
let quizNavigation = document.getElementById("quizNavigation");
let gridNavigation = document.getElementById("gridNavigation");

homeNavigation.addEventListener("click", () => {
    projectForm.classList.remove("hide");
    cardGrid.classList.add("hide");
    displayCardArea.classList.add("hide");
    // projectForm.classList.toggle("hide"); 
})
quizNavigation.addEventListener("click", () => {
    projectForm.classList.add("hide");
    cardGrid.classList.add("hide");
    displayCardArea.classList.remove("hide");
})
gridNavigation.addEventListener("click", () => {
    projectForm.classList.add("hide");
    cardGrid.classList.remove("hide");
    displayCardArea.classList.add("hide");
    showGrid(); // called to reload the page
})
