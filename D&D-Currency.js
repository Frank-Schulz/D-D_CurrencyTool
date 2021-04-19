const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Base values
let copper = 1;
let silver = 2;
let electrum = 3;
let gold = 4;
let platinum = 5;

// Player getting reward
// let players = ['Kolt', 'Urr', 'Slate'];

// Compiled, electrum and gold types
let eCurrency = [platinum, gold, electrum, silver, copper];
let gCurrency = [platinum, gold += electrum, silver, copper];

let currencyType = eCurrency;

// console.log(eCurrency);
// console.log(gCurrency);

// Convert all coins to the highest available coin type
function roundUp(coinPouch) {
    let carry = 0;
    for (let coin = coinPouch.length - 1; coin >= 0; coin--) {
        coinPouch[coin] += carry;
        carry = Math.floor(coinPouch[coin] / 10)// || 0;
        coinPouch[coin] = coinPouch[coin] % 10;
    }
    coinPouch[0] += carry * 10;
    // console.log(coinPouch);
    return coinPouch;
}
// console.log(roundUp(eCurrency));
// console.log(roundUp(gCurrency));

// Convert all coins to the lowest available coin type
function roundDown(coinPouch) {
    for (var i = 0; i < coinPouch.length - 1; i++) {
        coin = +coinPouch.splice(i, 1, 0);
        coinPouch[i + 1] = +coinPouch[i + 1] + coin * 10;
    }
    console.log(`
    ${coinPouch[coinPouch.length - 1]} copper pieces`);
    return coinPouch;
}
// console.log(currencyType);
// console.log(roundDown(currencyType));

// console.log(roundUp(currencyType));

class Player {
    constructor(pName, pPouch = 0) {
        this.pName = pName;
        this.pPouch = pPouch;
    }
}

class Party {
    constructor(...members) {
        this.members = members;

    }

    // add members to party : seperate multiple names with commas
    addMembers(...players) {
        players.forEach(player => {
            this.members.push(new Player(player));
        });
    }

    // add members to party : seperate multiple names with commas
    addMember(...players) {
        players.forEach(player => {
            this.members.push(new Player(player));
        });
    }

    // Divide currency loot between players
    lootDivide(loot, players = this.members) {
        loot = roundDown(loot);

        let div = loot.map(x => Math.floor(+x / (players.length || players)));

        console.log(`    ${div[div.length - 1]} copper pieces each (minimum)
        `);

        let lootEach = [Array.from(div), Array.from(div), Array.from(div)];
        let lootRemainder = loot[loot.length - 1] % (players.length || players);
        // console.log(lootRemainder);

        for (let i = 0; lootRemainder > 0; i++) {
            i > loot.length ? i = 0 : false;
            lootEach[i][loot.length - 1] += 1;
            lootRemainder--;
        }

        this.members.forEach(member => {
            // set random cut position for splice method
            let cut = Math.floor(Math.random() * lootEach.length);
            // randomly assign couch pouches to party members
            member.pPouch = roundUp(lootEach.splice(cut, 1).flat());

        });
        console.log(this.members);
    }
}

let EggGang = new Party();
EggGang.addMembers('Kolt', 'Urr', 'Slate');

// console.log(EggGang);

// console.log(EggGang.members);

// EggGang.lootDivide(currencyType, 2);
// EggGang.lootDivide(currencyType, EggGang.members);
// console.table(EggGang.members);

let test = new Party();
rlNewMember();

function rlNewMember() {
    rl.question(`Add a member. 'c' to stop adding
    `, (member) => {
        if (member !== 'c') {
            test.addMember(member);
            rlNewMember();
            return;
        } else {
            rl.question(`Loot/Reward format: 'pp, gp, ep, sp, cp'
            `, (coin) => {
                // console.log(coin.split(','));
                test.lootDivide(coin.split(','))
                // close the stream
                rlClose();
            });
        }


    });
}

function rlClose() {
    rl.close();
    // console.log(test.members);
    // console.log(test.members[1]);
}

