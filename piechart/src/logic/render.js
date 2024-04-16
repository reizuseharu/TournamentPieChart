function renderArticleCard(data){let article_card=`<div class="deck_article-card-container">
            <a href="/article/${data.pretty_url}/">
                <div class="d-flex flex-column deck_article-card lazy" data-src="${data.article_image?data.article_image:data.image_card}" title="${data.deck_name?data.deck_name:data.title}">
                    <div class="d-flex flex-column deck_article-card-overlay">
                        <div class="justify-content-between align-items-start deck_article-card-top text-left">
                            <div class="article-type-badge">${data.format?data.format:data.type?data.type:'Article'}</div>
                        </div>
                        <div class="d-flex flex-column deck_article-card-details text-white">
                            <h5 class="deck_article-card-title text-left mb-0">${data.deck_name?data.deck_name:data.title}</h5>
                            ${data.excerpt?`<span class="deck_article-card-excerpt text-left">${data.excerpt}</span>`:''}
                            <div class="deck_article-card-stats" style="font-size: 13px;">
                                <div class="d-flex align-items-center text-left" style="gap: 4px; flex: 1 0 0;">
                                    <span class="deck_article-avatar mt-1"><img src="${data.img_url?data.img_url:''}" title="${data.username} avatar" loading="lazy"></span>
                                    ${data.username} - ${data.submit_date}
                                </div>
                                <div class="d-flex align-items-center deck_article-views-comments" style="gap: 8px;">
                                    <span><i class="fa-solid fa-eye"></i> ${data.deck_views||data.deck_views===0?data.deck_views.toLocaleString():data.views.toLocaleString()}</span>
                                    <span><i class="fa-solid fa-messages"></i> ${data.comments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>`;return article_card;}
function renderArticleListItem(data){let article_list_item=`<a class="text-decoration-none w-100" href="/article/${data.pretty_url}">
            <div class="d-flex align-items-center s_m-article-li">
                <div class="d-flex justify-content-center align-items-center s_m-article-li-img-frame">
                    <img data-src="${data.image_card}" class="article-li-img-lazy">
                </div>
                <div class="d-flex flex-column" style="padding: 8px; gap: 8px;">
                    <span class="s_m-article-li-title" style="font-weight: 700;">${data.title}</span>
                    <div class="d-flex align-items-center text-primary" style="gap: 2px; font-size: 13px;">
                        <span class="deck_article-avatar"><img src="${data.img_url?data.img_url:''}" title="${data.username} avatar" loading="lazy"></span>
                        ${data.username}
                    </div>
                    <div class="d-flex s_m-article-li-stats" style="gap: 8px; font-size: 13px;">
                        <span><i class="fa-solid fa-eye"></i> ${data.views.toLocaleString()}</span>
                        <span><i class="fa-solid fa-messages"></i> ${data.comments}</span>
                        <span><i class="fa-solid fa-clock"></i> ${data.submit_date}</span>
                    </div>
                </div>
            </div>
        </a>`;return article_list_item;}
