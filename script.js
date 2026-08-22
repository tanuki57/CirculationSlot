// ==================================================
// 気休めスロット
// ==================================================


// ==================================================
// 画面切り替え
// ==================================================

const screens =
    document.querySelectorAll(".screen");

const navButtons =
    document.querySelectorAll(".nav-button");


navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target =
            button.dataset.screen;


        screens.forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });


        document
            .getElementById(target)
            .classList.add("active");


        navButtons.forEach(nav => {

            nav.classList.remove(
                "active"
            );

        });


        button.classList.add("active");

    });

});


// ==================================================
// スロット
// ==================================================

const symbols = [
    "🍒",
    "🍋",
    "🍊",
    "🔔",
    "⭐",
    "💎",
    "7️⃣"
];


const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
];


const coinsText =
    document.getElementById("coins");

const freeSpinsText =
    document.getElementById("freeSpins");

const bestCoinsText =
    document.getElementById("bestCoins");

const resultText =
    document.getElementById("result");

const spinButton =
    document.getElementById("spinButton");

const spinCostText =
    document.getElementById("spinCostText");


// ==================================================
// データ
// ==================================================

let coins =
    Number(localStorage.getItem("slotCoins"));

if (isNaN(coins)) {
    coins = 0;
}


let freeSpins =
    Number(localStorage.getItem("slotFreeSpins"));

if (isNaN(freeSpins)) {
    freeSpins = 3;
}


let bestCoins =
    Number(localStorage.getItem("slotBest"));

if (isNaN(bestCoins)) {
    bestCoins = coins;
}


// ==================================================
// ミニゲーム
// ==================================================

let miniGameCoins =
    Number(localStorage.getItem("miniGameCoins"));

if (isNaN(miniGameCoins)) {
    miniGameCoins = 0;
}


let miniGameBest =
    Number(localStorage.getItem("miniGameBest"));

if (isNaN(miniGameBest)) {
    miniGameBest = 0;
}


function getToday() {

    const date =
        new Date();

    return (
        date.getFullYear()
        + "-"
        + (date.getMonth() + 1)
        + "-"
        + date.getDate()
    );

}


const today =
    getToday();


let miniGameFreeDate =
    localStorage.getItem(
        "miniGameFreeDate"
    );


let dailyFreeAvailable =
    miniGameFreeDate !== today;


// ==================================================
// バフ
// ==================================================

const buffData = [

    {
        id: "focus",
        icon: "🎯",
        name: "集中力",
        price: 100,

        description:
            "タイミングストップのGOOD・GREAT・PERFECT判定が少し広くなる。",

        type: "minigame"

    },

    {
        id: "luck",
        icon: "🎰",
        name: "幸運",
        price: 150,

        description:
            "スロットで⭐・💎・7️⃣が少し出やすくなる。",

        type: "slot"

    },

    {
        id: "saving",
        icon: "💰",
        name: "節約術",
        price: 200,

        description:
            "無料プレイ後のミニゲーム料金が10コインから8コインになる。",

        type: "minigame"

    },

    {
        id: "gambler",
        icon: "🔥",
        name: "ギャンブラー",
        price: 250,

        description:
            "スロットの獲得報酬が20%増える。ただし1回の料金が60コインになる。",

        type: "slot"

    }

];


let ownedBuffs =
    JSON.parse(
        localStorage.getItem("ownedBuffs")
    );


if (!Array.isArray(ownedBuffs)) {
    ownedBuffs = [];
}


let equippedBuffs =
    JSON.parse(
        localStorage.getItem("equippedBuffs")
    );


if (!Array.isArray(equippedBuffs)) {
    equippedBuffs = [];
}


// ==================================================
// 設定表示
// ==================================================

const settingsCoins =
    document.getElementById(
        "settingsCoins"
    );

const settingsBestCoins =
    document.getElementById(
        "settingsBestCoins"
    );

const settingsMiniGameCoins =
    document.getElementById(
        "settingsMiniGameCoins"
    );

const settingsMiniGameBest =
    document.getElementById(
        "settingsMiniGameBest"
    );


// ==================================================
// ミニゲーム表示
// ==================================================

const miniGameCoinsText =
    document.getElementById(
        "miniGameCoins"
    );

const miniGameBestText =
    document.getElementById(
        "miniGameBest"
    );

const dailyFreeStatus =
    document.getElementById(
        "dailyFreeStatus"
    );

const gameCostText =
    document.getElementById(
        "gameCostText"
    );


// ==================================================
// バフ表示
// ==================================================

const buffList =
    document.getElementById(
        "buffList"
    );

