const products = [
  { id: 1, name: "Ноутбук ASUS",       category: "Электроника", price: 2500, inStock: true  },
  { id: 2, name: "Мышь Logitech",      category: "Электроника", price: 45,   inStock: true  },
  { id: 3, name: "Стол письменный",    category: "Мебель",      price: 320,  inStock: false },
  { id: 4, name: "Кресло офисное",     category: "Мебель",      price: 480,  inStock: true  },
  { id: 5, name: "Наушники Sony",      category: "Электроника", price: 180,  inStock: true  },
  { id: 6, name: "Книга «JS для всех»",category: "Книги",       price: 25,   inStock: true  },
  { id: 7, name: "Книга «Clean Code»", category: "Книги",       price: 30,   inStock: false },
  { id: 8, name: "Монитор LG 27\"" ,   category: "Электроника", price: 750,  inStock: true  },
];

let cart = [];

const btnShowAll = document.getElementById("btn-show-all");
const catalogContainer = document.getElementById("catalog-container");

btnShowAll.addEventListener("click", () => {
    catalogContainer.innerHTML = "";
    // Использую forEach, потому что он позволяет легко итерироваться по массиву продуктов и создавать карточки для каждого товара без необходимости управлять индексами, как в случае с циклом for. 
    // Это делает код более читаемым и удобным для понимания. Кроме того, forEach автоматически обрабатывает каждый элемент массива, что упрощает добавление новых товаров в будущем.
    products.forEach(product => {
        const stockStyle = product.inStock ? "" : "color: gray; opacity: 0.6;";
        const btnHtml = product.inStock ? `<button class="btn btn-cart add-to-cart-btn" data-id="${product.id}">В корзину</button>` : '';
        const card = `
      <div class="product-card" style="${stockStyle}">
        <h3>${product.name}</h3>
        <p>Категория: ${product.category}</p>
        <p>Цена: ${product.price} BYN</p>
        <p>${product.inStock ? "✅ В наличии" : "❌ Нет в наличии"}</p>
      ${btnHtml}
        </div>
    `;
    catalogContainer.innerHTML += card;
    });
    });
const btnSearch = document.getElementById("btn-search"); 
const searchInput = document.getElementById("search-input"); 
const categorySelect = document.getElementById("category-select");
const filterResults = document.getElementById("filter-results");

btnSearch.addEventListener("click", () => {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;
    filterResults.innerHTML = "";
    // Использую filter, потому что он создает НОВЫЙ массив только с теми товарами, которые прошли проверку, не ломая наш исходный массив products.
    const filteredProducts = products.filter(product => {
        const isNameMatch = product.name.toLowerCase().includes(searchText);
        const isCategoryMatch = selectedCategory === "Все" || product.category === selectedCategory;
        return isNameMatch && isCategoryMatch;
});
if (filteredProducts.length === 0) {
        filterResults.innerHTML = "<p>Товары не найдены</p>";
        return; 
    }
    // Использую map, потому что он позволяет преобразовать каждый элемент массива (добавить новое поле label), вернув новый массив такого же размера.
    const productsWithLabel = filteredProducts.map(product => {
        return { 
           ... product,
           label: product.name + " — " + product.price + " BYN"
        };
    });
        productsWithLabel.forEach(product => { 
            const stockStyle = product.inStock ? "" : "color: gray; opacity: 0.6;";
            const btnHtml = product.inStock ? `<button class="btn btn-cart add-to-cart-btn" data-id="${product.id}">В корзину</button>` : '';
            const card = `
      <div class="product-card" style="${stockStyle}">
        <h3>${product.label}</h3>
        <p>Категория: ${product.category}</p>
        <p>Цена: ${product.price} BYN</p>
        <p>${product.inStock ? "✅ В наличии" : "❌ Нет в наличии"}</p>
        ${btnHtml}
        </div>
    `;  
    filterResults.innerHTML += card;
    });
});  
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart-btn")) {
            const productId = Number(event.target.dataset.id);
            const productToAdd = products.find(p => p.id === productId);
            const isAlreadyInCart = cart.find(p => p.id === productId);
            if (productToAdd && productToAdd.inStock && !isAlreadyInCart) {
                cart.push(productToAdd);
            console.log("Товары в корзине:", cart);
            }
        }
    });
const btnShowCart = document.getElementById("btn-show-cart");
const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");
const btnClearCart = document.getElementById("btn-clear-cart");

function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Корзина пуста</p>";
        cartTotal.textContent = "";
        return;
    }
    // Использую forEach, потому что нам нужно просто перебрать товары в корзине и отрисовать их.
    cart.forEach(item => {
        const cartItem = 
        `<div class="cart-item"> ${item.name} 
        <span>${item.price} BYN</span>
        </div>
       `;
        cartContainer.innerHTML += cartItem;
});

// Использую map, потому что мне нужно из массива объектов сделать новый массив, состоящий только из чисел (цен).
const prices = cart.map(item => item.price);
const totalSum = prices.reduce((sum, price) => sum + price, 0);
cartTotal.textContent = `Итого: ${totalSum} BYN`;
}

btnShowCart.addEventListener("click", () => {
    renderCart();
}  
);
btnClearCart.addEventListener("click", () => {
    cart = [];
    renderCart();
});
