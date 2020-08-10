function savePhone(){
    let phone = document.getElementById("phone").value;
    console.log(phone);
    notifyServer('http://localhost:3000/phone', JSON.stringify({'phone':phone, 'from': window.location.href}))
};

function notifyServer(url, body) {
    return new Promise(function (resolve, reject) {
        var xhr = ("onload" in new XMLHttpRequest()) ?
            new XMLHttpRequest() :  window.XDomainRequest ? new XDomainRequest() : null;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.setRequestHeader('X-Boodle-Domain', header.xBoodleDomain);
        if (xhr) {
            if("onload" in xhr) {
                xhr.onload = function() {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr.response);
                    } else {
                        reject({
                            status: this.status,
                            message: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function() {
                    reject({
                        status: this.status,
                        message: xhr.statusText
                    });
                };
            } else {
                xhr.onreadystatechange = function() {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr.response);
                    } else {
                        reject({
                            status: this.status,
                            message: xhr.statusText
                        });
                    }
                }
            }
        } else {
            reject({
                status: 418,
                message: "The browser doesn't support cross-origin request"
            });
        }
        xhr.send(body);
    });
}
