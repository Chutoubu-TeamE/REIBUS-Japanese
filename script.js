// ========= Loading ==============
//テキストのカウントアップ+バーの設定
var bar = new ProgressBar.Line(splash_text, {//id名を指定
    easing: 'easeInOut',//アニメーション効果linear、easeIn、easeOut、easeInOutが指定可能
    duration: 1000,//時間指定(1000＝1秒)
    strokeWidth: 0.2,//進捗ゲージの太さ
    color: '#555',//進捗ゲージのカラー
    trailWidth: 0.2,//ゲージベースの線の太さ
    trailColor: '#bbb',//ゲージベースの線のカラー
    text: {//テキストの形状を直接指定				
        style: {//天地中央に配置
            position: 'absolute',
            left: '50%',
            top: '50%',
            padding: '0',
            margin: '-30px 0 0 0',//バーより上に配置
            transform: 'translate(-50%,-50%)',
            'font-size': '1rem',
            color: '#fff',
        },
        autoStyleContainer: false //自動付与のスタイルを切る
    },
    step: function (state, bar) {
        bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
    }
});

//アニメーションスタート
bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画します
    $("#splash_text").fadeOut(10);//フェイドアウトでローディングテキストを削除
    $(".loader_cover-up").addClass("coveranime");//カバーが上に上がるクラス追加
    $(".loader_cover-down").addClass("coveranime");//カバーが下に下がるクラス追加
    $("#splash").fadeOut();//#splashエリアをフェードアウト
});

// ＝＝＝＝＝＝＝＝＝したからふわっ＝＝＝＝＝＝＝＝＝
// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime() {

    // ふわっ
    $('.fadeUpTrigger').each(function () { //fadeUpTriggerというクラス名が
        var elemPos = $(this).offset().top + 125;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
        }
    });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

// ========= スクロール =========
$('.menu-link a[href*="#"]').click(function () {
    var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
    var pos = $(elmHash).offset().top;  //idの上部の距離を取得
    $('body,html').animate({scrollTop: pos}, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
    $('.menu').removeClass('menu-active');
    // console.log('あっ、クリックされた')
    return false;
});

$('#page-link a[href*="#"]').click(function () {
    var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
    var pos = $(elmHash).offset().top;  //idの上部の距離を取得
    $('body,html').animate({scrollTop: pos}, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
    return false;
});

// ========= メニューボタン =========
$(".openbtn").click(function () {
    $(this).toggleClass('active');
    $('.menu').toggleClass('menu-active');
});

// ========= 波 ==============
var unit = 100 , 
    canvasList,
    info = {},
    colorList;

function init() {
    info.seconds = 0;
    info.t = 0;
    canvasList = [];
    colorList = [];
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#f9c89b', '#fff1cf', '#fddea5']);

for(var canvasIndex in canvasList) {
    var canvas = canvasList[canvasIndex];
    canvas.width = document.documentElement.clientWidth;
    canvas.height = 200;
    canvas.contextCache = canvas.getContext("2d");
}

update();
}

function update() {
    for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        draw(canvas, colorList[canvasIndex]);
    }
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    setTimeout(update, 35);
}

function draw(canvas, color) {
    var context = canvas.contextCache;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawWave(canvas, color[0], 1, 3, 0);
    drawWave(canvas, color[1], 1, 2, 250);
    drawWave(canvas, color[2], 1, 1.6, 100);
}

function drawWave(canvas, color, alpha, zoom, delay) {
    var context = canvas.contextCache
    context.fillStyle = color;
    context.globalAlpha = alpha;
    context.beginPath();
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height);
    context.lineTo(0, canvas.height);
    context.closePath();
    context.fill();
}

function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height / 2);
    var yAxis = 0;
    var context = canvas.contextCache;
    var x = t;
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis);
    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}

init();

console.log('動作確認')