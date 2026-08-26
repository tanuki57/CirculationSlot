// ==================================================
// 気休めスロット
// Time Attack Edition
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
            screen.classList.remove("active");
        });


        document
            .getElementById(target)
            .classList.add("active");


        navButtons.forEach(nav => {
            nav.classList.remove("active");
        });


        button.classList.add("active");

    });

});


// ==================================================
// 共通データ
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


let coins =
    Number(localStorage.getItem("slotCoins"));


if (isNaN(coins)) {
    coins = 0;
}


let freeSpins =
    Number(
        localStorage.getItem(
            "slotFreeSpins"
        )
    );


if (isNaN(freeSpins)) {
    freeSpins = 3;
}


let bestCoins =
    Number(
        localStorage.getItem(
            "slotBest"
        )
    );


if (isNaN(bestCoins)) {
    bestCoins = 0;
}


// ==================================================
// ミニゲーム
// ==================================================

let miniGameCoins =
    Number(
        localStorage.getItem(
            "miniGameCoins"
        )
    );


if (isNaN(miniGameCoins)) {
    miniGameCoins = 0;
}


let miniGameBest =
    Number(
        localStorage.getItem(
            "miniGameBest"
        )
    );


if (isNaN(miniGameBest)) {
    miniGameBest = 0;
}


// ==================================================
// 日付
// ==================================================

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


let today =
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
        id: "luck",
        icon: "🎰",
        name: "幸運",
        price: 150,
        description:
            "スロットで⭐・💎・7️⃣が少し出やすくなる。",
        type: "slot"
    },

    {
        id: "superLuck",
        icon: "🍀",
        name: "超幸運",
        price: 400,
        description:
            "⭐・💎・7️⃣の出現率をさらにアップ。",
        type: "slot"
    },

    {
        id: "gemBlessing",
        icon: "💎",
        name: "宝石の加護",
        price: 350,
        description:
            "💎💎💎の報酬が5000コインから6500コインになる。",
        type: "slot"
    },

    {
        id: "freeSpin",
        icon: "🎁",
        name: "無料回転",
        price: 300,
        description:
            "コインを使うSPIN時、15%の確率で無料になる。",
        type: "slot"
    },

    {
        id: "focus",
        icon: "🎯",
        name: "集中力",
        price: 100,
        description:
            "タイミングストップの判定ゾーンが広くなる。",
        type: "minigame"
    },

    {
        id: "saving",
        icon: "💰",
        name: "節約術",
        price: 200,
        description:
            "ミニゲーム料金が10コインから8コインになる。",
        type: "minigame"
    },

    {
        id: "memory",
        icon: "🧠",
        name: "記憶力",
        price: 250,
        description:
            "数字記憶ゲームの表示時間が長くなる。",
        type: "minigame"
    },

    {
        id: "precision",
        icon: "🎯",
        name: "精密",
        price: 300,
        description:
            "タイミングゲームのPERFECT報酬がアップ。",
        type: "minigame"
    },

    {
        id: "gambler",
        icon: "🔥",
        name: "ギャンブラー",
        price: 250,
        description:
            "スロット報酬+20%。SPIN料金は60コイン。",
        type: "slot"
    },

    {
        id: "highLowMaster",
        icon: "🃏",
        name: "勝負師",
        price: 350,
        description:
            "ハイ＆ロー成功時の報酬が20コインから40コインになる。",
        type: "minigame"
    },

    {
        id: "coinProtect",
        icon: "💰",
        name: "コイン保護",
        price: 300,
        description:
            "スロットでハズレたとき25%の確率で料金が戻る。",
        type: "other"
    },

    {
        id: "winStreak",
        icon: "🔥",
        name: "連勝ボーナス",
        price: 400,
        description:
            "ミニゲームを3回以上連続成功すると+10コイン。",
        type: "other"
    },

    {
        id: "luckyCharm",
        icon: "🍀",
        name: "幸運のお守り",
        price: 500,
        description:
            "すべてのゲームで少しだけ有利になる。",
        type: "other"
    }

];


let ownedBuffs =
    JSON.parse(
        localStorage.getItem(
            "ownedBuffs"
        )
    );


if (!Array.isArray(ownedBuffs)) {
    ownedBuffs = [];
}


let equippedBuffs =
    JSON.parse(
        localStorage.getItem(
            "equippedBuffs"
        )
    );


if (!Array.isArray(equippedBuffs)) {
    equippedBuffs = [];
}


// ==================================================
// バフ枠
// ==================================================

let buffSlotMax =
    Number(
        localStorage.getItem(
            "buffSlotMax"
        )
    );


if (
    isNaN(buffSlotMax)
    ||
    buffSlotMax < 2
) {

    buffSlotMax = 2;

}


// ==================================================
// 連勝
// ==================================================

let miniGameStreak =
    Number(
        localStorage.getItem(
            "miniGameStreak"
        )
    );


if (isNaN(miniGameStreak)) {
    miniGameStreak = 0;
}


// ==================================================
// Tコイン
// ==================================================

let tCoins =
    Number(
        localStorage.getItem(
            "tCoins"
        )
    );


if (isNaN(tCoins)) {
    tCoins = 0;
}


// ==================================================
// タイムアタック記録
// ==================================================

let best10kTime =
    Number(
        localStorage.getItem(
            "best10kTime"
        )
    );


if (isNaN(best10kTime)) {
    best10kTime = 0;
}


let best10minCoins =
    Number(
        localStorage.getItem(
            "best10minCoins"
        )
    );


if (isNaN(best10minCoins)) {
    best10minCoins = 0;
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
        JSON.stringify(
            ownedBuffs
        )
    );


    localStorage.setItem(
        "equippedBuffs",
        JSON.stringify(
            equippedBuffs
        )
    );


    localStorage.setItem(
        "miniGameStreak",
        miniGameStreak
    );


    localStorage.setItem(
        "tCoins",
        tCoins
    );


    localStorage.setItem(
        "buffSlotMax",
        buffSlotMax
    );


    localStorage.setItem(
        "best10kTime",
        best10kTime
    );


    localStorage.setItem(
        "best10minCoins",
        best10minCoins
    );

}


// ==================================================
// バフ判定
// ==================================================

function hasBuff(id) {

    return equippedBuffs.includes(id);

}


function hasLuckyCharm() {

    return hasBuff(
        "luckyCharm"
    );

}


// ==================================================
// スロット料金
// ==================================================

function getSpinCost() {

    if (
        hasBuff("gambler")
    ) {

        return 60;

    }


    return 50;

}


// ==================================================
// ミニゲーム料金
// ==================================================

function getMiniGameCost() {

    if (
        hasBuff("saving")
    ) {

        return 8;

    }


    return 10;

}


// ==================================================
// 通常画面要素
// ==================================================

const coinsText =
    document.getElementById(
        "coins"
    );


const freeSpinsText =
    document.getElementById(
        "freeSpins"
    );


const bestCoinsText =
    document.getElementById(
        "bestCoins"
    );


const resultText =
    document.getElementById(
        "result"
    );


const spinButton =
    document.getElementById(
        "spinButton"
    );


const spinCostText =
    document.getElementById(
        "spinCostText"
    );


const reels = [

    document.getElementById(
        "reel1"
    ),

    document.getElementById(
        "reel2"
    ),

    document.getElementById(
        "reel3"
    )

];


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


    if (
        dailyFreeAvailable
    ) {

        dailyFreeStatus.textContent =
            "使用可能";


        gameCostText.textContent =
            "🎁 今日の無料プレイが使えます！";

    }

    else {

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


    updateTimeAttackDisplay();

}


// ==================================================
// 最高コイン
// ==================================================

function updateBest() {

    if (
        coins > bestCoins
    ) {

        bestCoins =
            coins;

    }

}


// ==================================================
// 通常スロット抽選
// ==================================================

