// Vlidation
document.querySelector("form").addEventListener("submit", function(event) {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    if (title.length > 100) {
        alert("Title should be less than 100 characters.");
        event.preventDefault();
    }

    if (author.length > 50) {
        alert("Author's name should be less than 50 characters.");
        event.preventDefault();
    }
});

// Animations
window.onload = function() {
    const form = document.querySelector("form");
    form.style.opacity = 0;
    let opacityValue = 0;

    const fadeInInterval = setInterval(function() {
        if (opacityValue < 1) {
            opacityValue += 0.05;
            form.style.opacity = opacityValue;
        } else {
            clearInterval(fadeInInterval);
        }
    }, 50);
};

//AJAX Requests

function loadBooks() {
    fetch('/books')
        .then(response => response.json())
        .then(data => {
            const bookListDiv = document.getElementById('bookList');
            bookListDiv.innerHTML = ''; // Clear any previous list

            if (data.length === 0) {
                bookListDiv.innerHTML = 'No books recommended yet.';
                return;
            }

            data.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.innerHTML = `<strong>Title:</strong> ${book.title} <strong>Author:</strong> ${book.author}`;
                bookListDiv.appendChild(bookItem);
            });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
}

