


const tbody = document.getElementById("tbody");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function count(itemId) {
    let item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = (item.quantity || 1) + 1;
        localStorage.setItem("cart", JSON.stringify(cart)); 
        showGutar();  
    }
}

function decreaseCount(itemId) {
    let item = cart.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        showGutar();
    }
}


async function showGutar() {
    let totalPrice = 0;
    let card = await Promise.all(cart.map(async (item) => {
        let guitar = await getGuitarById(item.id);
        let quantity = item.quantity || 1;
        let itemTotalPrice = guitar.price * quantity;
        totalPrice += itemTotalPrice;
        return `
        <tr>
                <th scope="row">${guitar.id}</th>
                <th><img class="logoimg2"
                        src="${guitar.image}"
                        alt=""></th>
                <th>${guitar.guitarBrand} ${guitar.guitarName}</th>
                <th>${guitar.price}</th>
                <th>${guitar.price * quantity}</th>
                <th><button class="btn btn-danger" onclick="decreaseCount(${guitar.id})">-</button></th>
                <th>${quantity}</th>  <!-- Güncellenen quantity -->
                <th><button onclick="count(${guitar.id})" class="btn btn-success">+</button></th>
                <td>
                    <button onclick="deleteCard(${guitar.id})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                </td>
        </tr>
        `;
    }));
    tbody.innerHTML = card.join(" ");
}

showGutar();

function deleteCard(id) {
    let card = JSON.parse(localStorage.getItem("cart"))
    card = card.filter(item => item.id !== id)
    localStorage.setItem("cart", JSON.stringify(card))
    showGutar()
}