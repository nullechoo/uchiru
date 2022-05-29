
const favLink = document.querySelector('.link__fav');
const container = document.querySelector('.container');
const array = JSON.parse(localStorage.getItem('main'));
const array2 = JSON.parse(localStorage.getItem('favorites'));
const goodArr = [];


function reloadLocal(){
    array.forEach(element => {
        if (element != undefined) {
            if (element.checked === true) {
                goodArr[element.key] = element;
                localStorage.setItem('favorites', JSON.stringify(goodArr));
                
            } 
        }
    })
}



function checkUrl() {
    if (window.location.pathname === '/fav.html') {
        favLink.classList.add('active');
    }
}

function handlerClickButton(e) {
    const test = e.target;
    if (array[test.id].checked === true) {
        test.classList.remove('active');
        let gg = JSON.parse(localStorage.getItem('main'));
        gg[test.id].checked = false;
        localStorage.setItem('main', JSON.stringify(gg));
        let rr = JSON.parse(localStorage.getItem('favorites'));
        if(JSON.parse(localStorage.getItem('favorites')).filter(el => el != null).length === 1){
            localStorage.removeItem('favorites');
        } else { 
            rr[array[test.id]] = null;
        }
        window.location.reload();
    }
}

function parseFav() {
    for (let i = 0; i < array.length; i++) {
        if (array[i] != undefined && array[i] != null) {
            if (array[i].checked != false) {
                generateCards(array[i]);

            }
        } else if (array[i] === null || array[i] === undefined) {
            console.log('Уууппс... пустой элемент, видимо что-то с API');
        }
    }
}

function generateCards(atr) {
    const card = document.createElement('div');
    const favBtn = document.createElement('button');
    favBtn.className = 'btn active';
    favBtn.id = atr.key;
    favBtn.addEventListener('click', handlerClickButton, true);
    card.className = 'text';
    card.id = atr.id;
    card.style.backgroundImage = 'url(' + atr.url + ')';
    container.appendChild(card);
    card.appendChild(favBtn);
}

function init() {
    console.log(JSON.parse(localStorage.getItem('favorites')));
    checkUrl();
    reloadLocal()
    parseFav();
}

init();