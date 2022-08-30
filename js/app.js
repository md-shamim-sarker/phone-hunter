// Load data from api
const loadPhones = async (searchText, isLimit) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        displayPhones(data, isLimit);
    } catch(error) {
        console.log(error);
    }
};

// Display method to show data
const displayPhones = (phones, isLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    phones = phones.data;

    const showAll = document.getElementById('btn-show-all');
    if(isLimit) {
        if(phones.length > 12) {
            phones = phones.slice(0, 8);
            showAll.classList.remove('d-none');
        } else {
            showAll.classList.add('d-none');
        }
    } else {
        showAll.classList.add('d-none');
    }

    const noPhone = document.getElementById('no-found-message');
    if(phones.length == 0) {
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none');
    }

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
    toggleSpinner(false);
};

// Pick data from input fied and set that data to fetch
const processSearch = (isLimit) => {
    const inputField = document.getElementById('search-field').value;
    loadPhones(inputField, isLimit);
};

// Search button event handler
document.getElementById('search-btn').addEventListener('click', () => {
    toggleSpinner(true);
    processSearch(true);
});

// Enter key event handler
document.getElementById('search-field').addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        toggleSpinner(true);
        processSearch(true);
        document.getElementById('search-field').blur();
    }
});

// Show All Phones button event handler
document.getElementById('btn-show-all').addEventListener('click', () => {
    toggleSpinner(true);
    processSearch(false);
});

// Loader spinner show and hide
const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if(isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
};

// Default data
loadPhones('phone', true);