const searchInp = document.getElementById("searchInp")
const sortYear = document.getElementById("sortYear")
if (!localStorage.getItem("brand")) {
    localStorage.setItem("brand", JSON.stringify([]))
}
let newData = []

getBrands()
    .then(data => {
        newData = data
        searchInp.disabled = false
        brandCard(data)
    })
const cards = document.querySelector(".cards")

function brandCard(data) {
    let cart = data.map((band) => (
        `
        <div class="card port" style="width: 18rem;">
            <img src="${band.logo}" class="logoimg card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">${band.id}</p>
                <h5 class="card-title">${band.name}</h5>
                <p class="card-text">${band.country}</p>
                <p class="card-text">${band.typeofguitars}</p>
                <p class="card-text">${band.year}</p>
                <button type="button" onclick="removeBrand(${band.id})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                <button type="button" onclick="navigateDetailPage(${band.id})" class="btn btn-warning"><i class="fa-solid fa-circle-info"></i></button>
                <button type="button" onclick="ugrapedCart(${band.id})" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat" class="btn btn-primary"><i class="fa-solid fa-address-book"></i></button>
                <button type="button" onclick="addWishList(${band.id})" class="btn btn-dark"><i class="fa-regular fa-heart"></i></button>
            </div>
        </div>
        `
    ))
    cards.innerHTML = cart.join(" ")
}


searchInp.addEventListener("input", () => {
    searchKey = searchInp.value
    let searchData = newData.filter(band => band.name.toLowerCase().includes(searchKey.toLowerCase().trim()))
    brandCard(searchData)
})

sortYear.addEventListener("click", () => {
    newData.sort((a, b) => (a.year - b.year))
    brandCard(newData)
})

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
    addBrands(obj)
        .then(newBrand => {
            newData.push(newBrand)
            brandCard(newData)
        })

    brandName.value = ""
    brandCountry.value = ""
    brandYear.value = ""
    brandLogo.value = ""
    brandGuitarType.value = ""
})

function removeBrand(id) {
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
            deleteBrands(id)
                .then(data => {
                    newData = newData.filter(brand => brand.id !== data.id)
                    brandCard(newData)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                })
        }
    })
}

let selectedId; 

function ugrapedCart(id) {
    selectedId = id; 
    getBrandById(id).then(brand => {
        document.getElementById("brand-name").value = brand.name;
        document.getElementById("brand-country").value = brand.country;
        document.getElementById("brand-year").value = brand.year;
        document.getElementById("brand-logo").value = brand.logo;
        document.getElementById("brand-guitarType").value = brand.typeofguitars;
    });
}

const addUgraped = document.getElementById("addUgraped"); 
addUgraped.addEventListener("click", () => {
    const updatedBrand = {
        name: document.getElementById("brand-name").value,
        country: document.getElementById("brand-country").value,
        year: document.getElementById("brand-year").value,
        logo: document.getElementById("brand-logo").value,
        typeofguitars: document.getElementById("brand-guitarType").value
    };

    putBrandy(selectedId, updatedBrand)
        .then(updatedBrand => {
            newData = newData.map(b => b.id === selectedId ? updatedBrand : b);
            brandCard(newData);
        });
});

function addWishList(id) {
    let brand = JSON.parse(localStorage.getItem("brand"))
    let exitItem = brand.find(item => item.id == id)

    if (!exitItem) {
        brand.push({ id });
    } else {
        brand = brand.filter(item => item.id !== id);
    }


    localStorage.setItem("brand", JSON.stringify(brand))
    console.log(brand)
}


function navigateDetailPage(id) {
    window.location.href = `detail.html?id=${id}&source=brand`
}

