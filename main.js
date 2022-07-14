const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button')
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: "Scorpion",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["sword","gun"],
    attack,
    changeHP,
    elHP,
    renderHP,
}

const player2 = {
    player: 2,
    name: "Conor",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["fist","leg"],
    attack, 
    changeHP,
    elHP,
    renderHP,
}

function attack (name) {
    console.log(name + " " + " Fight...")
}

function createElement(tag, className){
    const $tag = document.createElement(tag);
    if(className) {
    $tag.classList.add(className);
    }

    return $tag;
}

function createReloadButton(){
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = "Restart";
   

    $reloadButton.addEventListener('click', function () {
        window.location.reload()
    });  
   
    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
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

function elHP() {
    return  document.querySelector('.player' + this.player + ' .life');
}

function changeHP(randomNumber) {
    
    this.hp -= randomNumber
    if(this.hp <=0){
        this.hp = 0
    } 
}

function renderHP(){
    this.elHP().style.width = this.hp + '%';
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
    player1.changeHP(randomHP(20));
    player2.changeHP(randomHP(20));
    player1.renderHP(player1.elHP());
    player2.renderHP(player2.elHP());
});

$arenas.appendChild(createPlayer( player1 ));
$arenas.appendChild(createPlayer( player2 ));

function enemyAttack() {
    const hit = ATTACK[randomHP(3) - 1];
    const defence = ATTACK[randomHP(3) - 1];

    return {
        value: randomHP(HIT[hit]),
        hit,
        defence,
    }
  
}

function playerAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = randomHP(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        
        item.checked = false;
    }

    return attack;
}

function showResult() {
    if(player1.hp === 0 || player2.hp === 0){
        $randomButton.disabled = true;
        createReloadButton()
    }

    if(player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp){
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWins());
    } 
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
    }

    
    if (enemy.defence !== player.hit) {
        player2.changeHP(enemy.value);
        player2.renderHP();
    }
    
    showResult();
})
  