function getSlotResult() {

    let rareBonus = 0;


    if (hasBuff("luck")) {
        rareBonus += 0.03;
    }


    if (hasBuff("superLuck")) {
        rareBonus += 0.06;
    }


    if (hasLuckyCharm()) {
        rareBonus += 0.01;
    }


    const random =
        Math.random();


    if (
        random <
        0.0001
        +
        rareBonus * 0.08
    ) {

        return [
            "7️⃣",
            "7️⃣",
            "7️⃣"
        ];

    }


    if (
        random <
        0.0011
        +
        rareBonus * 0.30
    ) {

        return [
            "💎",
            "💎",
            "💎"
        ];

    }


    if (
        random <
        0.0111
        +
        rareBonus
    ) {

        return [
            "⭐",
            "⭐",
            "⭐"
        ];

    }


    if (
        random < 0.0611
    ) {

        return [
            "🔔",
            "🔔",
            "🔔"
        ];

    }


    if (
        random < 0.1111
    ) {

        return [
            "🍒",
            "🍒",
            "🍒"
        ];

    }


    if (
        random < 0.1611
    ) {

        return [
            "🍋",
            "🍋",
            "🍋"
        ];

    }


    if (
        random < 0.2111
    ) {

        return [
            "🍊",
            "🍊",
            "🍊"
        ];

    }


    let result;


    do {

        result = [

            symbols[
                Math.floor(
                    Math.random()
                    *
                    symbols.length
                )
            ],

            symbols[
                Math.floor(
                    Math.random()
                    *
                    symbols.length
                )
            ],

            symbols[
                Math.floor(
                    Math.random()
                    *
                    symbols.length
                )
            ]

        ];

    }

    while (
        result[0] === result[1]
        &&
        result[1] === result[2]
    );


    return result;

}


// ==================================================
// 通常SPIN
// ==================================================

spinButton.addEventListener(
    "click",
    spin
);


function spin() {

    let paidSpin = false;

    let freeByBuff = false;


    if (
        freeSpins > 0
    ) {

        freeSpins--;

    }

    else {

        const cost =
            getSpinCost();


        if (
            coins < cost
        ) {

            resultText.textContent =
                "💰 コインが足りません……";

            return;

        }


        if (
            hasBuff("freeSpin")
            &&
            Math.random() < 0.15
        ) {

            freeByBuff = true;

        }

        else {

            coins -= cost;

            paidSpin = true;

        }

    }


    spinButton.disabled =
        true;


    resultText.textContent =
        freeByBuff
            ? "🎁 無料回転発動！"
            : "回転中……";


    resultText.classList.remove(
        "win"
    );


    updateDisplay();
    saveData();


    reels.forEach(
        reel => {
            reel.classList.add(
                "spinning"
            );
        }
    );


    const result =
        getSlotResult();


    setTimeout(() => {

        stopReel(
            0,
            result[0]
        );

    },900);


    setTimeout(() => {

        stopReel(
            1,
            result[1]
        );

    },1300);


    setTimeout(() => {

        stopReel(
            2,
            result[2]
        );


        checkResult(
            result,
            paidSpin
        );

    },1700);

}


function stopReel(
    index,
    symbol
) {

    reels[index]
        .classList
        .remove(
            "spinning"
        );


    reels[index].textContent =
        symbol;

}


// ==================================================
// 通常スロット判定
// ==================================================

function checkResult(
    result,
    paidSpin
) {

    const [
        a,
        b,
        c
    ] = result;


    if (
        a === "7️⃣"
        &&
        b === "7️⃣"
        &&
        c === "7️⃣"
    ) {

        jackpot();

        return;

    }


    if (
        a === "💎"
        &&
        b === "💎"
        &&
        c === "💎"
    ) {

        const amount =
            hasBuff("gemBlessing")
                ? 6500
                : 5000;


        win(
            amount,
            "💎💎💎 超大当たり！"
        );

        return;

    }


    if (
        a === "⭐"
        &&
        b === "⭐"
        &&
        c === "⭐"
    ) {

        win(
            3000,
            "⭐⭐⭐ 大当たり！"
        );

        return;

    }


    if (
        a === "🔔"
        &&
        b === "🔔"
        &&
        c === "🔔"
    ) {

        freeSpins += 5;


        resultText.textContent =
            "🔔🔔🔔 ベル！\n無料SPIN +5回！";


        resultText.classList.add(
            "win"
        );


        updateDisplay();
        saveData();


        reels.forEach(
            reel => {
                reel.classList.add(
                    "jackpot"
                );
            }
        );


        setTimeout(() => {

            reels.forEach(
                reel => {
                    reel.classList.remove(
                        "jackpot"
                    );
                }
            );


            spinButton.disabled =
                false;

        },1200);


        return;

    }


    if (
        a === b
        &&
        b === c
        &&
        (
            a === "🍒"
            ||
            a === "🍋"
            ||
            a === "🍊"
        )
    ) {

        win(
            150,
            a + a + a
            + " フルーツ当たり！"
        );

        return;

    }


    let refund =
        false;


    if (
        paidSpin
        &&
        hasBuff("coinProtect")
        &&
        Math.random() < 0.25
    ) {

        coins +=
            getSpinCost();

        refund = true;

    }


    resultText.textContent =
        refund
            ? "💰 ハズレ……でもコイン保護発動！"
            : "💥 ハズレ……";


    spinButton.disabled =
        false;


    updateBest();
    updateDisplay();
    saveData();

}


// ==================================================
// スロット報酬
// ==================================================

function applySlotBuff(
    amount
) {

    let finalAmount =
        amount;


    if (
        hasBuff("gambler")
    ) {

        finalAmount =
            Math.floor(
                finalAmount * 1.2
            );

    }


    if (
        hasLuckyCharm()
    ) {

        finalAmount =
            Math.floor(
                finalAmount * 1.05
            );

    }


    return finalAmount;

}


function win(
    amount,
    message
) {

    const finalAmount =
        applySlotBuff(
            amount
        );


    coins +=
        finalAmount;


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


    reels.forEach(
        reel => {
            reel.classList.add(
                "jackpot"
            );
        }
    );


    setTimeout(() => {

        reels.forEach(
            reel => {
                reel.classList.remove(
                    "jackpot"
                );
            }
        );


        spinButton.disabled =
            false;

    },1000);

}


function jackpot() {

    const amount =
        applySlotBuff(
            10000
        );


    coins +=
        amount;


    resultText.textContent =
        "🎉🎉 777 JACKPOT!! +"
        + amount
        + "コイン 🎉🎉";


    resultText.classList.add(
        "win"
    );


    updateBest();
    updateDisplay();
    saveData();


    reels.forEach(
        reel => {
            reel.classList.add(
                "jackpot"
            );
        }
    );


    setTimeout(() => {

        reels.forEach(
            reel => {
                reel.classList.remove(
                    "jackpot"
                );
            }
        );


        spinButton.disabled =
            false;

    },1500);

}


// ==================================================
// 通常タイミングゲーム
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


startGameButton.addEventListener(
    "click",
    startMiniGame
);


retryGameButton.addEventListener(
    "click",
    startMiniGame
);


