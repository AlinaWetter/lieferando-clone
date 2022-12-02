let basketDishes = []
let prices = []
let amounts = []

function renderBasket() {
    let basket = document.getElementById('basket');

    if (basketDishes.length < 1) {
        basket.innerHTML = emptyBasketHtml();
    } else {
        basket.innerHTML = '';
        for (i = 0; i < basketDishes.length; i++) {
            basket.innerHTML += basketDishHtml(i);
        }
        basket.innerHTML += totalCosts();
    }
}

function addDishId() {
    let dish = document.getElementsByClassName("single-dish");
    for (n = 0; n < dish.length; n++) {
        dish[n].id = "dish" + (n + 1);
    }
}

function addPriceId() {
    let price = document.getElementsByClassName("single-price");
    for (n = 0; n < price.length; n++) {
        price[n].id = "price" + (n + 1);
    }
}

function addButtonId(n) {
    let button = document.getElementsByClassName("icon-background");
    for (n = 0; n < button.length; n++) {
        button[n].id = (n + 1);
    }
}

function getValues(i) {
    let basketDish = document.getElementById(`dish${i}`).textContent;
    let basketPriceWithEuro = document.getElementById(`price${i}`).textContent;

    let basketPrice = parseFloat(basketPriceWithEuro).toFixed(2);

    addDishToArray(basketDish, basketPrice);
}

function addDishToArray(basketDish, basketPrice) {
    let index = getMenuIndex(basketDish);

    if (index < 0) {
        basketDishes.push(basketDish)
        prices.push(basketPrice)
        amounts.push(1)
    } else {
        let x1 = Number(prices[index])
        let x2 = Number(basketPrice)
        prices[index] = (x1 + x2).toFixed(2)
        amounts[index]++
    }

    renderBasket();
}

function plusOne(basketDish, price, amount) {
    let index = getMenuIndex(basketDish);

    let x1 = Number(price)
    let x2 = Number(price / amount)
    prices[index] = (x1 + x2).toFixed(2)
    amounts[index]++

    renderBasket();
    totalCosts();
}

function minusOne(basketDish, price, amount) {
    let index = getMenuIndex(basketDish);

    if (amount == 1) {
        basketDishes.splice(index, 1)
        prices.splice(index, 1)
        amounts.splice(index, 1)
    } else {
        let x1 = Number(price)
        let x2 = Number(price / amount)
        prices[index] = (x1 - x2).toFixed(2)
        amounts[index]--
    }

    renderBasket();
    totalCosts();
}

function getMenuIndex(i) {
    let idx = basketDishes.indexOf(i);
    return idx;
}

function addDish(clicked_id) {
    getValues(clicked_id);
}

function totalCosts() {
    let finalPrice = prices.reduce(returnPrice, 2.50);

     return endPriceHtml(finalPrice);
}

function controlPrice() {
    let total = prices.reduce(returnPrice, 0);
    i = 10 - total;
    if (total < 10) {
        let input = i.toFixed(2);
        document.getElementById('alert').style.display = 'block';
        document.getElementById('alert').innerHTML = priceAlertHtml(input);
    }
}

function returnPrice(total, value) {
    return Number(total) + Number(value);
}

function openResMenu() {
    let basket = document.getElementById('basketSection')
    let basketChild = document.getElementById('basket')

    if (basket.classList.contains('basket-section')) {
        basket.classList.add('responsive-basket'); 
        basket.classList.remove('basket-section');
        basketChild.classList.add('small-basket');
        basketChild.classList.remove('basket');
        body.classList.add('stop-scrolling');
    } else {
        closeResMenu(basket, basketChild, body)
    }

}

function closeResMenu(basket, basketChild, body) {
    basket.classList.remove('responsive-basket'); 
    basket.classList.add('basket-section');
    basketChild.classList.remove('small-basket');
    basketChild.classList.add('basket');
    body.classList.remove('stop-scrolling');
}

function changeHeart() {
    let heart = document.getElementById('heart');
    if(heart.src = './img/heart.png') {
        heart.src = './img/filled-heart.png'
    }
}

////// HTML //////

function emptyBasketHtml() {
    return `
    <div>
        <img class="basketImg" src="./img/shopping-bag.png" alt="">
        <h3>Fülle deinen Warenkorb</h3>
        <span>Suche dir ein paar Leckere Speisen aus und bestelle hier.</span>
    </div>
    `
}

function basketDishHtml(i) {
    return `
    <div class="basket-dish">
        <div class="basket-dish-child">
            <span>${amounts[i]}</span>
            <div class="basket-dish-child-small">
                <span>${basketDishes[i]}</span>
                <span>${prices[i]}€</span>
            </div>
        </div>
        <div class="basket-dish-child">
            <a href>Anmerkung hinzufügen</a>
                <img onclick="plusOne('${basketDishes[i]}', ${prices[i]}, ${amounts[i]})" src="./img/plus.png" alt="">
                <img onclick="minusOne('${basketDishes[i]}', ${prices[i]}, ${amounts[i]})" src="./img/minus-sign.png" alt="">
        </div>
    </div>
    `
}

function endPriceHtml(finalPrice) {
    return `
    <div class="final-price-div">
        <div class="alert" id="alert" >
        </div>
        <span>Mbw: 10.00€</span>
        <span>Lieferkosten: 2.50€</span>
        <span>Summe: ${finalPrice.toFixed(2)}</span>
        <button onclick="controlPrice()">
            Bezahlen
        </button>
    </div>
    `
}

function priceAlertHtml(input) {
    return `
    <span> Bis zum Mindestbestellwert von 10.00€ fehlen noch ${input}€. Bitte fügen Sie noch weitere Speisen hinzu. </span>
    `;
}

