// Base de datos de productos
const productsData = {
    dog: [
        { id: 1, name: "Turkey Dog", price: 25, img: "turkey.pet_.costume.webp" },
        { id: 2, name: "Firefighter", price: 30, img: "firefighter_dog.webp" },
        { id: 3, name: "Fairy Dog", price: 28, img: "fairy_dog.webp" },
        { id: 4, name: "Hot Dog", price: 22, img: "hot_dog.webp" }
    ],
    cat: [
        { id: 5, name: "Angel Cat", price: 24, img: "angel_cat.webp" },
        { id: 6, name: "Turtle Cat", price: 26, img: "turtle_cat.webp" },
        { id: 7, name: "Witch Cat", price: 29, img: "witch_cat.png" },
        { id: 8, name: "Cow Cat", price: 25, img: "cow_cat.png" }
    ]
};

const app = {
    cart: [],

    navigate: (screenId) => {
        window.scrollTo(0, 0);
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

        const screen = document.getElementById(screenId);
        screen.classList.remove('hidden');
        screen.classList.add('active');
    },

    showCatalog: (type) => {
        const title = document.getElementById('catalog-title');
        const container = document.getElementById('products-container');
        container.innerHTML = '';


        app.currentType = type;

        title.innerText = type === 'dog' ? 'DOG COSTUMES!' : 'CAT COSTUMES!';
        const items = productsData[type];

        items.forEach(item => {
            const itemString = JSON.stringify(item).replace(/"/g, '&quot;');

            const productHTML = `
                <div class="product-card" onclick="app.addToCart(${itemString})">
                    <img src="${item.img}" alt="${item.name}">
                    <p><u>${item.name}</u></p>
                    <p style="color: #666; font-size: 0.9rem;">$${item.price}</p>
                    <button class="btn" style="font-size:0.7rem; padding:5px; margin-top:0;">+ Add</button>
                </div>
            `;
            container.innerHTML += productHTML;
        });
        app.navigate('view-catalog');
    },

    addToCart: (item) => {
        app.cart.push(item);
        app.updateCartCount();
        alert(`${item.name} added to cart!`);
    },

    updateCartCount: () => {
        document.getElementById('cart-count').innerText = app.cart.length;
    },

    showCart: () => {
        const container = document.getElementById('cart-items-container');
        const totalElem = document.getElementById('cart-total');

        if (app.cart.length === 0) {
            container.innerHTML = "<p>Your cart is empty :(</p>";
            totalElem.innerText = "$0";
        } else {
            container.innerHTML = '';
            let total = 0;

            app.cart.forEach((item, index) => {
                total += item.price;
                container.innerHTML += `
                    <div class="cart-item">
                        <img src="${item.img}">
                        <div class="cart-info">
                            <strong>${item.name}</strong><br>
                            $${item.price}
                        </div>
                        <button class="btn-delete" onclick="app.removeFromCart(${index})">🗑️</button>
                    </div>
                `;
            });
            totalElem.innerText = "$" + total;
        }
        app.navigate('view-cart');
    },

    removeFromCart: (index) => {
        app.cart.splice(index, 1);
        app.updateCartCount();
        app.showCart();
    }
};


document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get inputs from the form
    const inputs = e.target.querySelectorAll('input');
    // Assuming first input is username/email and second is password
    const username = inputs[0] ? inputs[0].value.trim() : '';
    const password = inputs[1] ? inputs[1].value.trim() : '';

    if (username === 'admin' && password === 'admin') {
        app.navigate('view-selection');
    } else {
        alert('Credentials invalid. Please try again.');
    }
});