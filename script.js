const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

function onSubmit(e) {
    e.preventDefault();

    if (isInputValid()) {
        addItemToList();
    } else {
        alert('Please add an item');
    }
}

function isInputValid() {
    return itemInput.value !== '';
}

function addItemToList() {
    const item = createItem();

    itemList.appendChild(item);

    clearInput();
}

function createItem() {
    const item = createListItemWithInputAsText();
    const button = createBtnWithIcon();

    item.appendChild(button);

    return item;
}

function createListItemWithInputAsText() {
    const li = document.createElement('li');
    const itemText = document.createTextNode(itemInput.value);
    
    li.appendChild(itemText);

    return li;
}

function createBtnWithIcon() {
    const button = createBtn();
    const icon = createIcon();

    button.appendChild(icon);

    return button;
}

function createBtn() {
    const button = document.createElement('button');
    button.className = 'remove-item btn-link text-red';

    return button;
}

function createIcon() {
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark';

    return icon;
}

function clearInput() {
    itemInput.value = '';
}

// Event listeners
itemForm.addEventListener('submit', onSubmit);