const equippedBuffsElement =
    document.getElementById(
        "equippedBuffs"
    );

const equippedCount =
    document.getElementById(
        "equippedCount"
    );


// ==================================================
// 表示更新
// ==================================================

function updateDisplay() {

    coinsText.textContent =
        coins;

    freeSpinsText.textContent =
        freeSpins;

    bestCoinsText.textContent =
        bestCoins;


    settingsCoins.textContent =
        coins;

    settingsBestCoins.textContent =
        bestCoins;

    settingsMiniGameCoins.textContent =
        miniGameCoins;

    settingsMiniGameBest.textContent =
        miniGameBest;


    miniGameCoinsText.textContent =
        miniGameCoins;

    miniGameBestText.textContent =
        miniGameBest;


    if (dailyFreeAvailable) {

        dailyFreeStatus.textContent =
            "使用可能";

        gameCostText.textContent =
            "🎁 今日の無料プレイが使えます！";

    } else {

        dailyFreeStatus.textContent =
            "使用済み";

        gameCostText.textContent =
            "1回 "
            + getMiniGameCost()
            + "コイン";

    }


    spinCostText.textContent =
        getSpinCost()
        + "コイン";

}


// ==================================================
// 保存
// ==================================================

function saveData() {

    localStorage.setItem(
        "slotCoins",
        coins
    );

    localStorage.setItem(
        "slotBest",
        bestCoins
    );

    localStorage.setItem(
        "slotFreeSpins",
        freeSpins
    );

    localStorage.setItem(
        "miniGameCoins",
        miniGameCoins
    );

    localStorage.setItem(
        "miniGameBest",
        miniGameBest
    );

    localStorage.setItem(
        "miniGameFreeDate",
        miniGameFreeDate
    );

    localStorage.setItem(
        "ownedBuffs",
        JSON.stringify(ownedBuffs)
    );

    localStorage.setItem(
        "equippedBuffs",
        JSON.stringify(equippedBuffs)
    );

}


// ==================================================
// バフ判定
// ==================================================

function hasBuff(id) {

    return equippedBuffs.includes(id);

}


// ==================================================
// スロット料金
// ==================================================

function getSpinCost() {

    if (hasBuff("gambler")) {

        return 60;

    }

    return 50;

}


// ==================================================
// ミニゲーム料金
// ==================================================

function getMiniGameCost() {

    if (hasBuff("saving")) {

        return 8;

    }

    return 10;

}


// ==================================================
// ランダム絵柄
// ==================================================

function randomSymbol() {

    // 幸運装備中
    if (hasBuff("luck")) {

        const luckySymbols = [
            "⭐",
            "💎",
            "7️⃣"
        ];


        const normalSymbols = [
            "🍒",
            "🍋",
            "🍊",
            "🔔"
        ];


        const chance =
            Math.random();


        if (chance < 0.30) {

            return luckySymbols[
                Math.floor(
                    Math.random()
                    * luckySymbols.length
                )
            ];

        }


        return normalSymbols[
            Math.floor(
                Math.random()
                * normalSymbols.length
            )
        ];

    }


    const index =
        Math.floor(
            Math.random()
            * symbols.length
        );


    return symbols[index];

}


// ==================================================
// SPIN
// ==================================================

spinButton.addEventListener(
    "click",
    spin
);


function spin() {

    if (freeSpins > 0) {

        freeSpins--;

    } else {

        const cost =
            getSpinCost();


        if (coins < cost) {

            resultText.textContent =
                "💰 コインが足りません……";

            return;

        }


        coins -= cost;

    }


    spinButton.disabled = true;


    resultText.textContent =
        "回転中……";

    resultText.classList.remove(
        "win"
    );


    updateDisplay();
    saveData();


    reels.forEach(reel => {

        reel.classList.add(
            "spinning"
        );

    });


    const result = [

        randomSymbol(),

        randomSymbol(),

        randomSymbol()

    ];


    setTimeout(() => {

        stopReel(
            0,
            result[0]
        );

    }, 900);


    setTimeout(() => {

        stopReel(
            1,
            result[1]
        );

    }, 1300);


    setTimeout(() => {

        stopReel(
            2,
            result[2]
        );

        checkResult(result);

    }, 1700);

}


// ==================================================
// リール停止
// ==================================================

function stopReel(
    index,
    symbol
) {

    reels[index]
        .classList
        .remove("spinning");

    reels[index].textContent =
        symbol;

}


// ==================================================
// 当たり判定
// ==================================================

