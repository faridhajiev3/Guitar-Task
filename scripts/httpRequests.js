async function getBrands() {
    let res = await axios("https://66d06634181d059277de6dbc.mockapi.io/brand")
    console.log(res.data)
    return res.data
}

async function addBrands(id) {
    let res = await axios.post("https://66d06634181d059277de6dbc.mockapi.io/brand", id)
    return res.data
}

async function deleteBrands(id) {
    let res = await axios.delete(`https://66d06634181d059277de6dbc.mockapi.io/brand/${id}`) 
    return res.data
}

async function getBrandById(id) {
    let res = await axios(`https://66d06634181d059277de6dbc.mockapi.io/brand/${id}`)
    return res.data
}

async function putBrandy(id, updatedData) {
    let res = await axios.put(`https://66d06634181d059277de6dbc.mockapi.io/brand/${id}`, updatedData);
    return res.data;
}

//! GUITAR

async function getGuitar() {
    let res = await axios("https://66d06634181d059277de6dbc.mockapi.io/guitar")
    return res.data
}

async function deleteGuitar(id) {
    let res = await axios.delete(`https://66d06634181d059277de6dbc.mockapi.io/guitar/${id}`)
    return res.data
}

async function getGuitarById(id) { 
    let res = await axios(`https://66d06634181d059277de6dbc.mockapi.io/guitar/${id}`)
    return res.data
}

async function addGuitars(id) {
    let res = await axios.post("https://66d06634181d059277de6dbc.mockapi.io/guitar", id)
    return res.data
}

async function putGuitar(id, updatedData) {
    let res = await axios.put(`https://66d06634181d059277de6dbc.mockapi.io/brand/${id}`, updatedData);
    return res.data;
}