"use strict"
//flagが勝つのときpenguinsのターン、負けの時bearのターン
let flag = "pen-flag";

//ターン数カウンター
let counter = 9;
//class ="square"を取得
const squares = document.getElementsByClassName("square");

//Array に変換
//https://developer.mozilla.org/ja/docs/Web/JavaScript/Referance/Global_Objects/Array/from
const squaresArray = Array.from(squares);


//squares の要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//NewGameボタン取得
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");
// Win or Lose Judgment Line
const line1 = JudgeLine(squaresArray,["a_1", "a_2", "a_3"]);
const line2 = JudgeLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgeLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgeLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgeLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgeLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgeLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgeLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;
//メッセージ
const msgtxt1 = '<p class ="image"><img src = "img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack!(your turn)</p>';
const msgtxt2 = '<p class ="image"><img src = "img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack!(computer turn)</p>';
const msgtxt3 = '<p class ="image"><img src = "img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class ="image"><img src = "img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtxt5 = '<p class ="image"><img src = "img/penguins.jpg" width=61px height=61px><img src = "img/whitebear.jpg" width=61px height=61px></p><p class = "text animate__bounceIn">Draw!!</p>';

//サウド
let gameSound = ["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"];

//ページ本体が読み込まれたタイミングで実行する
window.addEventListener("DOMContentLoaded",
function(){
        setMessage("pen-turn");
        //squareがクリック可能かを判断するクラスを追加
        squaresArray.forEach(function(square){
            square.classList.add("js-clickable");
        })
    },false
);
// Win or Lose Judgment Line配列化
function JudgeLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

//square をクリックしたときにイベント
squaresArray.forEach(function(square){
    square.addEventListener('click',()=>{
        let gameOverFlg =isSelect(square);
        //GameOver
        if (gameOverFlg==="0"){
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function(){
                    bearTurn();
                },
                "2000"
            );
        }
    });
});
// a_1.addEventListener("click",
// function(){
//         isSelect(a_1);
//     },false
// );
// //上記のコーディングと下記のコーディングは同じ意味
// a_2.addEventListener("click",() => {
//     isSelect(a_2);
// });

// a_3.addEventListener("click",() => {
//     isSelect(a_3);
// });

// b_1.addEventListener("click",() => {
//     isSelect(b_1);
// });

// b_2.addEventListener("click",() => {
//     isSelect(b_2);
// });

// b_3.addEventListener("click",() => {
//     isSelect(b_3);
// });

// c_1.addEventListener("click",() => {
//     isSelect(c_1);
// });

// c_2.addEventListener("click",() => {
//     isSelect(c_2);
// });

// c_3.addEventListener("click",() => {
//     isSelect(c_3);
// });

//クリックしたsquareにはpenguins がbearを表示

function isSelect(selectSquare){
    let gameOverFlg ="0";
    if(flag === "pen-flag"){
        //クリックサウド
        let music = new Audio(gameSound[0]);
        music.currentTime=0;
        music.play();

    selectSquare.classList.add("js-pen-checked");
    selectSquare.classList.add("js-unclickable");
    selectSquare.classList.remove("js-clickable");

    //penguins win
    if(isWinner("penguins")){
    setMessage("pen-win");
    gameOver("penguins");
    return gameOverFlg="1";
    }
    setMessage("bear-turn");
    flag = "bear-flag";
} else {
    //クリックサウド
    let music = new Audio(gameSound[1]);
    music.currentTime = 0;
    music.play();
    selectSquare.classList.add("js-bear-checked");
    selectSquare.classList.add("js-unclickable");
    selectSquare.classList.remove("js-clickable");
    
    //white-bear win
    if (isWinner("bear")){
        setMessage("bear-win");
        gameOver ("bear");
        return gameOverFlg ="1";
    }
    setMessage("pen-turn");
    flag = "pen-flag";
} 
//ターン数カウンターを-1する
    counter--;
//ターン数＝０になったらDraw
    if (counter === 0){
        setMessage("draw");
       gameOver("draw");
       return gameOverFlg = "1";
    }
    return gameOverFlg ="0";
}    

//しょうはい,はんてい
// classListの使い方まとめ：https://giita.com/tomokichi ruby/items/2460c5902d19b81case5
function isWinner(symbol){
   //some: 1つでも条件を 満たしていればTrueを返す
   const result = lineArray.some(function(line){
   //every: 全て条件を満たしていればTrueを返す    
   const subResult = line.every(function (square){
       if (symbol ==="penguins"){
           return square.classList.contains("js-pen-checked");
       }
       if (symbol === "bear" ) {
           return square.classList.contains("js-bear-checked");
       }
       });
    //tureを返したlineを winningLineに代入
    if (subResult){winningLine = line}
    
    return subResult;
   });
   return result;
}
//メッセージ切り替え関数
function setMessage(id){
    switch(id){
        case "pen-turn": 
            document.getElementById("msgtext").innerHTML=msgtxt1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;    
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML=msgtxt3;
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML=msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML=msgtxt5;
            break;
        default:
        document.getElementById("msgtext").innerHTML=msgtxt1;
    }
}
//ゲーム終了時の処理
function gameOver(status){
    //GameOver サウド
    let w_sound
    switch (status) {
        case "penguins":
            w_sound=gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound= gameSound[4];
            break;
    }
     
    let music = new Audio (w_sound);
    music.currentTime = 0;
    music.play();
    //all square unclickable
    // squaresArray.forEach(function (square){
    //     square.classList.add("js-unclickable");
    // });
    squaresBox.classList.add("js-unclickable");
    //display New Game button : display
    newgamebtn_display.classList.remove("js-hidden");
    //winEffect
    if(status==="penguins"){
        //winner-line penguins high-light
        if(winningLine){
           winningLine.forEach(function (square){
           square.classList.add("js-pen_highLight"); 
        });
    }   
    //penguins win==>snow color is pink
    $(document).snowfall({
        flakeColor : "rgb(255,240,245)",
        maxSpeed : 3,
        minSpeed : 1,
        maxSize : 20,
        minSize : 10,
        round : true
    });

}else if(status === "bear"){
        //winner-line bear high-light
        if (winningLine){
            winningLine.forEach(function (square) {
            square.classList.add("js-bear_highLight");
        });
    }   
        //penguins win==> snow color is blue
        $(document).snowfall({
            flakeColor : "rgb(175,238,238)",
            maxSpeed : 3,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true
        });
    }
}
//New Game button クリック時、ゲーム初期化
// classList の使うかったまとめ https://giita.com/tomokichi ruby/items/2460c5902d19b81cace5
 newgamebtn.addEventListener("click",function(){ 
    //penguins のターン
    flag = "pen-flag";
    //ターン数カウンター
    counter = 9;
    winningLine = null;
    squaresArray.forEach(function(square){
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
        square.classList.add("js-clickable");
    });
    squaresBox.classList.remove("js-unclickable");
    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");
    //snowfall stop
    $(document).snowfall("clear");
});

//マクのターン(computer)のロジックを作ろう！
function bearTurn(){
    let gameOverFlg ="0";
    //クリックできるマス
    const bearSquare = squaresArray.filter(function(square){
        return square.classList.contains("js-clickable");
    });
    let n = Math.floor(Math.random()* bearSquare.length);
    gameOverFlg = isSelect(bearSquare[n]);
    //Gameover　ではない場合
    if (gameOverFlg === "0"){
        squaresBox.classList.remove("js-unclickable");
    }
}
      