function checkResult(result) {

    const [a, b, c] =
        result;


    // 3つ揃いのみ当たり
    if (
        a === b &&
        b === c
    ) {

        if (a === "7️⃣") {

            jackpot();

            return;

        }


        if (a === "💎") {

            win(
                100,
                "💎💎💎 大当たり！"
            );

            return;

        }


        if (a === "⭐") {

            win(
                70,
                "⭐⭐⭐ すごい！"
            );

            return;

        }


        if (a === "🔔") {

            win(
                50,
                "🔔🔔🔔 当たり！"
            );

            return;

        }


        win(
            30,
            "🎉 3つ揃った！"
        );

        return;

    }


    resultText.textContent =
        "💥 ハズレ……";

    spinButton.disabled =
        false;

}


// ==================================================
// スロット報酬
// ==================================================

function applySlotBuff(amount) {

    if (hasBuff("gambler")) {

        return Math.floor(
            amount * 1.2
        );

    }

    return amount;

}


// ==================================================
// 当たり
// ==================================================

function win(
    amount,
    message
) {

    const finalAmount =
        applySlotBuff(amount);


    coins += finalAmount;


    resultText.textContent =
        message
        + " +"
        + finalAmount
        + "コイン！";


    resultText.classList.add(
        "win"
    );


    updateBest();
    updateDisplay();
    saveData();


    reels.forEach(reel => {

        reel.classList.add(
            "jackpot"
        );

    });


    setTimeout(() => {

        reels.forEach(reel => {

            reel.classList.remove(
                "jackpot"
            );

        });

        spinButton.disabled =
            false;

    }, 1000);

}


// ==================================================
// JACKPOT
// ==================================================

function jackpot() {

    const baseAmount =
        500;


    const amount =
        applySlotBuff(
            baseAmount
        );


    coins += amount;


    resultText.textContent =
        "🎉🎉 JACKPOT!! +"
        + amount
        + "コイン 🎉🎉";


    resultText.classList.add(
        "win"
    );


    updateBest();
    updateDisplay();
    saveData();


    reels.forEach(reel => {

        reel.classList.add(
            "jackpot"
        );

    });


    setTimeout(() => {

        reels.forEach(reel => {

            reel.classList.remove(
                "jackpot"
            );

        });

        spinButton.disabled =
            false;

    }, 1500);

}


// ==================================================
// 最高コイン
// ==================================================

function updateBest() {

    if (coins > bestCoins) {

        bestCoins =
            coins;

    }

}


// ==================================================
// タイミングストップ
// ==================================================

const startGameButton =
    document.getElementById(
        "startGameButton"
    );

const stopGameButton =
    document.getElementById(
        "stopGameButton"
    );

const retryGameButton =
    document.getElementById(
        "retryGameButton"
    );


const gameStartArea =
    document.getElementById(
        "gameStartArea"
    );

const gamePlayArea =
    document.getElementById(
        "gamePlayArea"
    );

const gameResultArea =
    document.getElementById(
        "gameResultArea"
    );


const cursor =
    document.getElementById(
        "cursor"
    );


const gameResult =
    document.getElementById(
        "gameResult"
    );


const gameReward =
    document.getElementById(
        "gameReward"
    );


let cursorPosition = 0;

let cursorDirection = 1;

let gameRunning = false;

let cursorAnimation = null;


// ==================================================
// ミニゲーム開始
// ==================================================

startGameButton.addEventListener(
    "click",
    startMiniGame
);


retryGameButton.addEventListener(
    "click",
    startMiniGame
);


function startMiniGame() {

    if (dailyFreeAvailable) {

        dailyFreeAvailable =
            false;

        miniGameFreeDate =
            today;

    } else {

        const cost =
            getMiniGameCost();


        if (coins < cost) {

            alert(
                "💰 コインが足りません！\n\n"
                + "必要コイン："
                + cost
            );

            return;

        }


        coins -= cost;

    }


    saveData();
    updateDisplay();


    gameStartArea.classList.add(
        "hidden"
    );

    gameResultArea.classList.add(
        "hidden"
    );

    gamePlayArea.classList.remove(
        "hidden"
    );


    gameRunning =
        true;


    cursorPosition =
        0;

    cursorDirection =
        1;


    cursor.style.left =
        "0%";


    cursor.style.transform =
        "translateX(0)";


    cursorAnimation =
        requestAnimationFrame(
            moveCursor
        );

}


// ==================================================
// カーソル移動
// ==================================================

function moveCursor() {

    if (!gameRunning) {

        return;

    }


    cursorPosition +=
        cursorDirection
        * 0.7;


    if (
        cursorPosition >= 98
    ) {

        cursorPosition = 98;

        cursorDirection = -1;

    }


    if (
        cursorPosition <= 0
    ) {

        cursorPosition = 0;

        cursorDirection = 1;

    }


    cursor.style.left =
        cursorPosition + "%";


    cursorAnimation =
        requestAnimationFrame(
            moveCursor
        );

}


