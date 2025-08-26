// Redirect to another page when the button is clicked
document.addEventListener('DOMContentLoaded', function() {
    var btn = document.querySelector('.btn');
    if (btn) {
        btn.addEventListener('click', function() {
            window.location.href = 'main.html'; // Change to your target page
        });
    }
});
