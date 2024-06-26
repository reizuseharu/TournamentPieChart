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
                const archetypeImg = row.dataset.archetypeImg;
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
            // const s = renderPieSlice('#tournament_piechart', archetypeName, 'url(http://localhost:63342/TournamentPieChart/piechart/src/img/' + archetypeImg + '.jpg)', quantity);
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
