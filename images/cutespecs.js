
// shopping cart
let cartTotal = 0;

const products = [
    {
        productname: "Dumpling Hard Case",
        productprice: 25,
        productid: 0,
        total: 25

    },

    {
        productname: "Dumpling Soft Case",
        productprice: 20,
        productid: 1,
        total: 20


    },
    {
        productname: "Boba Soft Case",
        productprice: 22,
        productid: 2,
        total: 22

    },
    {
        productname: "Boba Hard Case",
        productprice: 21,
        productid: 3,
        total: 21

    },
    {
        productname: "Dumpling Chain",
        productprice: 10,
        productid: 4,
        total: 10

    },
    {
        productname: "Dumpling Cord",
        productprice: 10,
        productid: 5,
        total: 10

    },
    {
        productname: "Boba Chain",
        productprice: 10,
        productid: 6,
        total: 10

    },
    {
        productname: "Boba Cord",
        productprice: 10,
        productid: 7,
        total: 10

    },
    {
        productname: "Dumpling Cloth",
        productprice: 8,
        productid: 8,
        total: 8

    },
    {
        productname: "Dumpling Spray",
        productprice: 12,
        productid: 9,
        total: 12

    },
    {
        productname: "Boba Cloth",
        productprice: 8,
        productid: 10,
        total: 8

    },
    {
        productname: "Boba Spray",
        productprice: 12,
        productid: 11,
        total: 12

    }
];

let shoppingCart = [];


function checkAlreadyInCart(productvalue) {

    for (let i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i].productid === parseInt(productvalue)) {
            return true;
        }
    }
}

function updateCartTotalDisplay() {
    cartTotal = 0;
    for (let i = 0; i < shoppingCart.length; i++) {
        cartTotal += shoppingCart[i].total;
    }
    document.getElementById('shoppingcarttotal').textContent = "Total: " + cartTotal;
}


function addToCart(value) {

    let productvalue = value;
    // check if cart is empty and clear message if it is. Also set initial cart total for item just added.
    if (shoppingCart.length === 0) {
        document.getElementById('cartemptymessage').innerHTML = "";
    }

    // check if item already in cart- if it is send user a message, if not continue to add item to cart
    if (checkAlreadyInCart(productvalue)) {
        document.getElementById('toastbody').innerHTML = "This item is already in your cart.";
        const toastLiveExample = document.getElementById('liveToast')
        toastLiveExample.classList.add("show");
    }
    else {

        // add product selected to shoppingCart array and capture return length as index for later use by event listeners. 

        let index = shoppingCart.push(products[productvalue]) - 1;

        updateCartTotalDisplay();

        // create new elements

        const shoppingCartDiv = document.getElementById("shoppingcart");

        const productDiv = document.createElement("div");
        const descriptionDiv = document.createElement("div");
        const productanddescriptionDiv = document.createElement('div');
        const buttonDiv = document.createElement("div");
        const priceDiv = document.createElement("div");
        const incrementDecrementButton = document.createElement("div");
        const removeButton = document.createElement("button");

        // change text content/inner html of elements
        descriptionDiv.textContent = products[productvalue].productname;
        priceDiv.textContent = "$" + products[productvalue].productprice + " AUD";
        incrementDecrementButton.innerHTML = "<a href='#' class='quantityminus'><span>-</span></a><input name='quantity' type='text' class='quantityinput' value='1'><a href='#' class='quantityplus'><span>+</span>";
        removeButton.textContent = "Remove";

        // append elements to each product element
        productanddescriptionDiv.appendChild(descriptionDiv);
        productanddescriptionDiv.appendChild(priceDiv);
        buttonDiv.appendChild(incrementDecrementButton);
        buttonDiv.appendChild(removeButton);
        productDiv.appendChild(productanddescriptionDiv);
        productDiv.appendChild(buttonDiv);

        // append product to shopping cart element 
        shoppingCartDiv.appendChild(productDiv);

        // add classes/ids to new elements 
        incrementDecrementButton.classList.add("quantity");
        incrementDecrementButton.setAttribute('id', 'counter' + products[productvalue].productid);
        productDiv.setAttribute('id', 'product' + products[productvalue].productid);
        productDiv.classList.add("products");


        // add event listeners for increment/decrement/remove button
        const minus = incrementDecrementButton.querySelectorAll('.quantityminus');
        const plus = incrementDecrementButton.querySelectorAll('.quantityplus');
        const input = incrementDecrementButton.querySelectorAll('.quantityinput');

        minus.forEach(function (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                var value = parseInt(input[0].value);
                if (value > 1) {
                    value--;
                    input[0].value = value;

                    shoppingCart[index].total -= shoppingCart[index].productprice;
                    updateCartTotalDisplay();
                }
            });
        });

        plus.forEach(function (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                var value = parseInt(input[0].value);
                value++;
                input[0].value = value;

                shoppingCart[index].total += shoppingCart[index].productprice;

                updateCartTotalDisplay();

            });
        });

        removeButton.addEventListener("click", function () {
            // iterate through and remove from shoppingcart array
            for (let i = 0; i < shoppingCart.length; i++) {
                if (shoppingCart[i].productid === parseInt(value)) {
                    shoppingCart[i].productprice
                    shoppingCart.splice(i, 1);
                    document.getElementById('product' + value).remove();

                    if (shoppingCart.length < 1) {
                        document.getElementById('cartemptymessage').innerHTML = "Shopping Cart is Empty!";
                        document.getElementById('shoppingcarttotal').textContent = "";
                        cartTotal = 0;
                    }
                    else {
                        updateCartTotalDisplay();
                    }
                }
            }
        });

        // send toast indicating item has been added to cart. 
        document.getElementById('toastbody').innerHTML = shoppingCart[index].productname + " added to Cart!"
        const toastLiveExample = document.getElementById('liveToast')
        toastLiveExample.classList.add("show");
    }
}

