const infoBtn = document.getElementById("info")

const searchParams = new URLSearchParams(window.location.search);
let searchId = searchParams.get("id");
console.log(searchParams.get("id"));
let searchSource = searchParams.get("source");
console.log(searchParams.get("source"));


const searchParams2 = new URLSearchParams(window.location.search);
let searchId2 = searchParams2.get("id");
console.log(searchParams2.get("id"));
let searchSource2 = searchParams.get("source");
console.log(searchParams2.get("source"))

getBrandById(searchId)
    .then(data => {
        detailCart(data)
    })

getGuitarById(searchId)
    .then(data => {
        intoGuitar(data)
    })
infoBtn.addEventListener("click", () => {
    if (searchSource == "brand") {
        window.location.href = "product.html"
    } else {
        window.location.href = "guitar.html"
    }
})


const detailCards = document.getElementById("detailCards");

function detailCart(band) {
    let cart = `
        <div class="card mb-3" style="max-width: 800px; margin: auto;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${band.logo}" class="img-fluid rounded-start h-100" alt="Brand Logo">
                </div>
                <div class="col-md-8 text-center">
                    <div class="card-body">
                        <h3 class="card-title">${band.name}</h3>
                        <p class="card-text">This brand is made with high-quality materials and is ideal for professional musicians.</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Year:</strong> ${band.year}</li>
                            <li class="list-group-item"><strong>Country:</strong> ${band.country}</li>
                            <li class="list-group-item"><strong>Guitar Type:</strong> ${band.typeofguitars}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    detailCards.innerHTML = cart;
}

const detailGuitars = document.getElementById("detailGuitars");

function intoGuitar(band) {
    let cart = `
        <div class="card mb-3" style="max-width: 800px; margin: auto;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${band.image}" class="img-fluid rounded-start h-100" alt="Guitar Image">
                </div>
                <div class="col-md-8 text-center">
                    <div class="card-body">
                        <h3 class="card-title">${band.guitarBrand}</h3>
                        <p class="card-text">This guitar is made with high-quality materials and is ideal for professional musicians.</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Price:</strong> ${band.price}</li>
                            <li class="list-group-item"><strong>Guitar Name:</strong> ${band.guitarName}</li>
                            <li class="list-group-item"><strong>Wood Type:</strong> ${band.usedWoods.join(', ')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    detailGuitars.innerHTML = cart;
}