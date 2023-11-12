let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(shopItemsData);
let lable = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);
}

calculation();

let generateCartItems = ()=> {
    if(basket.length !== 0) {
        console.log("basket is not");
        return shoppingCart.innerHTML = basket.map((x)=> {
            let {id, item} = x;
            let search = shopItemsData.find((y)=> y.id === id) || [];
            return `
                <div class="cart-item">
                    <img src="${search.img}" width=125/>
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${search.name}</p>
                                <p class="cart-item-price">$ ${search.price}</p>
                            </h4>
                            <i onclick = "removeItems('${id}')" class="bi bi-x-lg"></i>
                        </div>

                        <div class="buttons">
                        <i onclick = "decrement('${id}')" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick = "increment('${id}')" class="bi bi-plus-lg"></i>
                    </div>

                        <h3>$ ${item * search.price}</h3>
                    </div>
                </div>
            `
        }).join("");
    } else {
        shoppingCart.innerHTML = ``;
        lable.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>
        `
    }
}
generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem);
    if(search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1,
        })
    } else {
        search.item++;
    }
    update(selectedItem);
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem);
    if(search.item === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item--;
    }
    update(selectedItem);
    basket= basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x)=> x.id == id)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItems = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let TotalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x)=> {
            let {item, id} = x;
            let search = shopItemsData.find((y)=> y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0);

        label.innerHTML = `
            <h2> Total Bill : $ ${amount} </h2>
            <button class="checkout">Checkout</button>
            <button onclick = "clearCart()" class="removeAll">Clear Cart</button>
        `
    }
    else return;
}

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

TotalAmount();