function startMiniGame() {

    if (
        dailyFreeAvailable
    ) {

        dailyFreeAvailable =
            false;

        miniGameFreeDate =
            today;

    }

    else {

        const cost =
            getMiniGameCost();


        if (
            coins < cost
        ) {

            alert(
                "💰 コインが足りません！"
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


    gameRunning = true;


    cursorPosition = 0;

    cursorDirection = 1;


    cursor.style.left =
        "0%";


    applyTimingZones();


    cursorAnimation =
        requestAnimationFrame(
            moveCursor
        );

}


function applyTimingZones() {

    let perfectRange = 3;

    let greatRange = 8;

    let goodRange = 15;


    if (
        hasBuff("focus")
    ) {

        perfectRange = 5;

        greatRange = 11;

        goodRange = 18;

    }


    if (
        hasLuckyCharm()
    ) {

        perfectRange += 1;

        greatRange += 1;

        goodRange += 1;

    }


    const goodLeft =
        50 - goodRange;


    const greatLeft =
        50 - greatRange;


    const perfectLeft =
        50 - perfectRange;


    document
        .getElementById(
            "goodZoneLeft"
        )
        .style.left =
        goodLeft + "%";


    document
        .getElementById(
            "goodZoneLeft"
        )
        .style.width =
        (
            greatLeft
            -
            goodLeft
        ) + "%";


    document
        .getElementById(
            "greatZoneLeft"
        )
        .style.left =
        greatLeft + "%";


    document
        .getElementById(
            "greatZoneLeft"
        )
        .style.width =
        (
            perfectLeft
            -
            greatLeft
        ) + "%";


    document
        .getElementById(
            "perfectZone"
        )
        .style.left =
        perfectLeft + "%";


    document
        .getElementById(
            "perfectZone"
        )
        .style.width =
        perfectRange * 2
        + "%";


    document
        .getElementById(
            "greatZoneRight"
        )
        .style.left =
        50
        +
        perfectRange
        + "%";


    document
        .getElementById(
            "greatZoneRight"
        )
        .style.width =
        (
            greatRange
            -
            perfectRange
        ) + "%";


    document
        .getElementById(
            "goodZoneRight"
        )
        .style.left =
        50
        +
        greatRange
        + "%";


    document
        .getElementById(
            "goodZoneRight"
        )
        .style.width =
        (
            goodRange
            -
            greatRange
        ) + "%";

}


function moveCursor() {

    if (
        !gameRunning
    ) {
        return;
    }


    cursorPosition +=
        cursorDirection
        *
        0.7;


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
        cursorPosition
        + "%";


    cursorAnimation =
        requestAnimationFrame(
            moveCursor
        );

}


stopGameButton.addEventListener(
    "click",
    stopMiniGame
);


function stopMiniGame() {

    if (
        !gameRunning
    ) {
        return;
    }


    gameRunning = false;


    cancelAnimationFrame(
        cursorAnimation
    );


    let perfectRange = 3;

    let greatRange = 8;

    let goodRange = 15;


    if (
        hasBuff("focus")
    ) {

        perfectRange = 5;

        greatRange = 11;

        goodRange = 18;

    }


    if (
        hasLuckyCharm()
    ) {

        perfectRange++;

        greatRange++;

        goodRange++;

    }


    const distance =
        Math.abs(
            cursorPosition - 50
        );


    let reward = 0;

    let message = "";


    if (
        distance <= perfectRange
    ) {

        reward =
            hasBuff("precision")
                ? 75
                : 50;

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


    if (
        reward > 0
        &&
        hasLuckyCharm()
    ) {

        reward =
            Math.floor(
                reward * 1.05
            );

    }


    if (
        reward > 0
    ) {

        miniGameStreak++;

    }

    else {

        miniGameStreak = 0;

    }


    let streakBonus = 0;


    if (
        reward > 0
        &&
        hasBuff("winStreak")
        &&
        miniGameStreak >= 3
    ) {

        streakBonus = 10;

        reward +=
            streakBonus;

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


    gameReward.textContent =
        reward > 0
            ? "+"
                + reward
                + "コイン"
                +
                (
                    streakBonus > 0
                        ? " 🔥連勝BONUS!"
                        : ""
                )
            : "コイン獲得なし";

}


// ==================================================
// 通常ハイ＆ロー
// ==================================================

const startHighLowButton =
    document.getElementById(
        "startHighLowButton"
    );


const highLowStartArea =
    document.getElementById(
        "highLowStartArea"
    );


const highLowPlayArea =
    document.getElementById(
        "highLowPlayArea"
    );


const highLowResultArea =
    document.getElementById(
        "highLowResultArea"
    );


const currentCard =
    document.getElementById(
        "currentCard"
    );


const highLowReward =
    document.getElementById(
        "highLowReward"
    );


const highButton =
    document.getElementById(
        "highButton"
    );


const lowButton =
    document.getElementById(
        "lowButton"
    );


const cashOutButton =
    document.getElementById(
        "cashOutButton"
    );


const highLowResult =
    document.getElementById(
        "highLowResult"
    );


const highLowResultReward =
    document.getElementById(
        "highLowResultReward"
    );


const highLowFailureInfo =
    document.getElementById(
        "highLowFailureInfo"
    );


const failurePreviousCard =
    document.getElementById(
        "failurePreviousCard"
    );


const failureNextCard =
    document.getElementById(
        "failureNextCard"
    );


const failureReason =
    document.getElementById(
        "failureReason"
    );


const retryHighLowButton =
    document.getElementById(
        "retryHighLowButton"
    );


let currentCardValue = 1;

let highLowPot = 10;

let highLowPlaying = false;


const cardLabels = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
];


function drawCard() {

    return Math.floor(
        Math.random() * 13
    ) + 1;

}


function showCard(
    value
) {

    currentCard.textContent =
        cardLabels[
            value - 1
        ];

}


startHighLowButton.addEventListener(
    "click",
    startHighLow
);


retryHighLowButton.addEventListener(
    "click",
    startHighLow
);


function startHighLow() {

    const entryCost = 10;


    if (
        coins < entryCost
    ) {

        alert(
            "💰 コインが足りません！"
        );

        return;

    }


    coins -= entryCost;


    highLowPot = 0;


    currentCardValue =
        drawCard();


    highLowPlaying = true;


    showCard(
        currentCardValue
    );


    highLowReward.textContent =
        highLowPot;


    highLowStartArea.classList.add(
        "hidden"
    );


    highLowResultArea.classList.add(
        "hidden"
    );


    highLowPlayArea.classList.remove(
        "hidden"
    );


    highLowFailureInfo.classList.add(
        "hidden"
    );


    updateBest();
    updateDisplay();
    saveData();

}


highButton.addEventListener(
    "click",
    () => checkHighLow("high")
);


lowButton.addEventListener(
    "click",
    () => checkHighLow("low")
);


function checkHighLow(
    choice
) {

    if (
        !highLowPlaying
    ) {
        return;
    }


    const previous =
        currentCardValue;


    const nextCard =
        drawCard();


    let correct = false;


    if (
        nextCard === previous
    ) {

        correct = true;

    }

    else if (
        choice === "high"
        &&
        nextCard > previous
    ) {

        correct = true;

    }

    else if (
        choice === "low"
        &&
        nextCard < previous
    ) {

        correct = true;

    }


    currentCardValue =
        nextCard;


    showCard(
        nextCard
    );


    if (correct) {

        const reward =
            hasBuff("highLowMaster")
                ? 40
                : 20;


        coins += reward;

        miniGameCoins += reward;


        miniGameStreak++;


        if (
            miniGameCoins >
            miniGameBest
        ) {

            miniGameBest =
                miniGameCoins;

        }


        highLowReward.textContent =
            reward
            + "コイン獲得";


        currentCard.style.transform =
            "scale(1.08)";


        setTimeout(() => {

            currentCard.style.transform =
                "scale(1)";

        },150);


        updateBest();
        updateDisplay();
        saveData();

    }

    else {

        highLowPlaying = false;

        miniGameStreak = 0;


        highLowPlayArea.classList.add(
            "hidden"
        );


        highLowResultArea.classList.remove(
            "hidden"
        );


        highLowResult.textContent =
            "💥 GAME OVER";


        highLowResultReward.textContent =
            "今回は0コイン";


        failurePreviousCard.textContent =
            cardLabels[
                previous - 1
            ];


        failureNextCard.textContent =
            cardLabels[
                nextCard - 1
            ];


        failureReason.textContent =
            choice === "high"
                ? "HIGHを選択しましたが、"
                    + cardLabels[
                        nextCard - 1
                    ]
                    + " が出たためハズレ！"
                : "LOWを選択しましたが、"
                    + cardLabels[
                        nextCard - 1
                    ]
                    + " が出たためハズレ！";


        highLowFailureInfo.classList.remove(
            "hidden"
        );


        updateDisplay();
        saveData();

    }

}


// ==================================================
// CASH OUT
// ==================================================

cashOutButton.addEventListener(
    "click",
    cashOutHighLow
);


function cashOutHighLow() {

    if (
        !highLowPlaying
    ) {
        return;
    }


    highLowPlaying = false;


    highLowPlayArea.classList.add(
        "hidden"
    );


    highLowResultArea.classList.remove(
        "hidden"
    );


    highLowResult.textContent =
        "🎉 終了";


    highLowResultReward.textContent =
        "ハイ＆ローは成功するたびに直接コインを獲得します！";


    highLowFailureInfo.classList.add(
        "hidden"
    );


    updateDisplay();

}


// ==================================================
// 数字記憶
// ==================================================

const memorySelectArea =
    document.getElementById(
        "memorySelectArea"
    );


const memoryDisplayArea =
    document.getElementById(
        "memoryDisplayArea"
    );


const memoryInputArea =
    document.getElementById(
        "memoryInputArea"
    );


const memoryResultArea =
    document.getElementById(
        "memoryResultArea"
    );


const memoryNumber =
    document.getElementById(
        "memoryNumber"
    );


const memoryInputDisplay =
    document.getElementById(
        "memoryInputDisplay"
    );


const memoryResult =
    document.getElementById(
        "memoryResult"
    );


const memoryResultReward =
    document.getElementById(
        "memoryResultReward"
    );


const digitButtons =
    document.querySelectorAll(
        ".digit-button"
    );


const calculatorButtons =
    document.querySelectorAll(
        "#memoryGame .calculator button"
    );


const memoryRewards = {

    3: 30,
    4: 50,
    5: 70,
    6: 100,
    7: 150,
    8: 200

};


let selectedDigits = 3;

let memoryAnswer = "";

let memoryInput = "";


digitButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                selectedDigits =
                    Number(
                        button.dataset.digits
                    );

                startMemoryGame();

            }
        );

    }
);