function renderGridDeckCards(container,decks,mode,clearContainer=true){const ctr=jQuery(container);if(clearContainer===true){ctr.empty();}
for(const deck of decks){const elem=jQuery('<div class="deck_article-card-container">'+
'<a>'+
'<div class="d-flex flex-column deck_article-card lazy">'+
'<div class="d-flex flex-column deck_article-card-overlay">'+
'<div class="justify-content-between align-items-start deck_article-card-top text-left">'+
'<div class="deck-type-badge text-center"></div>'+
'<div class="deck-cost-wrapper text-white">'+
'<div class="deck-cost-badge"><i class="fa-solid fa-cart-shopping"></i></div>'+
'<div class="deck-cost-badge mt-1"></div>'+
'</div>'+
'</div>'+
'<div class="d-flex flex-column deck_article-card-details text-white">'+
'<h5 class="deck_article-card-title text-left mb-0"></h5>'+
'<span class="deck_article-card-excerpt text-left"></span>'+
'<div class="deck_article-card-stats text-left" style="font-size: 13px;">'+
'<div class="d-flex align-items-center text-left" style="gap: 4px; flex: 1 0 0;">'+
'<span class="deck_article-avatar mt-1"></span>'+
'</div>'+
'<div class="d-flex align-items-center deck_article-views-comments" style="gap: 8px;">'+
'<span><i class="fa-solid fa-eye"></i> </span>'+
'<span><i class="fa-solid fa-messages"></i> </span>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</a>'+
'</div>').appendTo(ctr);const isTournament=deck.format.toLowerCase().includes('tournament meta decks');let coverCard='';if(deck.cover_card){coverCard=deck.cover_card;}else if(deck.main_deck){const maindeckarray=JSON.parse(deck.main_deck);coverCard=maindeckarray[0];}
elem.find('a').attr('href','/deck/'+deck.pretty_url);elem.find('.deck_article-card').attr('title',deck.deck_name).attr('data-src','https://images.ygoprodeck.com/images/cards_cropped/'+coverCard+'.jpg');elem.find('.deck_article-card-title').text(deck.deck_name);if(mode==='tournament'||isTournament){elem.find('.deck-cost-wrapper').remove();if(deck.tournamentName){elem.find('.deck-type-badge').text(deck.tournamentName);elem.find('.deck_article-card-excerpt').remove();elem.find('.deck_article-card-stats').addClass('d-block').html('<span class="mr-1"></span><span></span>');elem.find('.deck_article-card-stats').children().first().html('<i class="fa-solid fa-trophy" aria-hidden="true"></i> ').appendText(deck.tournamentPlacement+' ('+(deck.tournamentPlayerCountIsApproximate?'~':'')+deck.tournamentPlayerCount+' players)');elem.find('.deck_article-card-stats').children().eq(1).html(' <i class="fa-regular fa-calendar" aria-hidden="true"></i> ').appendText(deck.submit_date);if(deck.tournamentPlayerName){elem.find('.deck_article-card-stats').append(' piloted by <span class="ml-1"><i class="fa-solid fa-user" aria-hidden="true"></i> '+deck.tournamentPlayerName+'</span>');}}else{elem.find('.deck-type-badge').remove();elem.find('.deck_article-card-excerpt').text(deck.deck_excerpt);elem.find('.deck_article-card-stats').remove();}}else{elem.find('.deck-type-badge').text(deck.format);elem.find('.deck-cost-wrapper').children().first().appendText(deck.deck_price?' $'+deck.deck_price:' -');elem.find('.deck-cost-wrapper').children().eq(1).html('<img src="https://images.ygoprodeck.com/images/cards/icons/master_duel/super_rare.png" class="md-craft-icons" title="Master Duel Super Rare Craft Cost"> ').appendText(deck.super||'-').append(' <img src="https://images.ygoprodeck.com/images/cards/icons/master_duel/ultra_rare.png" class="md-craft-icons" title="Master Duel Ultra Rare Craft Cost"> ').appendText(deck.ultra||'-');elem.find('.deck_article-card-excerpt').text(deck.deck_excerpt);elem.find('.deck_article-avatar').html('<img src="'+(deck.img_url||'')+'" title="'+deck.username+' avatar" loading="lazy">');elem.find('.deck_article-card-stats').children().first().appendText(deck.username+' - '+deck.submit_date);elem.find('.deck_article-views-comments').children().first().appendText(deck.deck_views.toLocaleString());elem.find('.deck_article-views-comments').children().eq(1).appendText(deck.comments);}}
ctr.find('.lazy').Lazy({defaultImage:"https://images.ygoprodeck.com/images/assets/CardBack.jpg",scrollDirection:'vertical',effect:"fadeIn",effectTime:500,threshold:0,visibleOnly:true,onError:function(element){console.log('error loading '+element.data('src'));}});}
function getPieChart(sel){let elm=sel;if(typeof(sel)==='string')
elm=document.querySelector(sel);if(!elm){console.warn('Piechart with selector \''+sel+'\' not found.');return null;}
if(!elm.classList.contains('piechart-container')){console.log('Element with selector \''+sel+'\' is not a pie chart (.piechart-container missing).');return null;}
return elm;}
function initPiechart(sel,total){const pie=getPieChart(sel);if(!pie)return;jQuery(pie).empty();pie.piechartCurrent=0;pie.piechartTotal=total;}
function getPiechartRenderProgress(sel){const pie=getPieChart(sel);if(!pie)return{current:0,total:0};return{current:pie.piechartCurrent,total:pie.piechartTotal};}
function renderPieSlice(sel,label,img,value,onClick){const pie=getPieChart(sel);if(!pie)return;const slice=jQuery('<span class="piechart-slice"></span>').prop('title',label+' ('+value+')').css('background-image',img);if(value<pie.piechartTotal){let startingRadians=2*Math.PI*((pie.piechartCurrent/pie.piechartTotal)-.25);pie.piechartCurrent+=value;let endingRadians=2*Math.PI*((pie.piechartCurrent/pie.piechartTotal)-.25);const extremesPerSector=['calc(100% - 2px) 0%','calc(100% - 2px) calc(100% - 2px)','0% calc(100% - 2px)','0% 0%'];const pointForXY=((x,y,d)=>('calc('+((1+x)*50)+'% - '+d*y+'px) calc('+((1+y)*50)+'% + '+d*x+'px)'));const sectorForXY=((x,y)=>((x>=0)?((y<=0)?0:1):((y>=0)?2:3)));const startingX=Math.cos(startingRadians);const startingY=Math.sin(startingRadians);const startingSector=sectorForXY(startingX,startingY);const endingX=Math.cos(endingRadians);const endingY=Math.sin(endingRadians);const endingSector=sectorForXY(endingX,endingY);const middleX=Math.cos((startingRadians+endingRadians)/2);const middleY=Math.sin((startingRadians+endingRadians)/2);let clipPath=['calc(50% + '+middleX*2+'px) calc(50% + '+middleY*2+'px)'];clipPath.push(pointForXY(startingX,startingY,+2));for(let i=startingSector;i<=endingSector;++i){clipPath.push(extremesPerSector[i]);}
clipPath.push(pointForXY(endingX,endingY,-2));const leftEdge=(((startingSector<=2)&&(2<endingSector))?-1:Math.min(startingX,endingX,0))/2+.5;const rightEdge=(((startingSector<=0)&&(0<endingSector))?1:Math.max(startingX,endingX,0))/2+.5;const topEdge=Math.min(startingY,endingY,0)/2+.5;const bottomEdge=(((startingSector<=1)&&(1<endingSector))?1:Math.max(startingY,endingY,0))/2+.5;const backgroundSize=Math.max(rightEdge-leftEdge,bottomEdge-topEdge);const leftBackgroundImageEdge=(leftEdge+rightEdge-backgroundSize)/2;const topBackgroundImageEdge=(topEdge+bottomEdge-backgroundSize)/2;slice.css('clip-path','polygon('+clipPath.join(',')+')').css('background-size',backgroundSize*100+'% '+backgroundSize*100+'%').css('background-position-x','calc('+leftBackgroundImageEdge+' * var(--piechart-size))').css('background-position-y','calc('+topBackgroundImageEdge+' * var(--piechart-size))');}else{slice.css('background-size','100% 100%');}
if(onClick)
slice.click(onClick);slice.appendTo(pie);return slice;}
function renderLongHex(item){let cubeType='';if(item.type==1){cubeType='Singleton';}else{cubeType='Multiple';}
const formatDate=new Date(item.date_created);const cubeDate=formatDate.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});const hex=`<div class="hex-content p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268 557" fill="none">
                <mask id="path-1-inside-1_2764_10557" fill="white">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.712 1.11293C132.222 -0.370975 135.342 -0.370976 137.852 1.11293L263.634 75.4528C266.07 76.8922 267.564 79.5109 267.564 82.3399V235.286V235.911V320.267V393.423V473.838C267.564 476.667 266.07 479.286 263.634 480.725L137.852 555.065C135.342 556.549 132.222 556.549 129.712 555.065L3.92959 480.725C1.49414 479.286 0 476.667 0 473.838V393.423V320.267V235.911V235.286V82.3399C0 79.5109 1.49414 76.8922 3.92959 75.4528L129.712 1.11293Z"/>
                </mask>
                <path class="hex-bg" fill-rule="evenodd" clip-rule="evenodd" d="M129.712 1.11293C132.222 -0.370975 135.342 -0.370976 137.852 1.11293L263.634 75.4528C266.07 76.8922 267.564 79.5109 267.564 82.3399V235.286V235.911V320.267V393.423V473.838C267.564 476.667 266.07 479.286 263.634 480.725L137.852 555.065C135.342 556.549 132.222 556.549 129.712 555.065L3.92959 480.725C1.49414 479.286 0 476.667 0 473.838V393.423V320.267V235.911V235.286V82.3399C0 79.5109 1.49414 76.8922 3.92959 75.4528L129.712 1.11293Z"/>
                <path class="hex-border" d="M3.92959 480.725L3.42079 481.586L3.92959 480.725ZM137.852 555.065L138.361 555.926L137.852 555.065ZM129.712 555.065L130.22 554.204L129.712 555.065ZM263.634 480.725L264.143 481.586L263.634 480.725ZM137.852 1.11293L137.344 1.97381L137.852 1.11293ZM129.712 1.11293L129.203 0.252044L129.712 1.11293ZM263.634 75.4528L263.126 76.3137L263.634 75.4528ZM264.143 74.5919L138.361 0.252043L137.344 1.97381L263.126 76.3137L264.143 74.5919ZM268.564 235.286V82.3399H266.564V235.286H268.564ZM268.564 235.911V235.286H266.564V235.911H268.564ZM268.564 320.267V235.911H266.564V320.267H268.564ZM266.564 320.267V393.423H268.564V320.267H266.564ZM266.564 393.423V473.838H268.564V393.423H266.564ZM263.126 479.864L137.344 554.204L138.361 555.926L264.143 481.586L263.126 479.864ZM130.22 554.204L4.4384 479.864L3.42079 481.586L129.203 555.926L130.22 554.204ZM1 473.838V393.423H-1V473.838H1ZM1 393.423V320.267H-1V393.423H1ZM-1 235.911V320.267H1V235.911H-1ZM-1 235.286V235.911H1V235.286H-1ZM-1 82.3399V235.286H1V82.3399H-1ZM129.203 0.252044L3.42079 74.5919L4.4384 76.3137L130.22 1.97381L129.203 0.252044ZM1 82.3399C1 79.8645 2.30737 77.5732 4.4384 76.3137L3.42079 74.5919C0.68091 76.2113 -1 79.1573 -1 82.3399H1ZM4.4384 479.864C2.30737 478.605 1 476.314 1 473.838H-1C-1 477.021 0.68091 479.967 3.42079 481.586L4.4384 479.864ZM137.344 554.204C135.147 555.503 132.417 555.503 130.22 554.204L129.203 555.926C132.027 557.595 135.537 557.595 138.361 555.926L137.344 554.204ZM266.564 473.838C266.564 476.314 265.257 478.605 263.126 479.864L264.143 481.586C266.883 479.967 268.564 477.021 268.564 473.838H266.564ZM138.361 0.252043C135.537 -1.41735 132.027 -1.41735 129.203 0.252044L130.22 1.97381C132.417 0.675397 135.147 0.675396 137.344 1.97381L138.361 0.252043ZM263.126 76.3137C265.257 77.5732 266.564 79.8645 266.564 82.3399H268.564C268.564 79.1573 266.883 76.2113 264.143 74.5919L263.126 76.3137Z" mask="url(#path-1-inside-1_2764_10557)"/>
                <foreignobject x="0" y="0" width="268" height="557">
                    <div class="pt-3 px-3 mb-2 d-flex justify-content-center">
                        <div class="position-relative hex-img-border w-100">
                            <div class="position-absolute hex-img-inner" data-src="https://images.ygoprodeck.com/images/cards_cropped/${item.cube_img}.jpg"></div>
                        </div>
                    </div>
                    <div class="d-flex flex-column px-3" style="gap: 8px;">
                        <div class="text-truncate w-100 font-weight-bold">${item.cube_name}</div>
                        <div class="cube-desc">${item.cube_description}</div>
                    </div>
                    <div class="cube-divider my-3"></div>
                    <div class="px-3">
                        <div class="d-flex align-items-center" style="gap: 4px;">
                            <div class="d-flex align-items-baseline text-primary" style="gap: 2px; max-width: 50%;">
                                <span class="deck_article-avatar" style="margin-top: 2px;">
                                    <img src="${item.img_url}" title="${item.username} avatar" loading="lazy">
                                </span>
                                <span class="text-truncate" style="font-size: 13px;">${item.username}</span>
                            </div>
                            <div class="d-flex align-items-baseline sub-text">
                                <div class="d-flex justify-content-center align-items-center" style="width: 24px; height: 24px;"><i class="fa-solid fa-calendar"></i></div>
                                <span style="font-size: 13px;">${cubeDate}</span>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap" style="gap: 4px; margin-top: 4px;">
                            <div class="d-flex align-items-baseline sub-text">
                                <div class="d-flex justify-content-center align-items-center" style="width: 24px; height: 24px;"><i class="fa-solid fa-cube"></i></div>
                                <span style="font-size: 13px;">${item.cube_size.toLocaleString()}</span>
                            </div>
                            <div class="d-flex align-items-baseline sub-text">
                                <div class="d-flex justify-content-center align-items-center" style="width: 24px; height: 24px;"><i class="fa-solid fa-eye"></i></div>
                                <span style="font-size: 13px;">${item.views.toLocaleString()}</span>
                            </div>
                            <div class="d-flex align-items-baseline sub-text">
                                <div class="d-flex justify-content-center align-items-center" style="width: 24px; height: 24px;"><i class="fa-solid fa-book-blank"></i></div>
                                <span style="font-size: 13px;">${cubeType}</span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center" style="margin-top: 23px;">
                        <div class="position-relative hex-btn-border">
                            <a href="/cube/view-cube/${item.cube_id}" target="_blank" class="btn d-flex justify-content-center align-items-center position-absolute hex-btn" title="View Cube" aria-label="View Cube">
                                <i class="fa-solid fa-angles-right"></i>
                            </a>
                        </div>
                    </div>
                </foreignobject>
            </svg>
        </div>`;return hex;}