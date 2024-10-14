const form = document.getElementById('form');
const input = document.getElementById('category-input');
const button = document.getElementById('button');
const bookList = document.getElementById('book-list');
const title = document.getElementById('titolo');
const title2 = document.getElementById('titolo2');

[title, title2].forEach(t => t.textContent = t.textContent.toUpperCase());

const handleSubmit = (event) => {
    event.preventDefault();
    const category = input.value.trim();
    category ? fetchBooks(category) : alert('Inserisci una categoria valida.');
};

form.addEventListener('submit', handleSubmit);
button.addEventListener('submit', handleSubmit);

const fetchBooks = (category) => {
    axios.get(`https://openlibrary.org/subjects/${category.toLowerCase()}.json`)
        .then(response => displayBooks(response.data.works))
        .catch(() => alert('Categoria non trovata o errore nel recupero dei dati.'));
};

const displayBooks = (books) => {
    bookList.innerHTML = books.length
        ? books.map(book => `
            <div class="book-item">
                <img src="${book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` : 'img/immagine_disponibile.svg'}" alt="${book.title} Cover" class="book-cover">
                <h3>${book.title}</h3>
                <p>Autori: ${book.authors.map(a => a.name).join(', ')}</p>
            </div>
        `).join('') 
        : '<p>Nessun libro trovato per questa categoria.</p>';

    document.querySelectorAll('.book-item').forEach((item, i) => {
        item.addEventListener('click', () => fetchBookDetails(books[i].key));
    });
};

const fetchBookDetails = (bookKey) => {
    axios.get(`https://openlibrary.org${bookKey}.json`)
        .then(response => displayBookDetails(response.data))
        .catch(() => alert('Errore nel recupero della descrizione del libro.'));
};

const displayBookDetails = (book) => {
    alert(book.description ? book.description.value || book.description : 'Descrizione non disponibile.');
};
import axios from 'axios'; 