function createMemoryNumber(
    digits
) {

    let number = "";


    for (
        let i = 0;
        i < digits;
        i++
    ) {

        number +=
            Math.floor(
                Math.random() * 10
            );

    }


    return number;

}


function startMemoryGame() {

    const entryCost = 10;


    if (
        coins < entryCost
    ) {

        alert(
            "💰 コインが足りません！"
        );

        return;

    }


    coins -= entryCost;


    memoryAnswer =
        createMemoryNumber(
            selectedDigits
        );


    memoryInput = "";


    memoryInputDisplay.textContent =
        "_";


    memoryNumber.textContent =
        memoryAnswer;


    memorySelectArea.classList.add(
        "hidden"
    );


    memoryResultArea.classList.add(
        "hidden"
    );


    memoryInputArea.classList.add(
        "hidden"
    );


    memoryDisplayArea.classList.remove(
        "hidden"
    );


    updateDisplay();
    saveData();


    let displayTime = 1000;


    if (
        hasBuff("memory")
    ) {

        displayTime += 500;

    }


    if (
        hasLuckyCharm()
    ) {

        displayTime += 200;

    }


    setTimeout(() => {

        memoryDisplayArea.classList.add(
            "hidden"
        );


        memoryInputArea.classList.remove(
            "hidden"
        );

    },displayTime);

}


calculatorButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const key =
                    button.dataset.key;


                if (
                    key === "clear"
                ) {

                    memoryInput = "";

                    updateMemoryInput();

                    return;

                }


                if (
                    key === "enter"
                ) {

                    submitMemoryAnswer();

                    return;

                }


                if (
                    memoryInput.length >=
                    selectedDigits
                ) {

                    return;

                }


                memoryInput +=
                    key;


                updateMemoryInput();

            }
        );

    }
);


function updateMemoryInput() {

    memoryInputDisplay.textContent =
        memoryInput.length === 0
            ? "_"
            : memoryInput;

}


