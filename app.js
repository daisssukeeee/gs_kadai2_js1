// プレイヤーの位置
let player0 = 0;
let player1 = 0;

// 表示されているサイコロの目
let diceValue0 = 0;
let diceValue1 = 0;

// 30マス進んだら勝ちとする
let goal = 22;

// 描画に関するグローバル変数
let $start = document.getElementById('start');
$start.style.width = '120px';
$start.style.height = '40px';

let $rollDice = document.getElementById('roll-dice');
$rollDice.style.width = '120px';
$rollDice.style.height = '40px';
$rollDice.style.display = 'none';

let $can = document.getElementById('canvas');
$can.width = 800;
$can.height = 360;
$can.scr = 'canvas.png';

let ctx = $can.getContext('2d');

// サイコロの目の画像
let image1 = new Image(32, 32);
image1.src = '1.png';
let image2 = new Image(32, 32);
image2.src = '2.png';
let image3 = new Image(32, 32);
image3.src = '3.png';
let image4 = new Image(32, 32);
image4.src = '4.png';
let image5 = new Image(32, 32);
image5.src = '5.png';
let image6 = new Image(32, 32);
image6.src = '6.png';

// プレイヤーの画像
let imagePlayer0 = new Image(36, 36);
imagePlayer0.src = 'player0.png';
let imagePlayer1 = new Image(36, 36);
imagePlayer1.src = 'player1.png';

// 効果音
let jumpSound = new Audio('./jump.mp3');
let diceSound = new Audio('./dice.mp3');
let winSound = new Audio('./win.mp3');
let loseSound = new Audio('./lose.mp3');

// マスの大きさ
let squareSize = 36;

// どれだけずらして描画するか
let shift0 = 0;
let shift1 = 0;

// ジャンプ中の更新回数
let jumpUpdateCount0 = 0;
let jumpUpdateCount1 = 0;

function Start() {
    $start.style.display = 'none';
    $rollDice.style.display = 'block';
    shift0 = 0;
    shift1 = 0;
    player0 = 0;
    player1 = 0;
    diceValue0 = 0;
    diceValue1 = 0;
    DrawField();
}

function Finish() {
    $start.style.display = 'block';
    $rollDice.style.display = 'none';
}

function DrawField() {
    let baseYPosPlayer0 = $can.height / 2 - 40;
    let baseYPosPlayer1 = $can.height / 2 + 40 + squareSize;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, $can.width, $can.height);

    ctx.font = '14px ＭＳ ゴシック';
    for (let i = 0; i <= goal; i++) {
        ctx.fillStyle = '#0cc';
        ctx.fillRect(50 * i + 50 - shift0, baseYPosPlayer0, squareSize, 8);
        ctx.fillStyle = '#fff';
        if (i == 0)
            ctx.fillText('START', 50 * i + 50 - shift0, baseYPosPlayer0 + 25);
        else if (i == goal)
            ctx.fillText('GOAL', 50 * i + 50 - shift0, baseYPosPlayer0 + 25);
        else
            ctx.fillText(i, 50 * i + 60 - shift0, baseYPosPlayer0 + 25);
    }

    for (let i = 0; i <= goal; i++) {
        ctx.fillStyle = '#0cc';
        ctx.fillRect(50 * i + 50 - shift1, baseYPosPlayer1, squareSize, 8);
        ctx.fillStyle = '#fff';
        if (i == 0)
            ctx.fillText('START', 50 * i + 50 - shift1, baseYPosPlayer1 + 25);
        else if (i == goal)
            ctx.fillText('GOAL', 50 * i + 50 - shift1, baseYPosPlayer1 + 25);
        else
            ctx.fillText(i, 50 * i + 60 - shift1, baseYPosPlayer1 + 25);
    }
    let charSize = 48;
    if (jumpUpdateCount0 < 5)
        ctx.drawImage(imagePlayer0, 42, baseYPosPlayer0 - charSize - 8 * jumpUpdateCount0, charSize, charSize);
    else
        ctx.drawImage(imagePlayer0, 42, baseYPosPlayer0 - charSize - 8 * (9 - jumpUpdateCount0), charSize, charSize);

    if (jumpUpdateCount1 < 5)
        ctx.drawImage(imagePlayer1, 42, baseYPosPlayer1 - charSize - 8 * jumpUpdateCount1, charSize, charSize);
    else
        ctx.drawImage(imagePlayer1, 42, baseYPosPlayer1 - charSize - 8 * (9 - jumpUpdateCount1), charSize, charSize);

    ShowDice(diceValue0, 160, baseYPosPlayer0 - 64, 40, 40);
    ShowDice(diceValue1, 160, baseYPosPlayer1 - 64, 40, 40);
}

