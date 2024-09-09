let newData = []

// if (!localStorage.getItem("brand")) {
//     localStorage.setItem("brand", JSON.stringify([]))
// } else {
//     brand = JSON.parse(localStorage.getItem("brand"))
// }


const tbody = document.getElementById("tbody");

let brand = JSON.parse(localStorage.getItem("brand")) || [];

async function show() {
    let cart = await Promise.all(brand.map(async (item) => {
        let band = await getBrandById(item.id);
        return `
            <tr>
                <th scope="row">1</th>
                <td><img class="logoimg2" src="${band.logo}" alt=""></td>
                <td>${band.name}</td>
                <td>${band.country}</td>
                <td>${band.year}</td>
                <td>
                    <button onclick="deleteFavorite(${band.id})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    }));

    tbody.innerHTML = cart.join(" ");
}

show();


function deleteFavorite(id) {
    let brand = JSON.parse(localStorage.getItem("brand"));
    brand = brand.filter(item => item.id !== id);
    localStorage.setItem("brand", JSON.stringify(brand));
    show();
}
