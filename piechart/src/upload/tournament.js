const UNKNOWN_IMAGE = '63442604';
const ARCHETYPE_TO_CODE = {
    "Snake-Eye": "9674034",
    "Fire King": "66431519",
    "Fire King Snake-Eye": "66431519",
    "Kashtira": "32909498",
    "Branded": "44146295",
    "Despia": "72272462",
    "Branded Bystial": "33854624",
    "Bystial": "33854624",
    "Bystial Branded": "33854624",
    "Runick": "55990317",
    "Floowandereeze": "80611581",
    "Floo": "80611581",
    "Voiceless Voice": "25801745",
    "Voiceless": "25801745",
    "Labrynth": "2347656",
    "Tearlaments": "92731385",
    "Tear": "92731385",
    "Dragon Link": "73539069",
    "DLink": "73539069",
    "Spright": "76145933",
    "Purrely": "83827392",
    "Rescue-ACE": "37495766",
    "Unchained": "29479265",
    "Plant Link": "93896655",
    "Rikka Sunavalon": "93896655",
    "RikkaSun": "93896655",
    "Superheavy Samurai": "82112494",
    "Superheavy": "82112494",
    "SHS": "82112494",
    "Mannadium": "71277255",
    "Dinomorphia": "48832775",
    "Salamangreat": "26889158",
    "Evil Eye": "82466274",
    "Yubel": "78371393",
    "Horus": "84941194",
    "Chain Burn": "91623717",
    "Stun": "42009836",
    "Vanquish Soul": "91073013",
    "VS": "91073013",
    "Mathmech": "36521307",
    "Cyberse": "59859086",
    "Dino": "38572779",
    "Dinos": "38572779",
    "Zombie": "04064256",
    "Zombies": "04064256",
    "Centur-Ion": "15005145",
    "Centurion": "15005145",
    "Mikanko": "81260679",
    "Infernoble": "77656797",
    "Swordsoul": "20001443",
    "SwoSo": "20001443",
    "If My Girl": "20001443",
    "Sky Striker": "63288573",
    "Striker": "63288573",
    "Thunder Dragon": "15291624",
    "Thundra": "15291624",
    "Orcust": "57835716",
    "Zoodiac": "48905153",
    "Zoo": "48905153",
    "Drytron": "97148796",
    "Cyber Dragon": "10443957",
    "Cydra": "10443957",
    "HERO": "60461804",
    "Exosister": "59242457",
    "Exo": "59242457",
    "Vaylantz": "49131917",
    "Tenyi": "87052196",
    "The Phantom Knights": "26692769",
    "The Weather": "54178659",
    "Therion": "10604644",
    "Traptrix": "73639099",
    "Tri-Brigade": "99726621",
    "Lightsworn": "57774843",
    "Scareclaw": "59120809",
    "Shaddoll": "20366274",
    "Shark": "07150545",
    "Simorgh": "72330894",
    "Sinful Spoils": "24081957",
    "Six Samurai": "29981921",
    "Speedroid": "81275020",
    "Springans": "48285768",
    "Spyral": "01322368",
    "Subterror": "16428514",
    "Synchron": "77075360",
    "Raidraptor": "86221741",
    "RR": "86221741",
    "P.U.N.K.": "19535693",
    "PUNK": "19535693",
    "Punk": "19535693",
    "Paleozoic": "38761908",
    "Phantasm Spiral": "02819435",
    "Plunder Patroll": "67647362",
    "Prank-Kids": "18236002",
    "Predaplant": "70369116",
    "Nekroz": "52068432",
    "Numeron": "41418852",
    "Madolche": "37164373",
    "Magical Musket": "32841045",
    "Marincess": "91953000",
    "Mekk-Knight": "20537097",
    "Melodious": UNKNOWN_IMAGE,
    "Mermail": "22446869",
    "Atlantean": "21565445",
    "Myutant": UNKNOWN_IMAGE,
    "Libromancer": "16312943",
    "Knightmare": "10158145",
    "Ice Barrier": UNKNOWN_IMAGE,
    "Icejade": "86682165",
    "Infernity": UNKNOWN_IMAGE,
    "Infernoid": UNKNOWN_IMAGE,
    "Infinitrack": "23689428",
    "Earth Machine": UNKNOWN_IMAGE,
    "Invoked": "86120751",
    "Harpie": "76812113",
    "Generaider": "38053381",
    "Goblin Biker": UNKNOWN_IMAGE,
    "Gimmick Puppet": UNKNOWN_IMAGE,
    "Gold Pride": "92003832",
    "Gravekeeper": "47355498",
    "Flame Swordsman": UNKNOWN_IMAGE,
    "Fur Hire": "66023650",
    "Earthbound": UNKNOWN_IMAGE,
    "Fluffal": "61173621",
    "D/D/D": "46593546",
    "Danger!": "43694650",
    "Dark Magician": "46986414",
    "Red-Eyes": "74677422",
    "Blue-Eyes": "89631139",
    "Dark World": UNKNOWN_IMAGE,
    "Dragon Ruler": "53804307",
    "Crusadia": "45002991",
    "Cyberdark": UNKNOWN_IMAGE,
    "Battlin Boxer": UNKNOWN_IMAGE,
    "Beetrooper": UNKNOWN_IMAGE,
    "Buster Blader": "78193831",
    "Adamancipator": "94689206",
    "Altergeist": "42790071",
    "Ashened": "78783557",
};

const CHART_DATA = [
    ["Purrely", 10],
    ["Kashtira", 16],
    ["Mikanko", 6]
];

(() => {
    const UNKNOWN_IMAGE = '63442604';
    const renderPieChart = ((placement) => {
        const archetypes = [];
        let total = 0;

        CHART_DATA.forEach((element) => {
            const [archetypeName, quantity] = element;
            const archetypeImg = ARCHETYPE_TO_CODE[archetypeName];
            archetypes.push([archetypeName, archetypeImg, quantity]);
            total += quantity;
        });

        archetypes.sort((x, y) => {
            const qX = (x[1] === UNKNOWN_IMAGE) ? 0 : x[2];
            const qY = (y[1] === UNKNOWN_IMAGE) ? 0 : y[2];
            return (qY - qX);
        });
        initPiechart('#tournament_piechart', total);
        for (const [archetypeName, archetypeImg, quantity] of archetypes) {
            const s = renderPieSlice('#tournament_piechart', archetypeName, 'url(https://images.ygoprodeck.com/images/cards_cropped/' + archetypeImg + '.jpg)', quantity);
            if (archetypeImg === UNKNOWN_IMAGE) s.addClass('slice-other');
        }
    });
    document.querySelectorAll('#tournament_archetypes_header .as-tablecell').forEach((e) => {
        e.addEventListener('click', () => {
            renderPieChart(e.innerText);
        });
    });
    renderPieChart();
})();