// ==================================================
// STOP
// ==================================================

stopGameButton.addEventListener(
    "click",
    stopMiniGame
);


function stopMiniGame() {

    if (!gameRunning) {

        return;

    }


    gameRunning =
        false;


    cancelAnimationFrame(
        cursorAnimation
    );


    const distance =
        Math.abs(
            cursorPosition - 50
        );


    // 集中力バフ
    let perfectRange = 3;

    let greatRange = 8;

    let goodRange = 15;


    if (hasBuff("focus")) {

        perfectRange = 5;

        greatRange = 11;

        goodRange = 18;

    }


    let reward = 0;

    let message = "";


    if (
        distance <= perfectRange
    ) {

        reward = 50;

        message =
            "🎯 PERFECT!";

    }

    else if (
        distance <= greatRange
    ) {

        reward = 30;

        message =
            "✨ GREAT!";

    }

    else if (
        distance <= goodRange
    ) {

        reward = 15;

        message =
            "👍 GOOD!";

    }

    else {

        reward = 0;

        message =
            "💥 MISS!";

    }


    coins += reward;

    miniGameCoins += reward;


    if (
        miniGameCoins >
        miniGameBest
    ) {

        miniGameBest =
            miniGameCoins;

    }


    updateBest();
    updateDisplay();
    saveData();


    gamePlayArea.classList.add(
        "hidden"
    );

    gameResultArea.classList.remove(
        "hidden"
    );


    gameResult.textContent =
        message;


    if (reward > 0) {

        gameReward.textContent =
            "+"
            + reward
            + "コイン";

    } else {

        gameReward.textContent =
            "コイン獲得なし";

    }

}


// ==================================================
// バフ画面
// ==================================================

function renderBuffs() {

    buffList.innerHTML = "";

    equippedBuffsElement.innerHTML = "";


    equippedCount.textContent =
        equippedBuffs.length;


    // ------------------------------------------
    // 装備中
    // ------------------------------------------

    if (
        equippedBuffs.length === 0
    ) {

        equippedBuffsElement.innerHTML =
            `<div class="empty-buff">
                装備中のバフはありません
            </div>`;

    } else {

        equippedBuffs.forEach(id => {

            const buff =
                buffData.find(
                    item =>
                        item.id === id
                );


            if (!buff) {
                return;
            }


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "buff-card equipped";


            card.innerHTML = `

                <div class="buff-top">

                    <div class="buff-icon">
                        ${buff.icon}
                    </div>

                    <div class="buff-name">
                        ${buff.name}
                    </div>

                </div>

                <div class="buff-description">
                    ${buff.description}
                </div>

                <button
                    class="buff-button unequip"
                    data-unequip="${buff.id}"
                >
                    装備を外す
                </button>

            `;


            equippedBuffsElement
                .appendChild(card);

        });

    }


    // ------------------------------------------
    // ショップ
    // ------------------------------------------

    buffData.forEach(buff => {

        const owned =
            ownedBuffs.includes(
                buff.id
            );


        const equipped =
            equippedBuffs.includes(
                buff.id
            );


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "buff-card";


        if (equipped) {

            card.classList.add(
                "equipped"
            );

        }


        let buttonHTML = "";


        if (!owned) {

            buttonHTML = `

                <button
                    class="buff-button buy"
                    data-buy="${buff.id}"
                >
                    💰 ${buff.price}コインで購入
                </button>

            `;

        }

        else if (equipped) {

            buttonHTML = `

                <button
                    class="buff-button unequip"
                    data-unequip="${buff.id}"
                >
                    装備中
                </button>

            `;

        }

        else {

            buttonHTML = `

                <button
                    class="buff-button equip"
                    data-equip="${buff.id}"
                >
                    ⚡ 装備する
                </button>

            `;

        }


        card.innerHTML = `

            <div class="buff-top">

                <div class="buff-icon">
                    ${buff.icon}
                </div>

                <div>

                    <div class="buff-name">
                        ${buff.name}
                    </div>

                    ${
                        owned
                        ? `<div class="buff-owned">
                            ✓ 所持済み
                          </div>`
                        : `<div class="buff-price">
                            💰 ${buff.price}コイン
                          </div>`
                    }

                </div>

            </div>


            <div class="buff-description">
                ${buff.description}
            </div>


            ${buttonHTML}

        `;


        buffList.appendChild(card);

    });


    // ------------------------------------------
    // ボタンイベント
    // ------------------------------------------

    document
        .querySelectorAll("[data-buy]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    buyBuff(
                        button.dataset.buy
                    );

                }
            );

        });


    document
        .querySelectorAll("[data-equip]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    equipBuff(
                        button.dataset.equip
                    );

                }
            );

        });


    document
        .querySelectorAll("[data-unequip]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    unequipBuff(
                        button.dataset.unequip
                    );

                }
            );

        });

}


