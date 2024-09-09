const searchInp = document.getElementById("searchInp")
const sortYear = document.getElementById("sortYear")


if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]))
}
let newData = []
getGuitar()
    .then(data => {
        newData = data
        console.log(data)
        searchInp.disabled = false
        guitarCard(data)
    })


const guitarCards = document.querySelector(".guitarCards")

function guitarCard(data) {
    let card = data.map((band) => (
        `
        <div class="card port" style="width: 18rem;">
            <img src="${band.image}" class="logoimg card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">${band.id}</p>
                <h5 class="card-title">${band.guitarBrand}</h5>
                <p class="card-text">${band.guitarName}</p>
                <p class="card-text">${band.price}</p>
                <p class="card-text">${band.usedWoods[0]}</p>
                <p class="card-text">${band.usedWoods[1]}</p>
                <button type="button" onclick="removeGuitar(${band.id})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                <button type="button" onclick="detailGuitar(${band.id})" class="btn btn-warning"><i class="fa-solid fa-circle-info"></i></button>
            </div>
            <button onclick="addToCard(${band.id})" class="btn btn-primary">Go somewhere</button>
        </div>
        `
    ))
    guitarCards.innerHTML = card.join(" ")
}

searchInp.addEventListener("input", () => {
    searchKey = searchInp.value
    let searchData = newData.filter(band => band.guitarName.toLowerCase().includes(searchKey.toLowerCase().trim()))
    guitarCard(searchData)
})

sortYear.addEventListener("click", () => {
    let newPrice = newData.sort((a, b) => (a.price - b.price))
    guitarCard(newPrice)
})

function removeGuitar(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteGuitar(id)
                .then(data => {
                    newData = newData.filter(guitar => guitar.id !== data.id)
                    guitarCard(newData)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    })
                })
        }
    })
}

function detailGuitar(id) {
    window.location.href = `detail.html?id=${id}&source=guitar`
}


const addNewBrand = document.getElementById("addNewBrand")

addNewBrand.addEventListener("click", () => {
    const brandName = document.getElementById("brand-name")
    const brandCountry = document.getElementById("brand-country")
    const brandYear = document.getElementById("brand-year")
    const brandLogo = document.getElementById("brand-logo")
    const brandGuitarType = document.getElementById("brand-guitarType")

    let obj = {
        name: brandName.value,
        year: brandYear.value,
        country: brandCountry.value,
        logo: brandLogo.value,
        typeofguitars: brandGuitarType.value,
    }
    addGuitars(obj)
        .then(newBrand => {
            newData.push(newBrand)
            guitarCard(newData)
        })

    brandName.value = ""
    brandCountry.value = ""
    brandYear.value = ""
    brandLogo.value = ""
    brandGuitarType.value = ""
})


function addToCard(id) {
    let cart = JSON.parse(localStorage.getItem("cart"))
    let exitItem = cart.find(item => item.id == id)

    if (!exitItem) {
        cart.push({ id });
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    console.log(cart)
}