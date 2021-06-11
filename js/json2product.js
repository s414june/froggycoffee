function showProductFn(obj) {
    productContainer.innerHTML = ""
    obj.forEach(item => {
        let productsAll = document.createElement('div')
        productsAll.className = 'col-lg-4 col-md-6 my-4'
        productsAll.innerHTML = `
            <div class="card w-md-75 text-right">
                <img src="./img/${item.filetype}/${item.img}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <div class="row justify-content-end">
                        <div>
                            <p class="card-text" style="text-align:right">NT$${item.price}</p>
                        </div>
                        <a href="#" class="btn btn-info text-white m-2" style="width:6.7rem">加入購物車</a>
                    </div>
                </div>
            </div>
            `
        productContainer.appendChild(productsAll)
    })
}

function productFilter(productFilters, obj) {
    let filterproducts = []
    productFilters.forEach(typefilter => {
        typefilter.onclick = function() {
            let typeId = typefilter.id
            let productUrl = location.origin + "/product.html"
            filterproducts = []
            if (location.href != productUrl) {
                window.location.replace("product.html")
            }
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].filetype == typeId) {
                    filterproducts.push(obj[i])
                }
                if (typeId == "allproduct") {
                    filterproducts.push(obj[i])
                }
            }
            showProductFn(filterproducts)
        }
    })
}