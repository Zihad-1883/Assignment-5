const cardsContainer = document.getElementById('cards-container');
const issuesCounter = document.getElementById('issues-counter');
const buttonsContainer = document.getElementById('buttons-container');


async function loadcards(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data);

    // getting buttons
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = `
        <div class="bg-white shadow-xl p-6 mt-15 mb-4 w-3/4 mx-auto rounded-md space-x-4">
          <button class=" btn btn-primary">All</button>
          <button onclick="selectButton()" class="buttons btn btn-outline">Open</button>
          <button onclick="selectButton()" class="buttons btn btn-outline">Closed</button>
        </div>
    `
    buttonsContainer.appendChild(buttonDiv)


    // getting cards
    data.data.forEach(card => {
        // console.log(card)
        const newCard = document.createElement('div');
        newCard.innerHTML = `
            <div class="bg-white shadow-xl p-4 border-t-5 rounded-md ${card.status === "open" ? "border-t-[#00A96E]" : "border-t-purple-600"}">
                <div class="flex justify-between items-center mb-3">
                    <img src="${statusIcon()}" alt="${statusIcon()}">
                    <span id = "priority-span" class="text-[#EF4444] bg-[#FEECEC] px-5 py-1 rounded-xl ${priorityLogic()} ">${card.priority}</span>
                </div>
                <h2 class="font-semibold mb-2">${card.title}</h2>
                <p class="text-[12px] text-[#64748B] mb-3 line-clamp-2">${card.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    <button class="flex justify-center items-center gap-[2px] text-[#EF4444] bg-[#FEECEC] px-5 py-1 border rounded-2xl"><img src="./assets/BugDroid.png" alt="">${card.labels[0]}</button>
                    <button class="flex justify-center items-center gap-[2px] text-[#D97706] bg-[#fcf5d9] px-5 py-1 border rounded-xl"><img src="./assets/BugDroid.png" alt="">${card.labels[1]}</button>
                </div>
                <hr>
                <p class="mt-4 mb-2 text-[#64748B]">#1 by ${card.author}</p>
                <p class="mb-4 text-[#64748B]">${card.createdAt}</p>
            </div>
        `
        // console.log(card.title)
        cardsContainer.appendChild(newCard)




        // issues counter
        issuesCounter.innerText = cardsContainer.children.length + " Issues"

         // priority logic
        function priorityLogic(){
            const prioritySpan = document.getElementById('priority-span')
            if(card.priority === "high"){
                return "text-[#EF4444] bg-[#FEECEC]"
            }
            else if(card.priority === "medium"){
                return "text-[#F59E0B] bg-[#FFF6D1]"
            }
            else{
                return "text-white bg-black opacity-35"
            }
        }
   
        // status icon logic
        function statusIcon(){
            if(card.status === "open"){
                return "./Open-Status.png"
            }
            else{
                return "./assets/Closed-Status.png"
            }
        }
   
    });

}

loadcards();

async function selectButton(){
    const buttons = document.querySelectorAll('#buttons-container button');
    buttons.forEach(button => {
        button.classList.add('btn-outline');
        button.classList.remove('btn-primary')
    })

    buttons.classList.add('btn-primary');
    buttons.classList.remove('btn-outline');
}