// ==================================================
// バフ購入
// ==================================================

function buyBuff(id) {

    const buff =
        buffData.find(
            item =>
                item.id === id
        );


    if (!buff) {
        return;
    }


    if (
        ownedBuffs.includes(id)
    ) {

        return;

    }


    if (
        coins < buff.price
    ) {

        alert(
            "💰 コインが足りません！\n\n"
            + "必要："
            + buff.price
            + "コイン"
        );

        return;

    }


    coins -=
        buff.price;


    ownedBuffs.push(id);


    saveData();
    updateDisplay();
    renderBuffs();


    alert(
        buff.icon
        + " "
        + buff.name
        + "を購入しました！\n\n"
        + "「装備する」を押すと効果が発動します。"
    );

}


// ==================================================
// バフ装備
// ==================================================

function equipBuff(id) {

    if (
        equippedBuffs.includes(id)
    ) {

        return;

    }


    if (
        equippedBuffs.length >= 2
    ) {

        alert(
            "⚡ 装備枠がいっぱいです！\n\n"
            + "先に装備中のバフを1つ外してください。"
        );

        return;

    }


    if (
        !ownedBuffs.includes(id)
    ) {

        return;

    }


    equippedBuffs.push(id);


    saveData();
    updateDisplay();
    renderBuffs();

}


// ==================================================
// バフを外す
// ==================================================

function unequipBuff(id) {

    equippedBuffs =
        equippedBuffs.filter(
            buffId =>
                buffId !== id
        );


    saveData();
    updateDisplay();
    renderBuffs();

}


// ==================================================
// データリセット
// ==================================================

const resetDataButton =
    document.getElementById(
        "resetDataButton"
    );


resetDataButton.addEventListener(
    "click",
    () => {

        const answer =
            confirm(
                "ゲームデータをリセットしますか？\n\n"
                + "コイン・無料SPIN・記録・バフなどが初期化されます。"
            );


        if (!answer) {
            return;
        }


        coins = 0;

        bestCoins = 0;

        freeSpins = 3;

        miniGameCoins = 0;

        miniGameBest = 0;

        dailyFreeAvailable = true;

        miniGameFreeDate = "";

        ownedBuffs = [];

        equippedBuffs = [];


        saveData();

        updateDisplay();

        renderBuffs();


        resultText.textContent =
            "無料3回プレゼント！";


        reels[0].textContent =
            "🍒";

        reels[1].textContent =
            "🍋";

        reels[2].textContent =
            "⭐";


        alert(
            "データをリセットしました！"
        );

    }
);


// ==================================================
// 最初からやり直す
// ==================================================

const restartGameButton =
    document.getElementById(
        "restartGameButton"
    );


restartGameButton.addEventListener(
    "click",
    () => {

        const answer =
            confirm(
                "⚠️ 本当に最初からやり直しますか？\n\n"
                + "これまでのゲームデータがすべて削除されます。"
            );


        if (!answer) {
            return;
        }


        const finalAnswer =
            confirm(
                "本当にいいですか？\n\n"
                + "この操作は元に戻せません。"
            );


        if (!finalAnswer) {
            return;
        }


        localStorage.clear();


        coins = 0;

        bestCoins = 0;

        freeSpins = 3;

        miniGameCoins = 0;

        miniGameBest = 0;

        dailyFreeAvailable = true;

        miniGameFreeDate = "";

        ownedBuffs = [];

        equippedBuffs = [];


        gameRunning = false;


        cancelAnimationFrame(
            cursorAnimation
        );


        updateDisplay();

        renderBuffs();


        resultText.textContent =
            "最初からスタート！";


        reels[0].textContent =
            "🍒";

        reels[1].textContent =
            "🍋";

        reels[2].textContent =
            "⭐";


        gameStartArea.classList.remove(
            "hidden"
        );

        gamePlayArea.classList.add(
            "hidden"
        );

        gameResultArea.classList.add(
            "hidden"
        );


        alert(
            "ゲームを最初から始めます！"
        );

    }
);


// ==================================================
// 初期化
// ==================================================

renderBuffs();

updateDisplay();