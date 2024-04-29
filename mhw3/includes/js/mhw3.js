var total_Cart = 0;

document.addEventListener('DOMContentLoaded', (e) => {
    showCategory();
    buildCart();
});

const btn_favourite = document.querySelectorAll(".favourite-product-card");
for (let btn of btn_favourite) {
    //event also pass event var
    btn.addEventListener("click", handleFavourite);
}

const btn_collapse = document.querySelectorAll(".collapse");
for (let btn of btn_collapse) {
    btn.addEventListener('click', collapseExpand);
}

const slider_img = document.querySelector("#slider_img");
const btn_slider_back = document.querySelector("#back");
const btn_slider_forward = document.querySelector("#forward");
btn_slider_back.addEventListener('click', slider);
btn_slider_forward.addEventListener('click', slider);

const support_btn = document.querySelector("#support_btn");
support_btn.addEventListener('click', toggleChat);

function removeCartProduct(event) {
    event.currentTarget.parentNode.remove();
    notify("Avviso", "Prodotto rimosso dal carello");
}

/**
 * 
 * momentaneamente implementato con 2 immagini al solo scopo di utilizzare il comando "src" per cui il funzionamento alla pressione dei due tasti risulta analogo
 * e semplicistico più avanti verranno magari gestite immaggini attraverso un array 
 */
function slider(event) {
    //console.log(slider_img.src);
    if (slider_img.src.search("1.png") !== -1) {
        slider_img.src = "../img/2.png";
    } else {
        slider_img.src = "../img/1.png";
    }
}

/**
 * currentTarget target of listener associated
 * target of the object fire listener
 */
function handleFavourite(event) {
    const obj = event.currentTarget;
    if (obj.classList.contains("favourite-product-card-selected")) {
        obj.classList.remove("favourite-product-card-selected");
        notify("Favourite", "Elemento rimosso dai preferiti");
    } else {
        obj.classList.add("favourite-product-card-selected");
        notify("Favourite", "Elemento aggiunto ai preferiti");
    }
}
//<span class="material-icons">chevron_right</span>
//.dataset accedo al dataset sfruttando il camel case posso recuperare tutti gli attributi data
function collapseExpand(event) {
    //console.log(event.currentTarget);
    const obj = document.querySelector(event.currentTarget.dataset.targetId);
    //console.log(obj);
    if (obj.classList.contains("collapsed")) {
        obj.classList.remove("collapsed");
    } else {
        obj.classList.add("collapsed");
    }
}

function notify(title, msg) {
    const notifyElement = document.createElement("div");
    const notifyTitle = document.createElement("h3");
    const notifyMsg = document.createElement("p");
    notifyTitle.textContent = title;
    notifyMsg.textContent = msg;
    notifyElement.appendChild(notifyTitle);
    notifyElement.appendChild(notifyMsg);
    notifyElement.classList.add("notify");
    notifyRemove();
    document.body.appendChild(notifyElement);
    setTimeout(notifyRemove, 5000);
}

function notifyRemove() {
    let notify = document.querySelectorAll(".notify");
    for (let obj of notify) {
        obj.remove();
    }
}

function toggleChat(event) {
    const support_container = document.querySelector("#support_container");
    toggle_value = event.currentTarget.dataset;
    if (toggle_value.value == 0) {
        /** BTN */
        //support_btn.style.width = "22%";
        support_btn.style.width = "300px";
        support_btn.style.borderRadius = "0px";
        /** CONTAINER CHAT */
        support_container.style.bottom = "88px";
        //support_container.style.width = "22%";
        //support_container.style.height = "55%";
        support_container.style.width = "300px";
        support_container.style.height = "500px";
        support_container.style.borderRadius = "0px";
        console.log("child: " + support_container.childNodes[1]);
        support_container.childNodes[1].style.display = "block";
        toggle_value.value = 1;
    } else if (toggle_value.value == 1) {
        /** CONTAINER CHAT */
        support_container.style.bottom = "20px";
        support_container.style.width = "70px";
        support_container.style.height = "70px";
        support_container.style.borderRadius = "50%";
        support_container.childNodes[1].style.display = "none";
        /** BTN */
        support_btn.style.width = "70px";
        support_btn.style.borderRadius = "50%";
        toggle_value.value = 0;
    }
}

