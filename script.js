let projects = [];

const projectList = document.getElementsByClassName("project-list-container")[0];
let btnAdd = document.getElementById("submitButton");
let nameInput = document.getElementById("projectName");
let textInput = document.getElementById("projectText");
let projectDisplayList = document.getElementById("projectList");


function buttonFunction() {
    projectList.innerHTML=""; // so that the elements aren't readded to the container
    projects.forEach((project, index) => {
        let itemHR = document.createElement("HR"); // horizontal line
        let itemP = document.createElement("p"); // creates a <p> element
        let itemPText = document.createTextNode(`${project.name}:${project.text}`); // node holds the details (div, p) of an element
            // we need `${} as it is a variable that we are displaying
        itemP.appendChild(itemPText);
        projectList.appendChild(itemP); // adds the <p> element to the projectList html element
        projectList.appendChild(itemHR);
    });
}

// I think I can't add lines as this is a list and it just can't take line elements. I should put it in a regualr container instead (for grid)
// perhaps I can add another element that is just a line to the list....
function addProjects() {
    let template = projects.map(project => `<li>${project.name}: ${project.text}</li>`).join('\n');
    projectDisplayList.innerHTML = template; // ul is an unordered listso we are just setting ul html to the template to display it
}

btnAdd.addEventListener('click', () => {
    if(nameInput.value.length != 0 || textInput.value.length != 0) 
    {
        projects.push({name: nameInput.value, text: textInput.value});
        nameInput.value="";
        textInput.value="";
        //addProjects();

        projectList.innerHTML=""; // so that the elements aren't readded to the container
        projects.forEach((project, index) => {
            let itemHR = document.createElement("HR"); // horizontal line
            let itemP = document.createElement("div"); // creates a <div> element. <p> makes them have a space as its a paragraph
            let itemP2 = document.createElement("div"); // so that the text is on a seperate line
            let div = document.createElement("div");
            let itemPText = document.createTextNode(`Project Name: ${project.name}`); // node holds the details (div, p) of an element
                // we need `${} as it is a variable that we are displaying
                // let itemPText = document.createTextNode(`${project.name}: ${project.text}`);
            let itemPText2 = document.createTextNode(`Project Description: ${project.text}`);
            itemP.appendChild(itemPText);
            itemP2.appendChild(itemPText2);
            div.appendChild(itemP);
            div.appendChild(itemP2);
            //projectList.appendChild(itemP); // adds the <p> element to the projectList html element
            //projectList.appendChild(itemP2);
            div.className='objectDiv'; // this allows to call via the objectDiv class in css to set how each element looks
            projectList.appendChild(div);
            //projectList.appendChild(itemHR);
        });
    }
});