function submitMemoryAnswer() {

    if (
        memoryInput.length !==
        selectedDigits
    ) {

        return;

    }


    memoryInputArea.classList.add(
        "hidden"
    );


    memoryResultArea.classList.remove(
        "hidden"
    );


    if (
        memoryInput ===
        memoryAnswer
    ) {

        let reward =
            memoryRewards[
                selectedDigits
            ];


        if (
            hasLuckyCharm()
        ) {

            reward =
                Math.floor(
                    reward * 1.05
                );

        }


        miniGameStreak++;


        if (
            hasBuff("winStreak")
            &&
            miniGameStreak >= 3
        ) {

            reward += 10;

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


        memoryResult.textContent =
            "🧠 PERFECT!";


        memoryResultReward.textContent =
            "+"
            + reward
            + "コイン";

    }

    else {

        miniGameStreak = 0;


        memoryResult.textContent =
            "💥 MISS!";


        memoryResultReward.textContent =
            "正解："
            + memoryAnswer;

    }


    updateBest();
    updateDisplay();
    saveData();

}


const retryMemoryButton =
    document.getElementById(
        "retryMemoryButton"
    );


retryMemoryButton.addEventListener(
    "click",
    () => {

        memoryResultArea.classList.add(
            "hidden"
        );


        memorySelectArea.classList.remove(
            "hidden"
        );

    }
);


// ==================================================
// ミニゲームタブ
// ==================================================

const minigameTabs =
    document.querySelectorAll(
        ".minigame-tab"
    );


const minigameContents =
    document.querySelectorAll(
        ".minigame-content"
    );


minigameTabs.forEach(
    tab => {

        tab.addEventListener(
            "click",
            () => {

                const target =
                    tab.dataset.game;


                minigameTabs.forEach(
                    item => {
                        item.classList.remove(
                            "active"
                        );
                    }
                );


                tab.classList.add(
                    "active"
                );


                minigameContents.forEach(
                    content => {
                        content.classList.remove(
                            "active"
                        );
                    }
                );


                document
                    .getElementById(
                        target
                    )
                    .classList.add(
                        "active"
                    );

            }
        );

    }
);


// ==================================================
// バフ画面
// ==================================================

const equippedBuffsElement =
    document.getElementById(
        "equippedBuffs"
    );


const allBuffList =
    document.getElementById(
        "allBuffList"
    );


const slotBuffList =
    document.getElementById(
        "slotBuffList"
    );


const miniGameBuffList =
    document.getElementById(
        "miniGameBuffList"
    );


const otherBuffList =
    document.getElementById(
        "otherBuffList"
    );


const equippedCount =
    document.getElementById(
        "equippedCount"
    );


const buffSlotMaxElement =
    document.getElementById(
        "buffSlotMax"
    );


// ==================================================
// バフ描画
// ==================================================

function renderBuffs() {

    equippedBuffsElement.innerHTML =
        "";


    allBuffList.innerHTML =
        "";


    slotBuffList.innerHTML =
        "";


    miniGameBuffList.innerHTML =
        "";


    otherBuffList.innerHTML =
        "";


    equippedCount.textContent =
        equippedBuffs.length;


    buffSlotMaxElement.textContent =
        buffSlotMax;


    if (
        equippedBuffs.length === 0
    ) {

        equippedBuffsElement.innerHTML = `
            <div class="empty-buff">
                ⚡ 装備中のバフはありません
            </div>
        `;

    }

    else {

        equippedBuffs.forEach(
            id => {

                const buff =
                    buffData.find(
                        item =>
                            item.id === id
                    );


                if (!buff) {
                    return;
                }


                equippedBuffsElement.appendChild(
                    createBuffCard(
                        buff
                    )
                );

            }
        );

    }


    buffData.forEach(
        buff => {

            allBuffList.appendChild(
                createBuffCard(
                    buff
                )
            );

        }
    );


    buffData.forEach(
        buff => {

            const card =
                createBuffCard(
                    buff
                );


            if (
                buff.type === "slot"
            ) {

                slotBuffList.appendChild(
                    card
                );

            }

            else if (
                buff.type === "minigame"
            ) {

                miniGameBuffList.appendChild(
                    card
                );

            }

            else {

                otherBuffList.appendChild(
                    card
                );

            }

        }
    );


    attachBuffEvents();

}


function createBuffCard(
    buff
) {

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


    if (
        equipped
    ) {

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
                装備を外す
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
                    ? `
                        <div class="buff-owned">
                            ✓ 所持済み
                        </div>
                    `
                    : `
                        <div class="buff-price">
                            💰 ${buff.price}コイン
                        </div>
                    `
                }

            </div>

        </div>


        <div class="buff-description">
            ${buff.description}
        </div>


        ${buttonHTML}

    `;


    return card;

}


function attachBuffEvents() {

    document
        .querySelectorAll(
            "[data-buy]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        buyBuff(
                            button.dataset.buy
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-equip]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        equipBuff(
                            button.dataset.equip
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-unequip]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        unequipBuff(
                            button.dataset.unequip
                        );

                    }
                );

            }
        );

}


function buyBuff(
    id
) {

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


    ownedBuffs.push(
        id
    );


    saveData();

    updateDisplay();

    renderBuffs();


    alert(
        buff.icon
        + " "
        + buff.name
        + "を購入しました！"
    );

}


function equipBuff(
    id
) {

    if (
        equippedBuffs.includes(id)
    ) {
        return;
    }


    if (
        equippedBuffs.length >=
        buffSlotMax
    ) {

        alert(
            "⚡ 装備枠がいっぱいです！\n\n"
            + "タイムアタックでTコインを集めると、"
            + "装備枠を増やせます。"
        );

        return;

    }


    if (
        !ownedBuffs.includes(id)
    ) {
        return;
    }


    equippedBuffs.push(
        id
    );


    saveData();

    updateDisplay();

    renderBuffs();

}


function unequipBuff(
    id
) {

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
// バフタブ
// ==================================================

const buffTabs =
    document.querySelectorAll(
        ".buff-tab"
    );


const buffContents =
    document.querySelectorAll(
        ".buff-content"
    );


buffTabs.forEach(
    tab => {

        tab.addEventListener(
            "click",
            () => {

                const targetId =
                    tab.dataset.buffTab;


                buffTabs.forEach(
                    t => {
                        t.classList.remove(
                            "active"
                        );
                    }
                );


                tab.classList.add(
                    "active"
                );


                buffContents.forEach(
                    content => {
                        content.classList.remove(
                            "active"
                        );
                    }
                );


                const target =
                    document.getElementById(
                        targetId
                    );


                if (target) {

                    target.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


// ==================================================
// Tコイン・バフ枠
// ==================================================

function getNextBuffSlotCost() {

    const costs = {

        3: 5,
        4: 10,
        5: 20,
        6: 35,
        7: 50,
        8: 75,
        9: 100

    };


    return (
        costs[buffSlotMax + 1]
        ||
        999
    );

}


function updateBuffExpansionDisplay() {

    const count =
        document.getElementById(
            "buffSlotCount"
        );


    const nextCount =
        document.getElementById(
            "nextBuffSlotCount"
        );


    const nextCost =
        document.getElementById(
            "nextBuffSlotCost"
        );


    const button =
        document.getElementById(
            "expandBuffButton"
        );


    count.textContent =
        buffSlotMax;


    nextCount.textContent =
        buffSlotMax + 1;


    const cost =
        getNextBuffSlotCost();


    nextCost.textContent =
        cost;


    if (
        cost === 999
    ) {

        button.textContent =
            "これ以上拡張できません";


        button.disabled =
            true;

        return;

    }


    button.textContent =
        "🪙 "
        + cost
        + "Tでバフ枠を拡張";


    button.disabled =
        tCoins < cost;

}


function updateTimeAttackDisplay() {

    const tDisplay =
        document.getElementById(
            "tCoins"
        );


    const tPanel =
        document.getElementById(
            "tCoinsPanel"
        );


    const settingsT =
        document.getElementById(
            "settingsTCoins"
        );


    const best10k =
        document.getElementById(
            "best10kTime"
        );


    const best10min =
        document.getElementById(
            "best10minCoins"
        );


    const settingsBest10k =
        document.getElementById(
            "settingsBest10k"
        );


    const settingsBest10min =
        document.getElementById(
            "settingsBest10min"
        );


    if (tDisplay) {
        tDisplay.textContent =
            tCoins;
    }


    if (tPanel) {
        tPanel.textContent =
            tCoins;
    }


    if (settingsT) {
        settingsT.textContent =
            tCoins;
    }


    if (best10k) {

        best10k.textContent =
            best10kTime > 0
                ? formatTime(
                    best10kTime
                )
                : "--:--.--";

    }


    if (best10min) {

        best10min.textContent =
            best10minCoins
            + "コイン";

    }


    if (settingsBest10k) {

        settingsBest10k.textContent =
            best10kTime > 0
                ? formatTime(
                    best10kTime
                )
                : "--:--.--";

    }


    if (settingsBest10min) {

        settingsBest10min.textContent =
            best10minCoins;

    }


    updateBuffExpansionDisplay();

}


document
    .getElementById(
        "expandBuffButton"
    )
    .addEventListener(
        "click",
        expandBuffSlot
    );


function expandBuffSlot() {

    const cost =
        getNextBuffSlotCost();


    if (
        cost === 999
    ) {
        return;
    }


    if (
        tCoins < cost
    ) {

        alert(
            "🪙 Tコインが足りません！"
        );

        return;

    }


    if (
        !confirm(
            buffSlotMax
            + "枠 → "
            + (buffSlotMax + 1)
            + "枠\n\n"
            + cost
            + "Tコインを使って拡張しますか？"
        )
    ) {

        return;

    }


    tCoins -= cost;

    buffSlotMax++;


    saveData();

    updateDisplay();

    renderBuffs();


    alert(
        "⚡ バフ装備枠が "
        + buffSlotMax
        + "枠になりました！"
    );

}


// ==================================================
// タイムアタック
// ==================================================

let taActive = false;

let taMode = "";

let taCoins = 0;

let taStartTime = 0;

let taTimerInterval = null;

let taFinished = false;

let taActionRunning = false;


// ==================================================
// TA 要素
// ==================================================

const timeAttackStartArea =
    document.getElementById(
        "timeAttackStartArea"
    );


const timeAttackPlayArea =
    document.getElementById(
        "timeAttackPlayArea"
    );


const timeAttackResultArea =
    document.getElementById(
        "timeAttackResultArea"
    );


const timeAttackCoinsText =
    document.getElementById(
        "timeAttackCoins"
    );


const timeAttackTimer =
    document.getElementById(
        "timeAttackTimer"
    );


const timeAttackRemaining =
    document.getElementById(
        "timeAttackRemaining"
    );


const timeAttackModeName =
    document.getElementById(
        "timeAttackModeName"
    );


const taResultTitle =
    document.getElementById(
        "taResultTitle"
    );


const taResultScore =
    document.getElementById(
        "taResultScore"
    );


const start10kButton =
    document.getElementById(
        "start10kButton"
    );


const start10minButton =
    document.getElementById(
        "start10minButton"
    );


const taBackButton =
    document.getElementById(
        "taBackButton"
    );


const timeAttackQuitButton =
    document.getElementById(
        "timeAttackQuitButton"
    );


// ==================================================
// TA モード開始
// ==================================================

start10kButton.addEventListener(
    "click",
    () => {
        startTimeAttack(
            "10k"
        );
    }
);


start10minButton.addEventListener(
    "click",
    () => {
        startTimeAttack(
            "10min"
        );
    }
);


function startTimeAttack(
    mode
) {

    if (
        taActive
    ) {
        return;
    }


    taActive = true;

    taFinished = false;

    taMode = mode;

    taCoins = 0;

    taStartTime =
        performance.now();


    taActionRunning = false;


    timeAttackStartArea.classList.add(
        "hidden"
    );


    timeAttackResultArea.classList.add(
        "hidden"
    );


    timeAttackPlayArea.classList.remove(
        "hidden"
    );


    timeAttackModeName.textContent =
        mode === "10k"
            ? "🏆 1万コインチャレンジ"
            : "⏱️ 10分チャレンジ";


    timeAttackRemaining.textContent =
        mode === "10k"
            ? "10000"
            : "10:00";


    if (
        mode === "10min"
    ) {

        document
            .getElementById(
                "timeAttackGoal"
            )
            .innerHTML =
            "残り時間 "
            + "<strong>"
            + "10:00"
            + "</strong>";

    }

    else {

        document
            .getElementById(
                "timeAttackGoal"
            )
            .innerHTML =
            "10,000コインまであと "
            + "<strong>"
            + "10,000"
            + "</strong>"
            + " コイン";

    }


    resetTAAllGames();


    updateTA();


    taTimerInterval =
        setInterval(
            updateTATimer,
            50
        );

}


// ==================================================
// TA タイマー
// ==================================================

function updateTATimer() {

    if (
        !taActive
    ) {
        return;
    }


    const elapsed =
        performance.now()
        -
        taStartTime;


    if (
        taMode === "10k"
    ) {

        updateTATimer10k(
            elapsed
        );

    }

    else {

        updateTATimer10min(
            elapsed
        );

    }

}


function updateTATimer10k(
    elapsed
) {

    timeAttackTimer.textContent =
        formatTime(
            elapsed
        );


    if (
        taCoins >= 10000
    ) {

        finishTimeAttack(
            true
        );

    }

}


function updateTATimer10min(
    elapsed
) {

    const remaining =
        Math.max(
            0,
            600000 - elapsed
        );


    timeAttackTimer.textContent =
        formatTime(
            elapsed
        );


    const remainingSeconds =
        Math.ceil(
            remaining / 1000
        );


    const minutes =
        Math.floor(
            remainingSeconds / 60
        );


    const seconds =
        remainingSeconds % 60;


    timeAttackRemaining.textContent =
        minutes
        + ":"
        +
        String(
            seconds
        ).padStart(
            2,
            "0"
        );


    document
        .getElementById(
            "timeAttackGoal"
        )
        .innerHTML =
        "残り時間 "
        + "<strong>"
        + minutes
        + ":"
        + String(
            seconds
        ).padStart(
            2,
            "0"
        )
        + "</strong>";


    if (
        elapsed >= 600000
    ) {

        finishTimeAttack(
            true
        );

    }

}


// ==================================================
// TA 表示
// ==================================================

function updateTA() {

    timeAttackCoinsText.textContent =
        taCoins;


    if (
        taMode === "10k"
    ) {

        timeAttackRemaining.textContent =
            Math.max(
                0,
                10000 - taCoins
            );

    }

}


// ==================================================
// TA 時間表示
// ==================================================

function formatTime(
    milliseconds
) {

    const totalCentiseconds =
        Math.floor(
            milliseconds / 10
        );


    const minutes =
        Math.floor(
            totalCentiseconds
            / 6000
        );


    const seconds =
        Math.floor(
            (
                totalCentiseconds
                % 6000
            )
            / 100
        );


    const centiseconds =
        totalCentiseconds
        % 100;


    return (
        String(
            minutes
        ).padStart(
            2,
            "0"
        )
        +
        ":"
        +
        String(
            seconds
        ).padStart(
            2,
            "0"
        )
        +
        "."
        +
        String(
            centiseconds
        ).padStart(
            2,
            "0"
        )
    );

}


// ==================================================
// TA コイン追加
// ==================================================

function addTACoins(
    amount
) {

    if (
        !taActive
    ) {
        return;
    }


    taCoins +=
        amount;


    updateTA();


    if (
        taMode === "10k"
        &&
        taCoins >= 10000
    ) {

        finishTimeAttack(
            true
        );

    }

}


// ==================================================
// TA スロット
// ==================================================

const taSpinButton =
    document.getElementById(
        "taSpinButton"
    );


const taSlotResult =
    document.getElementById(
        "taSlotResult"
    );


const taReels = [

    document.getElementById(
        "taReel1"
    ),

    document.getElementById(
        "taReel2"
    ),

    document.getElementById(
        "taReel3"
    )

];


taSpinButton.addEventListener(
    "click",
    taSpin
);


function getTASlotResult() {

    const random =
        Math.random();


    if (
        random < 0.0001
    ) {

        return [
            "7️⃣",
            "7️⃣",
            "7️⃣"
        ];

    }


    if (
        random < 0.0011
    ) {

        return [
            "💎",
            "💎",
            "💎"
        ];

    }


    if (
        random < 0.0111
    ) {

        return [
            "⭐",
            "⭐",
            "⭐"
        ];

    }


    if (
        random < 0.0611
    ) {

        return [
            "🔔",
            "🔔",
            "🔔"
        ];

    }


    if (
        random < 0.1111
    ) {

        return [
            "🍒",
            "🍒",
            "🍒"
        ];

    }


    if (
        random < 0.1611
    ) {

        return [
            "🍋",
            "🍋",
            "🍋"
        ];

    }


    if (
        random < 0.2111
    ) {

        return [
            "🍊",
            "🍊",
            "🍊"
        ];

    }


    let result;


    do {

        result = [

            symbols[
                Math.floor(
                    Math.random()
                    * symbols.length
                )
            ],

            symbols[
                Math.floor(
                    Math.random()
                    * symbols.length
                )
            ],

            symbols[
                Math.floor(
                    Math.random()
                    * symbols.length
                )
            ]

        ];

    }

    while (
        result[0] === result[1]
        &&
        result[1] === result[2]
    );


    return result;

}


function taSpin() {

    if (
        !taActive
        ||
        taActionRunning
    ) {
        return;
    }


    if (
        taCoins < 50
    ) {

        taSlotResult.textContent =
            "💰 50コイン必要！";

        return;

    }


    taCoins -= 50;


    taActionRunning = true;

    taSpinButton.disabled =
        true;


    taSlotResult.textContent =
        "回転中……";


    taReels.forEach(
        reel => {
            reel.classList.add(
                "spinning"
            );
        }
    );


    const result =
        getTASlotResult();


    setTimeout(() => {

        stopTAReel(
            0,
            result[0]
        );

    },400);


    setTimeout(() => {

        stopTAReel(
            1,
            result[1]
        );

    },650);


    setTimeout(() => {

        stopTAReel(
            2,
            result[2]
        );


        checkTASlotResult(
            result
        );

    },900);

}


function stopTAReel(
    index,
    symbol
) {

    taReels[index]
        .classList.remove(
            "spinning"
        );


    taReels[index].textContent =
        symbol;

}


function checkTASlotResult(
    result
) {

    const [
        a,
        b,
        c
    ] = result;


    let reward = 0;

    let message =
        "💥 ハズレ";


    if (
        a === "7️⃣"
        &&
        b === "7️⃣"
        &&
        c === "7️⃣"
    ) {

        reward = 10000;

        message =
            "🎉 777 JACKPOT!";

    }

    else if (
        a === "💎"
        &&
        b === "💎"
        &&
        c === "💎"
    ) {

        reward = 5000;

        message =
            "💎💎💎 +5000!";

    }

    else if (
        a === "⭐"
        &&
        b === "⭐"
        &&
        c === "⭐"
    ) {

        reward = 3000;

        message =
            "⭐⭐⭐ +3000!";

    }

    else if (
        a === "🔔"
        &&
        b === "🔔"
        &&
        c === "🔔"
    ) {

        reward = 500;

        message =
            "🔔🔔🔔 +500!";

    }

    else if (
        a === b
        &&
        b === c
        &&
        (
            a === "🍒"
            ||
            a === "🍋"
            ||
            a === "🍊"
        )
    ) {

        reward = 150;

        message =
            "🍒🍋🍊 +150!";

    }


    if (
        reward > 0
    ) {

        addTACoins(
            reward
        );

    }


    taSlotResult.textContent =
        message;


    taActionRunning =
        false;


    taSpinButton.disabled =
        false;


    updateTA();

}


// ==================================================
// TA タイミング
// ==================================================

const taTimingStartButton =
    document.getElementById(
        "taTimingStartButton"
    );


const taTimingStopButton =
    document.getElementById(
        "taTimingStopButton"
    );


const taTimingMessage =
    document.getElementById(
        "taTimingMessage"
    );


const taCursor =
    document.getElementById(
        "taCursor"
    );


let taTimingRunning =
    false;


let taCursorPosition = 0;


let taCursorDirection = 1;


let taCursorAnimation = null;


taTimingStartButton.addEventListener(
    "click",
    startTATiming
);


taTimingStopButton.addEventListener(
    "click",
    stopTATiming
);


function startTATiming() {

    if (
        !taActive
        ||
        taTimingRunning
    ) {
        return;
    }


    if (
        taCoins < 10
    ) {

        taTimingMessage.textContent =
            "💰 10コイン必要！";

        return;

    }


    taCoins -= 10;


    taTimingRunning = true;


    taCursorPosition = 0;

    taCursorDirection = 1;


    taCursor.style.left =
        "0%";


    taTimingStartButton.classList.add(
        "hidden"
    );


    taTimingStopButton.classList.remove(
        "hidden"
    );


    taTimingMessage.textContent =
        "中央でSTOP！";


    applyTATimingZones();


    taCursorAnimation =
        requestAnimationFrame(
            moveTACursor
        );


    updateTA();

}


function applyTATimingZones() {

    let perfectRange = 3;

    let greatRange = 8;

    let goodRange = 15;


    const goodLeft =
        50 - goodRange;


    const greatLeft =
        50 - greatRange;


    const perfectLeft =
        50 - perfectRange;


    document
        .getElementById(
            "taGoodZoneLeft"
        )
        .style.left =
        goodLeft + "%";


    document
        .getElementById(
            "taGoodZoneLeft"
        )
        .style.width =
        (
            greatLeft
            -
            goodLeft
        ) + "%";


    document
        .getElementById(
            "taGreatZoneLeft"
        )
        .style.left =
        greatLeft + "%";


    document
        .getElementById(
            "taGreatZoneLeft"
        )
        .style.width =
        (
            perfectLeft
            -
            greatLeft
        ) + "%";


    document
        .getElementById(
            "taPerfectZone"
        )
        .style.left =
        perfectLeft + "%";


    document
        .getElementById(
            "taPerfectZone"
        )
        .style.width =
        perfectRange * 2
        + "%";


    document
        .getElementById(
            "taGreatZoneRight"
        )
        .style.left =
        50
        +
        perfectRange
        + "%";


    document
        .getElementById(
            "taGreatZoneRight"
        )
        .style.width =
        (
            greatRange
            -
            perfectRange
        ) + "%";


    document
        .getElementById(
            "taGoodZoneRight"
        )
        .style.left =
        50
        +
        greatRange
        + "%";


    document
        .getElementById(
            "taGoodZoneRight"
        )
        .style.width =
        (
            goodRange
            -
            greatRange
        ) + "%";

}


function moveTACursor() {

    if (
        !taTimingRunning
    ) {
        return;
    }


    taCursorPosition +=
        taCursorDirection
        *
        0.7;


    if (
        taCursorPosition >= 98
    ) {

        taCursorPosition = 98;

        taCursorDirection = -1;

    }


    if (
        taCursorPosition <= 0
    ) {

        taCursorPosition = 0;

        taCursorDirection = 1;

    }


    taCursor.style.left =
        taCursorPosition
        + "%";


    taCursorAnimation =
        requestAnimationFrame(
            moveTACursor
        );

}


function stopTATiming() {

    if (
        !taTimingRunning
    ) {
        return;
    }


    taTimingRunning = false;


    cancelAnimationFrame(
        taCursorAnimation
    );


    const distance =
        Math.abs(
            taCursorPosition - 50
        );


    let reward = 0;

    let message = "";


    if (
        distance <= 3
    ) {

        reward = 50;

        message =
            "🎯 PERFECT! +50";

    }

    else if (
        distance <= 8
    ) {

        reward = 30;

        message =
            "✨ GREAT! +30";

    }

    else if (
        distance <= 15
    ) {

        reward = 15;

        message =
            "👍 GOOD! +15";

    }

    else {

        reward = 0;

        message =
            "💥 MISS!";

    }


    addTACoins(
        reward
    );


    taTimingMessage.textContent =
        message;


    taTimingStartButton.classList.remove(
        "hidden"
    );


    taTimingStopButton.classList.add(
        "hidden"
    );


    updateTA();

}


// ==================================================
// TA ハイ＆ロー
// ==================================================

const taHighLowStartButton =
    document.getElementById(
        "taHighLowStartButton"
    );


const taHighButton =
    document.getElementById(
        "taHighButton"
    );


const taLowButton =
    document.getElementById(
        "taLowButton"
    );


const taCurrentCard =
    document.getElementById(
        "taCurrentCard"
    );


const taHighLowReward =
    document.getElementById(
        "taHighLowReward"
    );


let taHighLowPlaying =
    false;


let taHighLowCard = 1;


taHighLowStartButton.addEventListener(
    "click",
    startTAHighLow
);


taHighButton.addEventListener(
    "click",
    () => checkTAHighLow("high")
);


taLowButton.addEventListener(
    "click",
    () => checkTAHighLow("low")
);


function startTAHighLow() {

    if (
        !taActive
        ||
        taHighLowPlaying
    ) {
        return;
    }


    taHighLowCard =
        drawCard();


    taHighLowPlaying = true;


    taCurrentCard.textContent =
        cardLabels[
            taHighLowCard - 1
        ];


    taHighLowStartButton.classList.add(
        "hidden"
    );

}


function checkTAHighLow(
    choice
) {

    if (
        !taHighLowPlaying
    ) {
        return;
    }


    const previous =
        taHighLowCard;


    const next =
        drawCard();


    const correct =
        next === previous
        ||
        (
            choice === "high"
            &&
            next > previous
        )
        ||
        (
            choice === "low"
            &&
            next < previous
        );


    taHighLowCard =
        next;


    taCurrentCard.textContent =
        cardLabels[
            next - 1
        ];


    if (
        correct
    ) {

        addTACoins(
            20
        );


        taHighLowReward.textContent =
            "20";


        taCurrentCard.style.transform =
            "scale(1.08)";


        setTimeout(() => {

            taCurrentCard.style.transform =
                "scale(1)";

        },150);

    }

    else {

        taHighLowPlaying =
            false;


        taHighLowStartButton.classList.remove(
            "hidden"
        );


        taHighLowReward.textContent =
            "20";


        taCurrentCard.style.transform =
            "scale(1)";


    }

}


// ==================================================
// TA 数字記憶
// ==================================================

const taMemorySelect =
    document.getElementById(
        "taMemorySelect"
    );


const taMemoryDisplay =
    document.getElementById(
        "taMemoryDisplay"
    );


const taMemoryInput =
    document.getElementById(
        "taMemoryInput"
    );


const taMemoryNumber =
    document.getElementById(
        "taMemoryNumber"
    );


const taMemoryInputDisplay =
    document.getElementById(
        "taMemoryInputDisplay"
    );


let taMemoryAnswer =
    "";


let taMemoryEntered =
    "";


let taMemoryDigits =
    3;


const taMemoryRewards = {

    3: 30,
    4: 50,
    5: 70,
    6: 100

};


document
    .querySelectorAll(
        ".ta-memory-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    taMemoryDigits =
                        Number(
                            button.dataset.taDigits
                        );


                    startTAMemory();

                }
            );

        }
    );


function startTAMemory() {

    if (
        !taActive
    ) {
        return;
    }


    if (
        taCoins < 10
    ) {

        return;

    }


    taCoins -= 10;


    taMemoryAnswer =
        createMemoryNumber(
            taMemoryDigits
        );


    taMemoryEntered =
        "";


    taMemoryNumber.textContent =
        taMemoryAnswer;


    taMemoryInputDisplay.textContent =
        "_";


    taMemorySelect.classList.add(
        "hidden"
    );


    taMemoryInput.classList.add(
        "hidden"
    );


    taMemoryDisplay.classList.remove(
        "hidden"
    );


    updateTA();


    setTimeout(() => {

        if (
            !taActive
        ) {
            return;
        }


        taMemoryDisplay.classList.add(
            "hidden"
        );


        taMemoryInput.classList.remove(
            "hidden"
        );

    },1000);

}


document
    .querySelectorAll(
        "[data-ta-key]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const key =
                        button.dataset.taKey;


                    if (
                        key === "clear"
                    ) {

                        taMemoryEntered =
                            "";

                    }

                    else if (
                        key === "enter"
                    ) {

                        submitTAMemory();

                        return;

                    }

                    else if (
                        taMemoryEntered.length
                        <
                        taMemoryDigits
                    ) {

                        taMemoryEntered +=
                            key;

                    }


                    taMemoryInputDisplay.textContent =
                        taMemoryEntered
                        ||
                        "_";

                }
            );

        }
    );


function submitTAMemory() {

    if (
        taMemoryEntered.length
        !==
        taMemoryDigits
    ) {
        return;
    }


    taMemoryInput.classList.add(
        "hidden"
    );


    taMemorySelect.classList.remove(
        "hidden"
    );


    if (
        taMemoryEntered ===
        taMemoryAnswer
    ) {

        addTACoins(
            taMemoryRewards[
                taMemoryDigits
            ]
        );

    }


    else {

        updateTA();

    }

}


// ==================================================
// TA ゲームタブ
// ==================================================

document
    .querySelectorAll(
        ".ta-game-tab"
    )
    .forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    if (
                        !taActive
                    ) {
                        return;
                    }


                    const target =
                        tab.dataset.taGame;


                    document
                        .querySelectorAll(
                            ".ta-game-tab"
                        )
                        .forEach(
                            item => {
                                item.classList.remove(
                                    "active"
                                );
                            }
                        );


                    document
                        .querySelectorAll(
                            ".ta-game-content"
                        )
                        .forEach(
                            content => {
                                content.classList.remove(
                                    "active"
                                );
                            }
                        );


                    tab.classList.add(
                        "active"
                    );


                    document
                        .getElementById(
                            target
                        )
                        .classList.add(
                            "active"
                        );

                }
            );

        }
    );


// ==================================================
// TA ゲームリセット
// ==================================================

function resetTAAllGames() {

    taActionRunning = false;


    taTimingRunning = false;


    cancelAnimationFrame(
        taCursorAnimation
    );


    taHighLowPlaying = false;


    taMemoryAnswer =
        "";


    taMemoryEntered =
        "";


    taSpinButton.disabled =
        false;


    taSpinButton.classList.remove(
        "hidden"
    );


    taTimingStartButton.classList.remove(
        "hidden"
    );


    taTimingStopButton.classList.add(
        "hidden"
    );


    taMemorySelect.classList.remove(
        "hidden"
    );


    taMemoryDisplay.classList.add(
        "hidden"
    );


    taMemoryInput.classList.add(
        "hidden"
    );


    taReels[0].textContent =
        "🍒";


    taReels[1].textContent =
        "🍋";


    taReels[2].textContent =
        "⭐";


    taSlotResult.textContent =
        "START！";


    taTimingMessage.textContent =
        "STARTを押してください";


    taHighLowStartButton.classList.remove(
        "hidden"
    );


    taHighLowReward.textContent =
        "20";


    document
        .querySelectorAll(
            ".ta-game-tab"
        )
        .forEach(
            tab => {
                tab.classList.remove(
                    "active"
                );
            }
        );


    document
        .querySelector(
            '.ta-game-tab[data-ta-game="taSlot"]'
        )
        .classList.add(
            "active"
        );


    document
        .querySelectorAll(
            ".ta-game-content"
        )
        .forEach(
            content => {
                content.classList.remove(
                    "active"
                );
            }
        );


    document
        .getElementById(
            "taSlot"
        )
        .classList.add(
            "active"
        );

}


// ==================================================
// TA 終了
// ==================================================

timeAttackQuitButton.addEventListener(
    "click",
    quitTimeAttack
);


function quitTimeAttack() {

    if (
        !taActive
    ) {
        return;
    }


    if (
        !confirm(
            "タイムアタックを途中終了しますか？\n\n"
            + "この回はTコインを獲得できません。"
        )
    ) {

        return;

    }


    taActive = false;


    clearInterval(
        taTimerInterval
    );


    cancelAnimationFrame(
        taCursorAnimation
    );


    taTimingRunning = false;

    taHighLowPlaying = false;


    timeAttackPlayArea.classList.add(
        "hidden"
    );


    timeAttackResultArea.classList.add(
        "hidden"
    );


    timeAttackStartArea.classList.remove(
        "hidden"
    );


    resetTAAllGames();

    updateTimeAttackDisplay();

}


// ==================================================
// TA 完走
// ==================================================

function finishTimeAttack(
    completed
) {

    if (
        !taActive
        ||
        taFinished
    ) {
        return;
    }


    taFinished = true;

    taActive = false;


    clearInterval(
        taTimerInterval
    );


    cancelAnimationFrame(
        taCursorAnimation
    );


    taTimingRunning = false;

    taHighLowPlaying = false;


    const elapsed =
        performance.now()
        -
        taStartTime;


    let rewardT = 0;


    if (
        completed
    ) {

        rewardT = 1;

        tCoins += 1;

    }


    if (
        taMode === "10k"
    ) {

        if (
            completed
            &&
            (
                best10kTime === 0
                ||
                elapsed < best10kTime
            )
        ) {

            best10kTime =
                elapsed;

        }


        taResultTitle.textContent =
            "🏆 10,000 COINS!";


        taResultScore.textContent =
            "達成タイム\n"
            + formatTime(
                elapsed
            );

    }

    else {

        if (
            taCoins >
            best10minCoins
        ) {

            best10minCoins =
                taCoins;

        }


        taResultTitle.textContent =
            "⏱️ TIME UP!";


        taResultScore.textContent =
            "10分間で\n"
            + taCoins
            + "コイン獲得！";

    }


    taResultAreaShow(
        rewardT
    );


    saveData();

    updateDisplay();

}


// ==================================================
// TA 結果表示
// ==================================================

function taResultAreaShow(
    rewardT
) {

    timeAttackPlayArea.classList.add(
        "hidden"
    );


    timeAttackStartArea.classList.add(
        "hidden"
    );


    timeAttackResultArea.classList.remove(
        "hidden"
    );


    const rewardElement =
        document.querySelector(
            ".ta-t-coin-reward"
        );


    rewardElement.textContent =
        rewardT > 0
            ? "🪙 +1 Tコイン！"
            : "Tコイン獲得なし";


    updateTimeAttackDisplay();

}


// ==================================================
// TA 戻る
// ==================================================

taBackButton.addEventListener(
    "click",
    () => {

        timeAttackResultArea.classList.add(
            "hidden"
        );


        timeAttackStartArea.classList.remove(
            "hidden"
        );


        updateTimeAttackDisplay();

    }
);


// ==================================================
// リセット
// ==================================================

const resetDataButton =
    document.getElementById(
        "resetDataButton"
    );


resetDataButton.addEventListener(
    "click",
    () => {

        if (
            !confirm(
                "ゲームデータをリセットしますか？"
            )
        ) {

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

        miniGameStreak = 0;

        tCoins = 0;

        buffSlotMax = 2;

        best10kTime = 0;

        best10minCoins = 0;


        if (
            taActive
        ) {

            taActive = false;

            clearInterval(
                taTimerInterval
            );

            cancelAnimationFrame(
                taCursorAnimation
            );

        }


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
// 最初から
// ==================================================

const restartGameButton =
    document.getElementById(
        "restartGameButton"
    );


restartGameButton.addEventListener(
    "click",
    () => {

        if (
            !confirm(
                "⚠️ 本当に最初からやり直しますか？"
            )
        ) {

            return;

        }


        if (
            !confirm(
                "本当にいいですか？\n\n"
                + "この操作は元に戻せません。"
            )
        ) {

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

        miniGameStreak = 0;

        tCoins = 0;

        buffSlotMax = 2;

        best10kTime = 0;

        best10minCoins = 0;


        taActive = false;

        taFinished = false;


        clearInterval(
            taTimerInterval
        );


        cancelAnimationFrame(
            taCursorAnimation
        );


        gameRunning = false;


        cancelAnimationFrame(
            cursorAnimation
        );


        saveData();


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

applyTimingZones();

applyTATimingZones();

resetTAAllGames();