function addSection(section_name) {
    let section_name_rep = section_name.replace(" ", "-");
    section_name_rep = section_name_rep.replace("'", "");
    const main_content = document.querySelector("#main-content");

    const section = document.createElement("section");
    const section_title = document.createElement("h2");
    const section_menu = document.createElement("span");
    const product_container = document.createElement("div");
    section.id = section_name_rep + "-section";
    section_title.textContent = "Più acquistati oggi nella sezione - " + section_name_rep;
    section_menu.classList.add("material-icons");
    section_menu.classList.add("collapse");
    section_menu.setAttribute("data-target-id", "#" + section_name_rep + "-container");
    section_menu.textContent = "expand_more";
    product_container.id = section_name_rep + "-container";
    product_container.classList.add("product-container");
    section.appendChild(section_title);
    section_title.appendChild(section_menu);
    section.appendChild(product_container);
    //main_content.appendChild(section);
    section_menu.addEventListener('click', collapseExpand);
    main_content.insertBefore(section, main_content.childNodes[4]);
    //section_menu.data-target-id = "#"+section.id;
}

function addProduct(product, section_name) {
    let section_name_rep = section_name.replace(" ", "-");
    section_name_rep = section_name_rep.replace("'", "");
    const section_container = document.querySelector("#" + section_name_rep + "-container");

    const product_card = document.createElement("div");
    const favourite = document.createElement("span");
    const product_img = document.createElement("img");
    const product_title = document.createElement("p");
    const product_price = document.createElement("h3");
    const product_price_full = document.createElement("small");
    const card_menu = document.createElement("span");
    product_card.classList.add("product-card");
    favourite.classList.add("material-icons");
    favourite.classList.add("favourite-product-card");
    favourite.textContent = "favorite_border";
    favourite.addEventListener("click", handleFavourite);
    product_img.src = product.image;
    product_title.classList.add("product-desc");
    product_title.textContent = product.title;
    product_price.classList.add("product-price");
    product_price.textContent = "EUR " + product.price
    product_price_full.textContent = "EUR " + Math.round(getRandomNumber((product.price + (product.price * 40) / 100), (product.price + (product.price * 73, 5) / 100)));
    card_menu.classList.add("material-icons");
    card_menu.classList.add("menu-product-card");
    card_menu.textContent = "more_vert";
    product_card.appendChild(favourite);
    product_card.appendChild(product_img);
    product_card.appendChild(product_title);
    product_card.appendChild(product_price);
    product_price.appendChild(product_price_full);
    product_card.appendChild(card_menu);
    section_container.appendChild(product_card);
}

