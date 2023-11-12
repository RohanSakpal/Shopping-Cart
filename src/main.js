let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

// let shopItemsData = [
//     {
//         Id: "sdkjk",
//         name: "Casual Shirt",
//         price: 45,
//         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, dolorum!",
//         img: "./images/img-1.jpg"
//     },
//     {
//         Id: "abc",
//         name: "Casual Shirt",
//         price: 55,
//         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, dolorum!",
//         img: "./images/img-2.jpg"
//     },
//     {
//         Id: "def",
//         name: "Casual Shirt",
//         price: 65,
//         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, dolorum!",
//         img: "./images/img-3.jpg"
//     },
//     {
//         Id: "jsjk",
//         name: "Casual Shirt",
//         price: 75,
//         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, dolorum!",
//         img: "./images/img-4.jpg"
//     }
// ]

let generateShop = () => {
    
    return (
        shop.innerHTML = shopItemsData.map((x)=>{
            let {id, name, price, desc, img} = x;
            let search = basket.find((x) => x.id === id) || []
            return ` <div class="item" id=product-id-${id}>
            <img src="${img}">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick = "decrement('${id}')" class="bi bi-dash-lg"></i>
                        <div class="quantity" id=${id}>${search.item === undefined? 0: search.item}</div>
                        <i onclick = "increment('${id}')" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>`
        }).join("")
    )
};

generateShop();

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

    localStorage.setItem("data",JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x)=> x.id == id)
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);
}

calculation();