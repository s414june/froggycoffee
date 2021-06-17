function init() {
    let headNavbar = document.querySelector('#head-navbar')
    let footerDiv = document.querySelector('footer')
    headerContain(headNavbar)
    footerContain(footerDiv)
    extensionFn()
}

function extensionFn() {
    //tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}