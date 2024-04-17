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
    "HERO": "60461804"
};

(() => {
    const UNKNOWN_IMAGE = '63442604';
    const renderPieChart = ((placement) => {
        const tableHeader = document.getElementById('tournament_archetypes_header');
        if (tableHeader.nextElementSibling.dataset.archetypeImg === UNKNOWN_IMAGE) return;
        let column = placement ? [...tableHeader.children].findIndex((e) => (e.innerText === placement)) : -1;
        if (column === -1) column = (tableHeader.children.length - 1);
        const archetypes = [];
        let total = 0;
        let row = tableHeader;
        while ((row = row.nextElementSibling)) {
            const quantity = parseInt(row.children[column].innerText);
            if (quantity) {
                const archetypeName = row.firstElementChild.innerText;
                // const archetypeImg = row.dataset.archetypeImg;
                const archetypeImg = ARCHETYPE_TO_CODE[archetypeName];
                archetypes.push([archetypeName, archetypeImg, quantity]);
                total += quantity;
            }
        }
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
