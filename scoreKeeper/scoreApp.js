//player1 attributions
const p1 = {
    score: 0 ,
    button: document.getElementById('p1Button') ,
    display: document.getElementById('p1Display') ,
}
//player2 attributions
const p2 = {
    score: 0 ,
    display: document.getElementById('p2Display'),
    button: document.getElementById('p2Button'),
}

const reset = document.querySelector('#reset');
const winningScoreSelect = document.getElementById('playTo'); 

let winningScore = 3;
let isGameOver = false;

//function for updates scores until one of the user reach to the winner score.
function updatesScores(player, opponent){
    if (!isGameOver){
        player.score +=1;
        if(player.score === winningScore){
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;

        };
        player.display.textContent = player.score;
    };
}

//event listener for updating player1 score
p1Button.addEventListener('click', function(){
    updatesScores(p1,p2);
})

//event listener for updating player2 score
p2Button.addEventListener('click', function(){
    updatesScores(p2,p1);
})

//after one player reach the winning score, reset the displays.
winningScoreSelect.addEventListener('change',function() {
    winningScore = parseInt(this.value);
    resetScores();
});

//after one player click the reset button, reset the displays.
reset.addEventListener('click',resetScores);

//reset displays function.
function resetScores(){
    isGameOver = false;
    for (let p of [p1,p2]){
        p.score = 0 ;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success','has-text-danger');
        p.button.disabled = false;
    }
}

