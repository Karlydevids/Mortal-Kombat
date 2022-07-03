const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button')
const player1 = {
    player: 1,
    name: "Scorpion",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["sword","gun"],
    attack: function (name) {
        console.log(name + " " + " Fight...")
    }
}

const player2 = {
    player: 2,
    name: "Conor",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["fist","leg"],
    attack: function (name) {
        console.log(name + " " + " Fight...")
    }
}

function createElement(tag, className){
    const $tag = document.createElement(tag);
    if(className) {
    $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer( playerObj) {
    const $player = createElement('div', `player${playerObj.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${playerObj.hp}%`;
    $name.innerText = playerObj.name;
    $img.src = playerObj.img

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $character.appendChild($img);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
   
    return $player
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= randomHP(20);
    if(player.hp <=0){
        player.hp = 0
    } 
    console.log(player.hp)
   
    $playerLife.style.width = player.hp + '%';
   
    
}

function randomHP(num) {
    return Math.ceil(Math.random()*num)
    
}

function playerWins(name){
    const $loseTitle = createElement('div', 'loseTitle');
    if(name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'draw';
    }
    

    return $loseTitle;
}
$randomButton.addEventListener('click', function () {
    changeHP(player1);
    changeHP(player2);

    if(player1.hp === 0 || player2.hp === 0){
        $randomButton.disabled = true;
    }

    if(player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp){
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWins());
    } 
});

$arenas.appendChild(createPlayer( player1 ));
$arenas.appendChild(createPlayer( player2 ));