"use strict";
window.addEventListener("DOMContentLoaded",
    function() {
        // ヘッダーのテキストエフェクト
        $("header").textillate({
            loop: false, // ループのオンオフ
            minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
            initialDelay: 2000, // 遅延時間
            autoStart: true, // アニメーションを自動的にスタート
            in: { // フェードインのエフェクトの詳細設定
                effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
                delayScale: 1.5, // 遅延時間の指数
                delay: 50, // 文字ごとの遅延時間
                sync: false, // trueはアニメーションをすべての文字に同時に適用
                shuffle: true // trueは文字を順番にではなく、ランダムに
                }
            });

            // おみくじボタン(id="btn1") ボヤァと表示させる
            $(function(){
                ScrollReveal().reveal("#btn1", { duration: 9000 });
        });
        setTimeout(
            function() {
              // ボップアップメッセージ
            let popMessage="いらっしゃい!おみくじ引いてって!";
            window.alert(popMessage);  
            },
            "5000"
             );      
        },false
    );
// おみくじボタン1
const btn1 = document.getElementById("btn1");
btn1.addEventListener("click",
function(){
    // let n = Math.floor(Math.random()*3);
    // switch (n){
    //     case 0:
    //         btn1.textContent="彼氏ができる";
    //         btn1.style.color="yellogreen";
    //         break;
    //     case 1:
    //         btn1.textContent="彼女ができる";
    //         btn1.style.color="white";
    //         break;
    //     case 2:
    //         btn1.textContent="独身になる:'(";
    //         btn1.style.color="lightblue";
    //         break;
    // }
    
    let resultText = ["iphone13","Love85%","100万","Happy","Pretty"];
    let resultColor = ["Red","black","Green","Blue","Lightblue"];
    let resultFontSize = ["50px","40px","60px","65px","70px"];
    let resultMaxSpeed = [10,10,8,5,5];
    let resultMaxSize = [30,30,20,15,20];
    let resultImage = ["img/star.png","img/sakura_hanabira.png","img/leaf.png","img/snowflakes.png","img/star.png"];
    let resultSound = ["sound/omikuji_sound1.mp3","sound/omikuji_sound1.mp3","sound/omikuji_sound3.mp3","sound/omikuji_sound3.mp3","sound/omikuji_sound1.mp3",];
    let n = Math.floor(Math.random()*resultText.length);
    omikujiText.textContent = resultText[n];
    omikujiText.style.color = resultColor[n];
    omikujiText.style.fontSize = resultFontSize[n];
    $(document).snowfall("clear");
    
    $(document).ready(function(){
    $(document).snowfall({
        maxSpeed :resultMaxSpeed[n],
        minSpeed : 1, // 最小速度
        maxSize : resultMaxSize[n],
        minSize : 1, // 最小サイズ
        image : resultImage[n],
    });
　});
    let music = new Audio (resultSound[n]);
    music.currentTime = 0;
    music.play();
 },false
);