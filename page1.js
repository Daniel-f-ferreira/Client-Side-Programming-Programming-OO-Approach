
window.onload = function() {
    // Customers Section
    fetch('https://randomuser.me/api/?results=5').then((resp) => resp.json())
    .then(function(data) {
        var customers = data.results;
        customers.forEach(customer => {
            var tempDiv = document.createElement('div');
            var img = document.createElement('img');
            img.setAttribute('src', customer.picture.medium);
            img.setAttribute('alt', customer.name.first);
            addCustomerParagraph(tempDiv, 'Name: ', `${customer.name.title} ${customer.name.first} ${customer.name.last}`);
            tempDiv.insertAdjacentElement('beforeend', img);
            addCustomerParagraph(tempDiv, 'Phone Number: ', customer.phone);
            addCustomerParagraph(tempDiv, 'DOB: ', customer.dob.date);
            addCustomerParagraph(tempDiv, 'Age: ', customer.dob.age);
            addCustomerParagraph(tempDiv, 'Email ID: ', customer.email);
            addCustomerParagraph(tempDiv, 'Gender: ', customer.gender);
            addCustomerParagraph(tempDiv, 'City: ', customer.location.city);
            addCustomerParagraph(tempDiv, 'Country: ', customer.location.country);
            addCustomerParagraph(tempDiv, 'PostCode: ', customer.location.postcode);
            document.getElementById('customers').insertAdjacentElement('beforeend', tempDiv);
        })
    })
    .catch(function(error) {
        console.log(error);
    });


    //Menu Item Section
    createMenuSection('starters');
    createMenuSection('main');
    createMenuSection('desserts');
    createMenuSection('drinks');

    //method returns the element that has the ID  attribute  with specified atribute 

    document.getElementById('calculateBills').addEventListener("click", function() {
        var allSum = startersSum = mainSum = dessertsSum = drinksSum = vegetarianSum = nonVegetariamSum = 0;

        allSum = getSumBySelector('#calculation-inputs input');
        startersSum = getSumBySelector('#calculation-inputs input.starters');
        mainSum = getSumBySelector('#calculation-inputs input.main');
        dessertsSum = getSumBySelector('#calculation-inputs input.desserts');
        drinksSum = getSumBySelector('#calculation-inputs input.drinks');
        vegetarianSum = getSumBySelector('#calculation-inputs input.vegetarian:not(.desserts):not(.drinks)');
        nonVegetariamSum = getSumBySelector('#calculation-inputs input.non-vegetarian:not(.desserts):not(.drinks)');

        document.getElementById('total-bill').value = allSum;
        document.getElementById('starters-bill').value = startersSum;
        document.getElementById('main-bill').value = mainSum;
        document.getElementById('dessert-bill').value = dessertsSum;
        document.getElementById('drinks-bill').value = drinksSum;
        document.getElementById('vegetarian-cost').value = vegetarianSum;
        document.getElementById('non-vegetarian-cost').value = nonVegetariamSum;

        window.starters = startersSum;
    });
}

function addCustomerParagraph(parent, label, text) {
    var tempParagraph = document.createElement('p');
    tempParagraph.appendChild(document.createTextNode(`${label} ${text}`));
    parent.insertAdjacentElement('beforeend', tempParagraph);
}

// Password Validation Section
function removeElementById(id) {
    if (document.getElementById(id)) {
        document.getElementById(id).remove();
    }
}

function addErrorParagraph(id, text) {
    if (!document.getElementById(id)) {
        var tempParagraph = document.createElement('p');
        tempParagraph.classList.add('error');
        tempParagraph.setAttribute('id', id);
        tempParagraph.appendChild(document.createTextNode(text));
        document.getElementById('error-messages').insertAdjacentElement('beforeend', tempParagraph);
    }
}

window.validateInput = function(event) {
    var value = event.target.value;
    // lowercase validation
    if ((/[a-z]/.test(value))) {
        removeElementById('lowercase-error-msg');
    } else {
        addErrorParagraph('lowercase-error-msg', 'The password must have at least one lowercase letter.');
    }
    // uppercase validation
    if ((/[A-Z]/.test(value))) {
        removeElementById('uppercase-error-msg');
    } else {
        addErrorParagraph('uppercase-error-msg', 'The password must have at least one uppercase letter.');
    }
    // special characters validation
    if ((/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value))) {
        removeElementById('special-char-error-msg');
    } else {
        addErrorParagraph('special-char-error-msg', 'It must contain one digit and one special character.');
    }
    // min length validation
    if (value.length < 8) {
        addErrorParagraph('length-error-msg', 'And it must be at least eight characters long.');
    } else {
        removeElementById('length-error-msg');
    }
}

