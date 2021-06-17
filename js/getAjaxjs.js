function getAjax(Httpurl, callbackFn) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', Httpurl)
    xhr.send()
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
            callbackFn(xhr)
        }
    }
}