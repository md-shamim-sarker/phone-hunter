// Load data from api
const loadPhones = async (searchText) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        displayPhones(data);
    } catch(error) {
        console.log(error);
    }
};

// Display method to show all data
const displayPhones = (phones) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    phones = phones.data;
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="bg-light">
                <div class="card">
                    <div class="p-4">
                        <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the
                                    bulk of the card's
                                    content.</p>
                        <button href="#" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">Show Details</button>
                    </div>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
};

// Search button event handler
document.getElementById('search-btn').addEventListener('click', () => {
    processSearch();
});

// Enter key event handler
document.getElementById('search-field').addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        processSearch();
        document.getElementById('search-field').blur();
    }
});

// Pick data from input fied and set that data to fetch
const processSearch = () => {
    const inputField = document.getElementById('search-field').value;
    loadPhones(inputField);
};

// Default data
loadPhones('apple');