// Menu Item Utilities
function getSumBySelector(selector) {
    return [...document.querySelectorAll(selector)]
    .map(e => { return {quantity : e.value, cost: e.getAttribute('aria-cost')}})
    .reduce((prev, curr) => {
        if (Number.isInteger(prev)) {
            return prev + parseInt(curr.cost * curr.quantity);
        }
        return parseInt(prev.cost * prev.quantity) + parseInt(curr.cost * curr.quantity);
    });
}

function createMenuSection(section) {
    initialMenu[section].forEach(item => {
        var tempParentDiv = document.createElement('div');
        var tempParagraph = document.createElement('p');
        tempParagraph.appendChild(document.createTextNode(`${item.name} (${item.description})${item.isVegetarian ? ' [VEGETARIAN]': ''}`));
        var tempChildDiv = document.createElement('div');
        tempChildDiv.appendChild(document.createTextNode(`€ ${item.price}`));
        var quantityInput = document.createElement('input');
        setInputAttributes(quantityInput, item);
        quantityInput.classList.add(section);
        tempChildDiv.appendChild(quantityInput, item);
        tempChildDiv.appendChild(document.createTextNode(`quantity`));
        tempParentDiv.appendChild(tempParagraph);
        tempParentDiv.appendChild(tempChildDiv);
        document.getElementById(section).insertAdjacentElement('beforeend', tempParentDiv);
    }) 
}

function setInputAttributes(input, item) {
    input.setAttribute('type','number');
    input.setAttribute('value', 0);
    input.setAttribute('min', 0);
    input.setAttribute('step', 1);
    input.setAttribute('aria-cost', item.price);
    if (item.isVegetarian) {
        input.classList.add('vegetarian');
    } else {
        input.classList.add('non-vegetarian');
    }
}


var initialMenu = {
    starters: [
        {
            name: 'Fruit Salad',
            description: 'A combination of our delicious selected fruits.',
            isVegetarian: true,
            price: 6,
            quantity: 0
        },
        {
            name: 'Bread Sticks',
            description: 'Bread sticks with bacon.',
            isVegetarian: false,
            price: 10,
            quantity: 0
        },
        {
            name: 'Chicken Soup',
            description: 'A delicious and nutritious soup made with chicken.',
            isVegetarian: false,
            price: 8,
            quantity: 0
        }
    ],
    main: [
        {
            name: 'Shrimp Burger',
            description: 'Our best dish! Fleshy shrimps with a special sauce.',
            isVegetarian: false,
            price: 20,
            quantity: 0
        },
        {
            name: 'Champ',
            description: 'Mashed potatoes, with parsley and black pepper.',
            isVegetarian: true,
            price: 15,
            quantity: 0
        },{
            name: 'Salmon to Wine',
            description: 'Fresh salmon, fried with top tier wine.',
            isVegetarian: false,
            price: 28,
            quantity: 0
        }
    ],
    desserts: [
        {
            name: 'Chocolate Cake',
            description: 'A large piece of our delicious cake.',
            isVegetarian: true,
            price: 12,
            quantity: 0
        },
        {
            name: 'Pudding',
            description: 'A super shiny pudding.',
            isVegetarian: true,
            price: 8,
            quantity: 0
        },
        {
            name: 'Ice Cream',
            description: 'Very cold ice cream, with lots of flavors.',
            isVegetarian: true,
            price: 10,
            quantity: 0
        },
    ], 
    drinks: [
        {
            name: 'Water',
            description: 'A simple bottle of water.',
            isVegetarian: true,
            price: 2,
            quantity: 0
        },
        {
            name: 'Soda',
            description: 'A bottle of Cola, 350ml.',
            isVegetarian: true,
            price: 5,
            quantity: 0
        },
        {
            name: 'Juice',
            description: 'A natural juice, from our selected fruits.',
            isVegetarian: true,
            price: 5,
            quantity: 0
        }
    ]
}
