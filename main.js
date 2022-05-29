const API_KEY = 'eb8cf3e2-4ad4-4787-9522-41830b6399a3';
const container = document.querySelector('.container');
const reload = document.getElementById('reload__js');
const Link = document.querySelector('.link');
const mainArray = [];
const rootElement = document.getElementById("container");
const loader = document.getElementById("loading");
const loader__main = document.getElementById("loading__main");

var imgCount = 0;


function main() {
    localStorage.removeItem('main');
    for (let a = 0; a < 999; a++) {
        fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}`)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                let check;
                let check_id;
                if (json[0] === null || json[0] === undefined) {
                    check = JSON.parse(localStorage.getItem('main'))[0].url;
                    check_id = JSON.parse(localStorage.getItem('main'))[0].id;
                    mainArray[a] = {
                        key: a,
                        url: check,
                        id: check_id,
                        checked: false
                    }
                } else {
                    check = json[0].url;
                    check_id = json[0].id;
                    mainArray[a] = {
                        key: a,
                        url: check,
                        id: check_id,
                        checked: false
                    }
                }

                if (a === 998) {
                    localStorage.setItem('main', JSON.stringify(mainArray));
                    window.location.reload();
                }
            });

    }

}


function parseLocal() {
    
    if (imgCount !== 999) {
        const array = JSON.parse(localStorage.getItem('main'));
        setTimeout(() => {
            for (let i = imgCount; i < imgCount + 30; i++) {
                if(array[i] === null || array[i] === undefined){
                    generateCards(array[0]);
                } else {
                    generateCards(array[i]);
                }
            }
            imgCount += 30;
        }, 500)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.25
    };

    function handleIntersect(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (imgCount !== 999 && mainArray != [] ) {
                    parseLocal()
                }
            }
        });
    }

    let observer = new IntersectionObserver(handleIntersect,
        options);
        if (JSON.parse(localStorage.getItem('main')) === undefined
        || JSON.parse(localStorage.getItem('main')) === null
        || JSON.parse(localStorage.getItem('main')) === []) {
            loader.classList.add('hide');
            loader__main.classList.remove('hide');
            observer.observe(loader__main);
        } else {
            loader.classList.remove('hide');
            loader__main.classList.add('hide');
            observer.observe(loader);
        }
    
})

function saveLocal() {
    if (JSON.parse(localStorage.getItem('main')) === undefined
        || JSON.parse(localStorage.getItem('main')) === null
        || JSON.parse(localStorage.getItem('main')) === []) {
        main();
    } else if (JSON.parse(localStorage.getItem('main')).length === 999) {

        parseLocal()
    }
}

function generateCards(atr) {
    const card = document.createElement('div');
    const favBtn = document.createElement('button');
    favBtn.className = atr.checked === true && atr.checked != null ? 'btn active' : 'btn';
    favBtn.id = atr.key;
    favBtn.addEventListener('click', handlerClickButton, true);
    card.className = 'text';
    card.id = atr.id;
    //card.innerText = atr.key;
    card.style.backgroundImage = 'url(' + atr.url + ')';
    card.appendChild(favBtn);
    container.appendChild(card);
}


function handlerClickButton(e) {
    const test = e.target;
    if (!test.classList.contains('active')) {
        test.classList.add('active');
        let gg = JSON.parse(localStorage.getItem('main'));
        gg[test.id].checked = true;
        localStorage.setItem('main', JSON.stringify(gg));
    } else {
        test.classList.remove('active');
        let gg = JSON.parse(localStorage.getItem('main'));
        gg[test.id].checked = false;
        localStorage.setItem('main', JSON.stringify(gg));
    }
}

function checkUrl() {
    if (window.location.pathname === '/index.html') {
        Link.classList.add('active');
    }
}

function handlerReload() {
    main();
    localStorage.removeItem('favorites');
    window.location.pathname === '/index.html';
    window.location.reload();
}

function init() {
    saveLocal();
    checkUrl();
    reload.addEventListener('click', handlerReload);
}

init();