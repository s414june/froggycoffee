"use strict";
let cartLsit = []
let cartQuantityInnerText = 0
cartLsit = JSON.parse(localStorage.getItem('cartLsit'))
cartQuantityInnerText = JSON.parse(localStorage.getItem('cartQuantityInnerText'))

function headerContain(headNavbar) {
    let headerContainer = document.createElement('div')
    headerContainer.className = "container"
    headerContainer.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.html">
                        <div class="text-logo">
                            <h2>雛蛙</h2>
                            <h2>咖啡</h2>
                        </div>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="index.html">首頁</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="index.html#coffee">典藏咖啡</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle mx-2" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    線上選購
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" onclick="filterAndLoader('all')">所有商品</a></li>
                                    <li><a class="dropdown-item" onclick="filterAndLoader('dripbag')">濾掛式咖啡</a></li>
                                    <li><a class="dropdown-item" onclick="filterAndLoader('bean')">精選咖啡豆</a></li>
                                    <li><a class="dropdown-item" onclick="filterAndLoader('book')">二手書本</a></li>
                                </ul>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="index.html#store-map">聯絡雛蛙</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link text-black cart-name-place" href="cart.html">
                                    購物車
                                    <span class="cart-quantity">0</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    `
    headNavbar.appendChild(headerContainer)
    updateCartQuantity()
}

function footerContain(footerDiv) {
    footerDiv.innerHTML = `
    <div class="container-fluid pt-4 text-black-50 text-center bg-light align-bottom">
        <div class="row">
        <div class="col-12 contact-info">
                <p class="px-4">
                    <span class="px-2"><i class="fas fa-envelope"></i></span>s414june@gmail.com
                </p>
                <p class="px-4">
                    <span class="px-2"><i class="fas fa-phone-alt"></i></span>0900-000-000
                </p>
                <p class="px-4">
                    <span class="px-2"><i class="fas fa-map-marker-alt"></i></span>228新北市貢寮區福連里
                </p>
            </div>
        </div>
        <div class="row pb-4">
            <div class="col-12">
                <small>Copyright © froggy café 著作權所有. All rights reserved.</small>
            </div>
            <div class="col-12">
            <a href="#" class="text-black-50 quote-info" data-bs-toggle="tooltip" title="您將會看到著作權引用相關資訊，以及此網站的製作來由" style="text-decoration:none;">
                <small><span class="px-1"><i class="fas fa-question-circle"></i></span>更多資訊
                </small>
            </a>
        </div>
    </div>
    `
}

function updateCartQuantity() {
    if (cartLsit == [] || cartLsit == null) return
    let cartQuantity = document.querySelector('.cart-quantity')
    cartQuantityInnerText = JSON.parse(localStorage.getItem('cartQuantityInnerText'))
    cartQuantityInnerText = cartLsit.length
    localStorage.setItem('cartQuantityInnerText', JSON.stringify(cartQuantityInnerText))
    cartQuantity.innerText = String(cartQuantityInnerText)
}