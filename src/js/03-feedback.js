import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const text = document.querySelector('textarea');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const setStorageData = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};
const getStorageData = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const formInfo = {};
form.addEventListener('input', throttle(onLocalStorageSet, 500));
form.addEventListener('submit', onCleanLocalStorage);
let storageData = getStorageData(LOCALSTORAGE_KEY) || {};
pageReload();

function pageReload() {
  if (storageData.imail || storageData.message) {
    input.value = storageData.email || '';
    text.value = storageData.message || '';
  }
}

function onLocalStorageSet() {
  formInfo.email = input.value;
  formInfo.message = text.value;
  setStorageData(LOCALSTORAGE_KEY, formInfo);
}

function onCleanLocalStorage(evt) {
  evt.preventDefault();
  const email = input.value;
  const message = text.value;
  console.log({ email, message });
  if (email === '' || message === '') {
    alert('Please fill out all the fields!');
  } else {
    localStorage.removeItem(LOCALSTORAGE_KEY);
    form.reset();
  }
}