// best sellers carousel logic 
function slideTo(id) {
    const carousel = document.getElementById('carouselExampleControls');
    const items = Array.from(carousel.querySelectorAll('.carousel-item'));
    const index = items.findIndex(item => item.id === id);
    
    if (index !== -1) {
        const bsCarousel = new bootstrap.Carousel(carousel);
        bsCarousel.to(index);
    } else {
        console.error(`Slide with id '${id}' not found.`);
    }
}


// sign up form

let emailmsg = document.getElementById("emailmsg");
let passwordmsg = document.getElementById("passwordmsg");
let firstnamemsg = document.getElementById("firstnamemsg");
let surnamemsg = document.getElementById("surnamemsg");
let dobmsg = document.getElementById("dobmsg");
let mobilemsg = document.getElementById("mobilemsg");
let address1msg = document.getElementById("address1msg");
let address2msg = document.getElementById("address2msg");
let citymsg = document.getElementById("citymsg");
let statemsg = document.getElementById("statemsg");
let postcodemsg = document.getElementById("postcodemsg");

function validation(event) {
    let isValid = true; 
    let email = document.getElementById("inputEmail4").value;
    let password = document.getElementById("inputPassword4").value;
    let firstname = document.getElementById("inputFirstName").value;
    let surname = document.getElementById("inputSurname").value;
    let dob = document.getElementById("dob").value;
    let mobile = document.getElementById("mobile").value;
    let address1 = document.getElementById("inputAddress").value;
    let address2 = document.getElementById("inputAddress2").value;
    let city = document.getElementById("inputCity").value;
    let state = document.getElementById("inputState").value;
    let postcode = document.getElementById("inputpostcode").value;

    let emailmsg = document.getElementById("emailmsg");
    let passwordmsg = document.getElementById("passwordmsg");
    let firstnamemsg = document.getElementById("firstnamemsg");
    let surnamemsg = document.getElementById("surnamemsg");
    let dobmsg = document.getElementById("dobmsg");
    let mobilemsg = document.getElementById("mobilemsg");
    let address1msg = document.getElementById("address1msg");
    let citymsg = document.getElementById("citymsg");
    let statemsg = document.getElementById("statemsg");
    let postcodemsg = document.getElementById("postcodemsg");

    if (email == "" || email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) == null) {
        emailmsg.classList.remove("text-success");
        emailmsg.classList.add("text-danger");
        emailmsg.innerHTML = "<em> Please enter a valid email e.g. '@deakin.edu.au' </em>";
        isValid = false;
    } else {
        emailmsg.classList.remove("text-danger");
        emailmsg.classList.add("text-success");
        emailmsg.innerHTML = "Valid";
    }

    if (password == "" || password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) == null) {
        passwordmsg.classList.remove("text-success");
        passwordmsg.classList.add("text-danger");
        passwordmsg.innerHTML = "<em> Your password must be: between 6 and 20 characters long, contain 1 uppercase & 1 lowercase character & 1 number </em>";
        isValid = false;
    } else {
        passwordmsg.classList.remove("text-danger");
        passwordmsg.classList.add("text-success");
        passwordmsg.innerHTML = "Valid";
    }

    if (firstname == "") {
        firstnamemsg.classList.remove("text-success");
        firstnamemsg.classList.add("text-danger");
        firstnamemsg.innerHTML = "<em> You did not enter your First name </em>";
        isValid = false;
    } else {
        firstnamemsg.classList.remove("text-danger");
        firstnamemsg.classList.add("text-success");
        firstnamemsg.innerHTML = "Valid";
    }

    if (surname == "") {
        surnamemsg.classList.remove("text-success");
        surnamemsg.classList.add("text-danger");
        surnamemsg.innerHTML = "<em> You did not enter your Surname </em>";
        isValid = false;
    } else {
        surnamemsg.classList.remove("text-danger");
        surnamemsg.classList.add("text-success");
        surnamemsg.innerHTML = "Valid";
    }

    if (dob == "") {
        dobmsg.classList.remove("text-success");
        dobmsg.classList.add("text-danger");
        dobmsg.innerHTML = "<em> You did not enter your date of birth </em>";
        isValid = false;
    } else {
        dobmsg.classList.remove("text-danger");
        dobmsg.classList.add("text-success");
        dobmsg.innerHTML = "Valid";
    }

    if (mobile == "" || mobile.match(/^[0-9]{10}|[0-9]{6}$/) == null) {
        mobilemsg.classList.remove("text-success");
        mobilemsg.classList.add("text-danger");
        mobilemsg.innerHTML = "<em> Please enter a valid mobile number </em>";
        isValid = false;
    } else {
        mobilemsg.classList.remove("text-danger");
        mobilemsg.classList.add("text-success");
        mobilemsg.innerHTML = "Valid";
    }

    if (address1 == "") {
        address1msg.classList.remove("text-success");
        address1msg.classList.add("text-danger");
        address1msg.innerHTML = "<em> Please enter a valid address </em>";
        isValid = false;
    } else {
        address1msg.classList.remove("text-danger");
        address1msg.classList.add("text-success");
        address1msg.innerHTML = "Valid";
    }

    if (city == "") {
        citymsg.classList.remove("text-success");
        citymsg.classList.add("text-danger");
        citymsg.innerHTML = "<em> Please enter a city</em>";
        isValid = false;
    } else {
        citymsg.classList.remove("text-danger");
        citymsg.classList.add("text-success");
        citymsg.innerHTML = "Valid";
    }

    if (state == "Choose...") {
        statemsg.classList.remove("text-success");
        statemsg.classList.add("text-danger");
        statemsg.innerHTML = "<em> Please enter a state</em>";
        isValid = false;
    } else {
        statemsg.classList.remove("text-danger");
        statemsg.classList.add("text-success");
        statemsg.innerHTML = "Valid";
    }

    if (postcode == "" || postcode.match(/^(0[289][0-9]{2})|([1-9][0-9]{3})$/) == null) {
        postcodemsg.classList.remove("text-success");
        postcodemsg.classList.add("text-danger");
        postcodemsg.innerHTML = "<em> Please enter a valid postcode</em>";
        isValid = false;
    } else {
        postcodemsg.classList.remove("text-danger");
        postcodemsg.classList.add("text-success");
        postcodemsg.innerHTML = "Valid";
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
    return isValid;
}

