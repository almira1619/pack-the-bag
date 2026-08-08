// ==========================

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

const playBtn = document.getElementById("playBtn");

const task = document.getElementById("task");
const progress = document.getElementById("progress");

// ==========================

const items = [

{
name:"pen",
el:document.getElementById("pen")
},

{
name:"pencil",
el:document.getElementById("pencil")
},

{
name:"ruler",
el:document.getElementById("ruler")
},

{
name:"rubber",
el:document.getElementById("rubber")
},

{
name:"book",
el:document.getElementById("book")
},

{
name:"folder",
el:document.getElementById("folder")
},

{
name:"pencil case",
el:document.getElementById("pencilCase")
}

];

let current = 0;

// ==========================

playBtn.onclick = () => {

startScreen.style.display = "none";
gameScreen.style.display = "block";

// Перемешать предметы
items.sort(() => Math.random() - 0.5);

placeItems();

nextTask();

};

// ==========================

function placeItems(){

    const isMobile = window.innerWidth < 768;

    if(isMobile){

        // 2 ряда для телефона

        const positions = [

            {x:8,y:52},
            {x:32,y:52},
            {x:56,y:52},
            {x:80,y:52},

            {x:20,y:70},
            {x:44,y:70},
            {x:68,y:70}

        ];

        // немного перемешиваем места
        positions.sort(()=>Math.random()-0.5);

        items.forEach((item,index)=>{

            item.el.style.left = positions[index].x + "%";
            item.el.style.top = positions[index].y + "%";

        });

    }else{

        // Компьютер

        const positions = [

            {x:8,y:48},
            {x:22,y:58},
            {x:36,y:50},
            {x:50,y:60},
            {x:18,y:72},
            {x:42,y:74},
            {x:60,y:68}

        ];

        positions.sort(()=>Math.random()-0.5);

        items.forEach((item,index)=>{

            item.el.style.left = positions[index].x + "%";
            item.el.style.top = positions[index].y + "%";

        });

    }

}

// ==========================

function nextTask(){

if(current >= items.length){

finishGame();

return;

}

task.innerHTML =
"Put the " + items[current].name + " in the bag!";

progress.innerHTML =
current + " / " + items.length;

speak(task.innerText);

}

// ==========================

function speak(text){

speechSynthesis.cancel();

const speech =
new SpeechSynthesisUtterance(text);

speech.lang = "en-US";

speech.rate = 0.9;

speech.pitch = 1;

speechSynthesis.speak(speech);

}

// ==========================

function finishGame(){

    closeBag();

    launchConfetti();

    document.getElementById("win").play();

    setTimeout(()=>{

        document.getElementById("finishScreen").style.display="flex";

    },700);

}

// ==========================

document.getElementById("restartBtn").onclick=()=>{

location.reload();

};

// ==========================
// CLICK EVENTS
// ==========================

items.forEach(item => {

    item.el.onclick = () => {

        if (item.name === items[current].name) {

            correctAnswer(item);

        } else {

            wrongAnswer(item);

        }

    };

});

// ==========================

function correctAnswer(item){

    document.getElementById("ding").play();
showStar();

    item.el.style.pointerEvents = "none";

    flyToBag(item.el);

}

// ==========================

function wrongAnswer(item){

    document.getElementById("wrong").play();

    item.el.animate([

        {transform:"translateX(-8px)"},

        {transform:"translateX(8px)"},

        {transform:"translateX(-8px)"},

        {transform:"translateX(0px)"}

    ],{

        duration:300

    });

}

// ==========================

function flyToBag(element){

    const bag = document.getElementById("bag");

    const bagRect = bag.getBoundingClientRect();

    element.style.transition = "all .8s ease-in-out";

element.style.left = (bagRect.left + bagRect.width / 2 - 25) + "px";
element.style.top = (bagRect.top + bagRect.height / 2 - 25) + "px";

element.style.transform = "scale(0.2) rotate(15deg)";
element.style.opacity = "0.2";

    setTimeout(()=>{

        element.style.display = "none";
element.style.transform = "scale(1)";
element.style.opacity = "1";

        current++;

        progress.innerHTML = current + " / " + items.length;

        nextTask();

    },800);

}

function showStar(){

    const bag = document.getElementById("bag");
    const star = document.getElementById("star");

    const rect = bag.getBoundingClientRect();

    star.style.left = (rect.left + rect.width / 2 - 25) + "px";
    star.style.top = (rect.top + 20) + "px";

    star.style.opacity = "1";
    star.style.transform = "scale(1.6)";

    setTimeout(() => {

        star.style.opacity = "0";
        star.style.transform = "scale(1)";

    }, 350);

}

function launchConfetti(){

    const colors = [
        "#ff4d4d",
        "#4CAF50",
        "#FFD93D",
        "#4285F4",
        "#ff66cc",
        "#00c2ff"
    ];

    const box = document.getElementById("confetti");

    for(let i=0;i<120;i++){

        const c = document.createElement("div");

        c.className="confetti";

        c.style.left=Math.random()*100+"vw";
        c.style.background=colors[Math.floor(Math.random()*colors.length)];
        c.style.animationDelay=Math.random()*0.8+"s";
        c.style.transform="rotate("+Math.random()*360+"deg)";

        box.appendChild(c);

        setTimeout(()=>c.remove(),4000);

    }

}

function closeBag(){

    const bag = document.getElementById("bag");

    bag.animate([

        {transform:"translateY(0px) scale(1)"},
        {transform:"translateY(-15px) scale(1.08)"},
        {transform:"translateY(0px) scale(1)"}

    ],{

        duration:450

    });

    setTimeout(()=>{

        bag.src="images/bag-closed.png";

    },220);

}
