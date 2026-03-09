const cardsContainer = document.getElementById('cards-container');
const issuesCounter = document.getElementById('issues-counter');
const buttonsContainer = document.getElementById('buttons-container');
const loading = document.getElementById('loading')
const cardDetailsModal = document.getElementById('card-details-modal')

function showLoading(){
    cardsContainer.innerHTML = ""
    loading.classList.remove('hidden');
    cardsContainer.classList.add('hidden')
}

function hideLoading(){
    loading.classList.add('hidden')
    cardsContainer.classList.remove('hidden')
}


async function displayModal(cardId){

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`)
    const data = await res.json()
    console.log(data)
    console.log(cardId);


    const clicked = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const clickedData = await clicked.json();
    // console.log(clickedData)


    const detailsContainer = document.getElementById('detailsContainer');
    const modalDiv = document.createElement('div');
    detailsContainer.innerHTML = ""
    modalDiv.innerHTML = `
         <div class="p-8">
    <h1 class="text-2xl font-bold mb-1">${data.data.title}</h1>
    <div class="flex items-center space-x-4 mb-6">
      <span class="bg-[#00A96E] text-[12px] text-white px-2 py-1 rounded-full">Opened</span>
      <img src="./assets/Ellipse 5.png" alt="">
      <p class="text-[#64748B] text-[12px]">Opened by Fahim Ahmed</p>
      <img src="./assets/Ellipse 5.png" alt="">
      <p class="text-[#64748B] text-[12px]">22/02/2026</p>
    </div>
    <div class="flex items-center gap-1 mb-6">
      <span class="flex justify-center items-center gap-[2px] bg-[#FECACA] text-[#EF4444] text-[12px] py-1 px-2 rounded-full"><img src="./assets/BugDroid.png" alt="">BUG</span><span class="flex justify-center items-center gap-[2px] bg-[#FDE68A] text-[#D97706] text-[12px] py-1 px-2 rounded-full"><img src="./assets/Lifebuoy.png" alt="">HELP WANTED</span>
    </div>
    <p class="text-[#64748B] mb-6">${data.data.description}</p>
    <div class="bg-[#f9fafc] grid grid-cols-2 justify-around items-center p-4">
        <div>
          <p class="text-[#64748B]">Assignee:</p>
          <h5 class="font-semibold">Fahim Ahmed</h5>
        </div>
        <div>
          <p class="text-[#64748B]">Priority:</p>
          <span class="bg-[#EF4444] text-[12px] text-white px-3 py-1 rounded-full">${data.data.priority}</span>
        </div>
    </div>
 </div>
    `
    detailsContainer.appendChild(modalDiv)
    my_modal_5.showModal()
    
}


               // priority logic
        function priorityLogic(priority){
            const prioritySpan = document.getElementById('priority-span')
            if(priority === "high"){
                return "text-[#EF4444] bg-[#FEECEC]"
            }
            else if(priority === "medium"){
                return "text-[#F59E0B] bg-[#FFF6D1]"
            }
            else{
                return "text-white bg-black opacity-35"
            }
        }
   
        // status icon logic
        function statusIcon(status){
            if(status === "open"){
                return "./Open-Status.png"
            }
            else{
                return "./assets/Closed-Status.png"
            }
        }



async function loadcards(){
    // getting and toggling buttons 
    const allBtn = document.createElement('button');
    allBtn.textContent = "All"
    allBtn.className = "btn btn-primary"
    buttonsContainer.appendChild(allBtn)

    const openBtn = document.createElement('button');
    openBtn.textContent = "Open"
    openBtn.className = "btn btn-outline"
    buttonsContainer.appendChild(openBtn)


    const closeBtn = document.createElement('button');
    closeBtn.textContent = "Close"
    closeBtn.className = "btn btn-outline"
    buttonsContainer.appendChild(closeBtn)

    const allButtons = [allBtn,openBtn,closeBtn];
    allButtons.forEach(button => {
        button.addEventListener('click',function(){
            allButtons.forEach(btn => {
                btn.classList.add('btn-outline');
                btn.classList.remove('btn-primary')
            })
            button.classList.add('btn-primary');
            button.classList.remove('btn-outline');
        })
    })    


    showLoading()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data);

    // getting cards
    data.data.forEach(card => {
        // console.log(card)
        const newCard = document.createElement('div');
        newCard.innerHTML = `
            <div onclick = "displayModal(${card.id})" class="bg-white shadow-xl p-4 border-t-5 rounded-md ${card.status === "open" ? "border-t-[#00A96E]" : "border-t-purple-600"}">
                <div class="flex justify-between items-center mb-3">
                    <img src="${statusIcon(card.status)}" alt="${statusIcon(card.status)}">
                    <span id = "priority-span" class="text-[#EF4444] bg-[#FEECEC] px-5 py-1 rounded-xl ${priorityLogic(card.priority)} ">${card.priority}</span>
                </div>
                <h2 class="text-[14px] font-semibold mb-2">${card.title}</h2>
                <p class="text-[12px] text-[#64748B] mb-3 line-clamp-2">${card.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    <button class="flex justify-center items-center gap-[2px] text-[#EF4444] bg-[#FEECEC] px-3 py-1 border rounded-2xl"><img src="./assets/BugDroid.png" alt="">${card.labels[0]}</button>
                    <button class="flex justify-center items-center gap-[2px] text-[#D97706] bg-[#fcf5d9] px-3 py-1 border rounded-xl ${card.labels[1] === undefined ? "hidden" : "flex"}"><img src="${card.labels[1] !== undefined ? "./assets/BugDroid.png": ""}" alt="">${card.labels[1] !== undefined ? card.labels[1] : ""}</button>
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
      



    
        // open button
        openBtn.addEventListener('click',() => {
            showLoading()
            cardsContainer.innerHTML = ""
            data.data.forEach(card => {
            if(card.status === "open"){
                        const newCard = document.createElement('div');
            newCard.innerHTML = `
                <div onclick = "my_modal_5.displayModal()" class="bg-white shadow-xl p-4 border-t-5 rounded-md ${card.status === "open" ? "border-t-[#00A96E]" : "border-t-purple-600"}">
                    <div class="flex justify-between items-center mb-3">
                        <img src = "./Open-Status.png">
                        <span id = "priority-span" class="text-[#EF4444] bg-[#FEECEC] px-5 py-1 rounded-xl ${priorityLogic(card.priority)} ">${card.priority}</span>
                    </div>
                    <h2 class="text-[14px] font-semibold mb-2">${card.title}</h2>
                    <p class="text-[12px] text-[#64748B] mb-3 line-clamp-2">${card.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <button class="flex justify-center items-center gap-[2px] text-[#EF4444] bg-[#FEECEC] px-3 py-1 border rounded-2xl"><img src="./assets/BugDroid.png" alt="">${card.labels[0]}</button>
                        <button class="flex justify-center items-center gap-[2px] text-[#D97706] bg-[#fcf5d9] px-3 py-1 border rounded-xl"><img src="./assets/BugDroid.png" alt="">${card.labels[1]}</button>
                    </div>
                    <hr>
                    <p class="mt-4 mb-2 text-[#64748B]">#1 by ${card.author}</p>
                    <p class="mb-4 text-[#64748B]">${card.createdAt}</p>
                </div>
            `
            // console.log(card.title)
            cardsContainer.appendChild(newCard)
            
        
            }
        })
        // issues counter
        issuesCounter.innerText = cardsContainer.children.length + " Issues"
        hideLoading()


        })
   

        // close button
        closeBtn.addEventListener('click',() => {
            cardsContainer.innerHTML = ""
            data.data.forEach(card => {
                if(card.status === "closed"){
                            const newCard = document.createElement('div');
                newCard.innerHTML = `
                    <div onclick = "my_modal_5.displayModal()" class="bg-white shadow-xl p-4 border-t-5 rounded-md ${card.status === "open" ? "border-t-[#00A96E]" : "border-t-purple-600"}">
                        <div class="flex justify-between items-center mb-3">
                            <img src="./assets/Closed-Status.png">
                            <span id = "priority-span" class="text-[#EF4444] bg-[#FEECEC] px-5 py-1 rounded-xl ${priorityLogic(card.priority)} ">${card.priority}</span>
                        </div>
                        <h2 class="text-[14px] font-semibold mb-2">${card.title}</h2>
                        <p class="text-[12px] text-[#64748B] mb-3 line-clamp-2">${card.description}</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <button class="flex justify-center items-center gap-[2px] text-[#EF4444] bg-[#FEECEC] px-3 py-1 border rounded-2xl"><img src="./assets/BugDroid.png" alt="">${card.labels[0]}</button>
                            <button class="flex justify-center items-center gap-[2px] text-[#D97706] bg-[#fcf5d9] px-3 py-1 border rounded-xl"><img src="./assets/BugDroid.png" alt="">${card.labels[1]}</button>
                        </div>
                        <hr>
                        <p class="mt-4 mb-2 text-[#64748B]">#1 by ${card.author}</p>
                        <p class="mb-4 text-[#64748B]">${card.createdAt}</p>
                    </div>
                `
                // console.log(card.title)
                cardsContainer.appendChild(newCard)
                
                }
            })
            
        // issues counter
        issuesCounter.innerText = cardsContainer.children.length + " Issues"

        })


        // all button
        allBtn.addEventListener('click',() => {
            cardsContainer.innerHTML = ""
            data.data.forEach(card => {
                const newCard = document.createElement('div');
                newCard.innerHTML = `
                <div onclick = "my_modal_5.displayModal(${card.id})" class="bg-white shadow-xl p-4 border-t-5 rounded-md ${card.status === "open" ? "border-t-[#00A96E]" : "border-t-purple-600"}">
                <div class="flex justify-between items-center mb-3">
                    <img src="${statusIcon(card.status)}" alt="${statusIcon(card.status)}">
                    <span id = "priority-span" class="text-[#EF4444] bg-[#FEECEC] px-5 py-1 rounded-xl ${priorityLogic(card.priority)} ">${card.priority}</span>
                </div>
                <h2 class="text-[14px] font-semibold mb-2">${card.title}</h2>
                <p class="text-[12px] text-[#64748B] mb-3 line-clamp-2">${card.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    <button class="flex justify-center items-center gap-[2px] text-[#EF4444] bg-[#FEECEC] px-3 py-1 border rounded-2xl"><img src="./assets/BugDroid.png" alt="">${card.labels[0]}</button>
                    <button class="flex justify-center items-center gap-[2px] text-[#D97706] bg-[#fcf5d9] px-3 py-1 border rounded-xl"><img src="./assets/BugDroid.png" alt="">${card.labels[1]}</button>
                </div>
                <hr>
                <p class="mt-4 mb-2 text-[#64748B]">#1 by ${card.author}</p>
                <p class="mb-4 text-[#64748B]">${card.createdAt}</p>
            </div>
            `
            // console.log(card.title)
            cardsContainer.appendChild(newCard)
        })
        // issues counter
        issuesCounter.innerText = cardsContainer.children.length + " Issues"
        })


    });
  hideLoading()
}

loadcards();