function Reset() {
    document.getElementById("formsignup").reset(); 

    document.getElementById("emailmsg").innerHTML = "";
    document.getElementById("passwordmsg").innerHTML = "";
    document.getElementById("firstnamemsg").innerHTML = "";
    document.getElementById("surnamemsg").innerHTML = "";
    document.getElementById("dobmsg").innerHTML = "";
    document.getElementById("mobilemsg").innerHTML = "";
    document.getElementById("address1msg").innerHTML = "";
    document.getElementById("citymsg").innerHTML = "";
    document.getElementById("statemsg").innerHTML = "";
    document.getElementById("postcodemsg").innerHTML = "";
}

// search bar

const menuItems = [
    { name: 'About', ref: '/about' },
    { name: 'Best seller', ref: '/product' },
    { name: 'Cart', ref: '/product' },
    { name: 'Cases Hard', ref: '/product' },
    { name: 'Cases Soft', ref: '/product' },
    { name: 'Chains', ref: '/product' },
    { name: 'Cloths', ref: '/product' },
    { name: 'Cords', ref: '/product' },
    { name: 'Facebook', ref: 'https://www.facebook.com/' },
    { name: 'Google', ref: 'https://www.google.com/' },
    { name: 'Lens Spray', ref: '/product' },
    { name: 'Linked-In', ref: 'https://www.linkedin.com/feed/' },
    { name: 'Log in', ref: '/product' },
    { name: 'Magnifiers', ref: '/product' },
    { name: 'Sale', ref: '/product' },
    { name: 'Sign up', ref: '/signup' },
    { name: 'Spray', ref: '/product' },
    { name: 'Twitter', ref: 'https://twitter.com/?lang=en' },
    { name: 'Youtube', ref: 'https://www.youtube.com/' },
];

const searchInput = document.getElementById('searchbar');
const searchDisplay = document.getElementById('search-display');

searchInput.addEventListener("input", handleSearch);

function handleSearch(e) {
    const query = e.target.value.trim().toLowerCase();
    clearSearchDisplay();
    if (query) {
        const results = menuItems.filter(item => item.name.toLowerCase().includes(query));
        if (results.length > 0) {
            renderResults(results);
        } else {
            renderNoResultsMessage();
        }
    }
}

function renderResults(results) {
    results.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.ref;
        link.textContent = item.name;
        link.classList.add('result-item');
        listItem.appendChild(link);
        searchDisplay.appendChild(listItem);
    });
}

function renderNoResultsMessage() {
    const message = document.createElement('p');
    message.textContent = "No results found";
    searchDisplay.appendChild(message);
}

function clearSearchDisplay() {
    searchDisplay.innerHTML = '';
}

function executeSearch() {
    const firstResult = searchDisplay.querySelector('li:first-child a');
    if (firstResult) {
        window.open(firstResult.href);
    }
}