function addProductToCart(product, qty) {
    const cart_product = document.createElement('div');
    const img_product = document.createElement('img');
    const col_product = document.createElement('div');
    const title_product = document.createElement('p');
    const price_product = document.createElement('h4');
    const qty_product = document.createElement('small');
    const delete_product = document.createElement('span');
    cart_product.classList.add('cart-product');
    delete_product.classList.add('material-icons');
    delete_product.textContent = "delete";
    delete_product.addEventListener('click', removeCartProduct);
    img_product.src = product.image;
    title_product.textContent = product.title;
    price_product.textContent = "EUR " + product.price;
    total_Cart += product.price;
    qty_product.textContent = "Q.ty: " + qty;
    col_product.classList.add('column');
    col_product.appendChild(title_product);
    col_product.appendChild(price_product);
    col_product.appendChild(qty_product);
    cart_product.appendChild(img_product);
    cart_product.appendChild(col_product);
    cart_product.appendChild(delete_product);
    document.querySelector('#shopping-cart').insertBefore(cart_product, document.querySelector('#payment_btn'));
    //document.querySelector('#shopping-cart').appendChild(cart_product);
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function onError(error) {
    console.log("fetch error: " + error);
}

function addMenuField(field, menu_id) {
    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
    const field_li = document.createElement("li");
    const field_a = document.createElement("a");
    field_li.appendChild(field_a);
    switch (field) {
        case "electronics":
            field_a.href = "elettronica.html";
            break;
        case "jewelery":
            field_a.href = "gioielli.html";
            break;
        case "men's clothing":
            field_a.href = "moda_uomo.html";
            break;
        case "women's clothing":
            field_a.href = "moda_donna.html";
            break;
        default:
            field_a.href = "https://fakestoreapi.com/products/category/" + field;
            break;
    }
    field_a.textContent = field;
    document.querySelector("#" + menu_id).appendChild(field_li);
}

function showCategory() {
    fetch("https://fakestoreapi.com/products/categories").then((response) => {
        if (response.status === 200) {
            response.json().then((response) => {
                for (category of response) {
                    console.log("category: " + category);
                    addMenuField(category, "sub-nav");
                }
            }, onError);
        }
    }, onError);
}

function showAllProductsCategory(category_name) {
    //addSection(category_name);
    console.log("category selected:" + category_name);
    fetch("https://fakestoreapi.com/products/category/" + category_name).then((response) => {
        if (response.status === 200) {
            response.json().then((response) => {
                let products = response;
                for (let p of products) {
                    addProduct(p, category_name);
                }
                let loader = document.querySelectorAll(".loader");

                for (let l of loader) {
                    l.remove();
                }
            }, onError);
        }
    }, onError);
}

function showRandomProductsCategory() {
    fetch("https://fakestoreapi.com/products/categories").then((response) => {
        if (response.status === 200) {
            response.json().then((response) => {
                console.log("res: " + response);
                console.log("res length: " + response.length);
                let cat_n = response.length;
                let cat_x = Math.round(getRandomNumber(0, cat_n - 1));
                let category = response[cat_x];
                console.log("section chosen: " + cat_x + " category: " + category);
                addSection(category);
                fetch('https://fakestoreapi.com/products/category/' + category + '?limit=5').then((response) => {
                    if (response.status === 200) {
                        response.json().then((response) => {
                            let products = response;
                            for (let p of products) {
                                addProduct(p, category);
                                //console.log("products: "+p.title);
                            }
                        });
                    }
                }, onError);
            });
        }
    }, onError);
}

function buildCart() {
    fetch('https://fakestoreapi.com/carts/1').then((response) => {
        if (response.status === 200) {
            response.json().then((response) => {
                console.log("Cart: " + JSON.stringify(response));
                console.log("Cart products: " + JSON.stringify(response["products"]));
                for (var key in response.products) {
                    let cart_p = response.products[key];
                    console.log(cart_p);
                    fetch('https://fakestoreapi.com/products/' + cart_p.productId).then((response) => {
                        if (response.status === 200) {
                            response.json().then((response) => {
                                // console.log("cart product:" + JSON.stringify(response));
                                addProductToCart(response, cart_p.quantity);
                            }, onError);
                        }
                    }, onError);
                }
            }, onError);
        }
    }, onError);
}

function paymentsPayPal(total_price) {
    const client_id = "AdLFLGg69J0r9D3v9ODG2SSPC_HOddackUHdKfpYfgcvEq7PMHyyTjOlEt6auCKLsAvIAQw2KtIrO67y";
    const client_secret = "EFAbX0uVjI3nl_jm4BqGwubXHyE0xykTytbpNG2HahtGaJ4sHVJtdScSECVpfm_BQIii9Ffq2dAIjB2K";
    console.log("Request token");
    fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
        body: "grant_type=client_credentials",
        method: "POST",
        headers: {
            //btoa(client_id + ":" + client_secret) utilizzato perchè paypal accetta le credenziali in base 64 come da documentazione quindi ne effettuo l'encode
            //se invio i token in modo diretto si riceve L'errore http 401 non autorizzato
            Authorization: 'Basic ' + btoa(client_id + ":" + client_secret),
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }, onError).then((response) => {
        if (response.status === 200) {
            response.json().then((response) => {
                const token = response.access_token;
                console.log("paypalToken: " + JSON.stringify(response));
                console.log("paypalToken: " + JSON.stringify(token));
                console.log("Do order");
                fetch("https://api.sandbox.paypal.com/v2/checkout/orders", {
                    body: "grant_type=client_credentials",
                    method: "POST",
                    headers: {
                        //btoa(client_id + ":" + client_secret) utilizzato perchè paypal accetta le credenziali in base 64 come da documentazione quindi ne effettuo l'encode
                        //se invio i token in modo diretto si riceve L'errore http 401 non autorizzato
                        Authorization: 'Bearer ' + token,
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        intent: 'CAPTURE',
                        purchase_units: [{
                            amount: {
                                currency_code: 'USD',
                                value: total_price
                            }
                        }],
                        application_context: {
                            return_url: 'http://127.0.0.1/UNICT/WEB_PROGRAMMING/PROGETTO_EBAY/mhw3/includes/template/',
                            cancel_url: 'http://127.0.0.1/UNICT/WEB_PROGRAMMING/PROGETTO_EBAY/mhw3/includes/template/'
                        }
                    })
                }, onError).then((response) => {
                    console.log("Do order json");
                    console.log("order req status: " + response.status);
                    if (response.status === 201) {
                        response.json().then((response) => {
                            const order_id = response.id;
                            console.log("payments: " + JSON.stringify(response));
                            console.log("payments id: " + order_id);
                            const approvalUrl = response.links.find(link => link.rel === 'approve').href;
                            window.location.href = approvalUrl;
                        }, onError);
                    }
                }, onError);
            }, onError);
        }
    }, onError);
}

function totalCart(){
    console.log(total_Cart);
    paymentsPayPal(total_Cart);
}