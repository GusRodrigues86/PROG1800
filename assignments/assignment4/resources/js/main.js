window.onload = function () {
    let tag = this.document.getElementById('errorBox');
    if (!tag.innerHTML.trim() == "") {
        tag.style.display = 'block';
        // remove on click
        tag.addEventListener('click', function () { tag.style.display = 'none' });
    } else {
        tag.style.display = 'none';
    }
};