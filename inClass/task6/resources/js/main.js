window.onload = function () {
    let tag = this.document.getElementById('warning');
    if (this.sessionStorage['invalid']) {
        this.sessionStorage.removeItem("invalid");
        tag.style.display = 'block';
        // remove on click
        tag.addEventListener('click', function () { tag.style.display = 'none' });
    }
    
    console.log(errors);
};