function ShowDice(value, x, y, w, h) {
    let images = [image1, image2, image3, image4, image5, image6];
    if (value - 1 >= 0 && images.length >= value) {
        // メッセージを表示
        if (player1 == 1) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('19:00	東急百貨店を中心に400m程の帳が降ろされる', 50, 30);
        } else if (player1 == 2) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('20:14	七海班/禪院班/日下部班が渋谷に到着', 50, 30);
        } else if (player1 == 3) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('20:31	五条悟が渋谷に到着', 50, 30);
        }
        if (player1 == 4) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('20:40	五条悟 VS. 漏瑚・花御・脹相 → 花御死亡', 50, 30);
        } else if (player1 == 5) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('21:03	虎杖 VS. 蝗GUY 虎杖勝利＠明治神宮前駅B2F', 50, 30);
        } else if (player1 == 6) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('21:15	五条悟と偽夏油傑が対面＠渋谷駅B5F', 50, 30);
        }         
        if (player1 == 7) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('21:20	五条悟が獄門疆に封印', 50, 30);
        } else if (player1 == 8) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('21:22	補助監督・伊地知が重面春太に刺される', 50, 30);
        } else if (player1 == 9) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('21:26	獄門疆の状況をメカ丸が知り、虎杖に報告', 50, 30);
        }
        if (player1 == 10) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('21:29	虎杖が叫びながらナナミンに現状報告', 50, 30);
        } else if (player1 == 11) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('22:15	虎杖 VS 脹相', 50, 30);
        } else if (player1 == 12) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('22:51	伏黒恵 VS. 禪院甚爾', 50, 30);
        }
        if (player1 == 13) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('23:01	漏瑚 VS. 宿儺　漏瑚が死亡', 50, 30);
        } else if (player1 == 14) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('23:16	釘崎 VS. 真人(分身)', 50, 30);
        } else if (player1 == 15) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('23:17	七海 VS. 真人', 50, 30);
        }                
        if (player1 == 16) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('23:18	真人が到着した虎杖の前で七海を殺害', 50, 30);
        } else if (player1 == 17) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('23:19	虎杖 VS. 真人　開戦！', 50, 30);
        } else if (player1 == 18) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('23:25	釘崎は真人(本体)の無為転変を受ける。顔面崩壊。', 50, 30);
        }                
        if (player1 == 19) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('23:36	虎杖が黒閃を極める。真人が逃亡。', 50, 30);
        } else if (player1 == 20) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('偽夏油・裏梅が獄門疆を持って逃亡', 50, 30);
        } else if (player1 == 21) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('渋谷事変終了', 50, 30);
        }                

        ctx.drawImage(images[value - 1], x, y, w, h);
    }
}

function GetValue() {
    return Math.floor(Math.random() * 6) + 1;
}

function RollDice() {
    $rollDice.style.display = 'none';
    let value0 = GetValue();
    let value1 = GetValue();

    player0 += value0;
    player1 += value1;

    // 勝負がついているかもしれないのでチェックする
    if (player0 >= goal) {
        value0 -= player0 - goal; // どれだけプレイヤーの駒を進めるか？
        player0 = goal;
    }

    if (player1 >= goal) {
        value1 -= player1 - goal;
        player1 = goal;
    }

    let values = [2, 6, 3, 1, 4, 5];

    let interval = 500;
    let interval2 = 80;
    // コンピュータの位置によってメッセージを表示したい
    let messageDelay = interval * (value0 + value1); // メッセージ表示の遅延時間

    setTimeout(() => {
        // サイコロが転がっているような演出
        diceSound.currentTime = 0;
        diceSound.play();
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                diceValue0 = values[i];
                DrawField();
            }, interval2 * i);
        }
        // その後、サイコロの目を表示
        setTimeout(() => {
            diceSound.pause();
            diceValue0 = value0;
            // メッセージ表示
            ShowDice(value0, 160, baseYPosPlayer0 - 64, 40, 40);
        }, interval2 * 6);
    }, interval);

    // 駒を移動させる
    for (let i = 0; i < value0; i++) {
        setTimeout(() => {
            MovePlayer(0);
        }, interval * (i + 2));
    }

    // プレイヤー勝利の場合はその旨を表示
    setTimeout(() => {
        if (player0 == goal) {
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('あなたの勝ちです', 50, 30);
            winSound.currentTime = 0;
            winSound.play();
            Finish();
        }
    }, interval * (value0 + 2));

    // もしプレイヤーが勝利ならここで終了
    if (player0 == goal)
        return;

    // コンピュータがサイコロを振る処理
    setTimeout(() => {
        // サイコロが転がっているような演出
        diceSound.currentTime = 0;
        diceSound.play();
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                diceValue1 = values[i];
                DrawField();
            }, interval2 * i);
        }
        // サイコロの目を表示
        setTimeout(() => {
            diceSound.pause();
            diceValue1 = value1;
            // メッセージ表示
            ShowDice(value1, 160, baseYPosPlayer1 - 64, 40, 40);
        }, interval2 * 6);
    }, interval * (value0 + 2));

    // コンピュータの駒を移動させる
    for (let i = 0; i < value1; i++) {
        setTimeout(() => {
            MovePlayer(1);
        }, interval * (value0 + 3 + i));
    }

    // コンピューターの位置によってメッセージを表示したい
    setTimeout(() => {
        if (player1 == goal) { // プレイヤー敗北の場合はその旨を表示
            ctx.fillStyle = '#f0f';
            ctx.font = '24px ＭＳ ゴシック';
            ctx.fillText('あなたの負けです', 50, 30);
            loseSound.currentTime = 0;
            loseSound.play();
            Finish();
        } else { // 決着がついていない場合は再びサイコロを振れるようにする
            $rollDice.style.display = 'block';
        }
    }, messageDelay + 1000); // メッセージ表示後に適切な遅延時間を追加
}

function MovePlayer(player) {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            if (player == 0) {
                shift0 += 5;
                jumpUpdateCount0 = i;
            } else {
                shift1 += 5;
                jumpUpdateCount1 = i;
            }
            DrawField();
        }, 50 * i);
    }
}
