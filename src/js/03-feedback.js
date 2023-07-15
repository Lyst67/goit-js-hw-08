import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const text = document.querySelector('textarea');
const LOCAL_KEY = 'feedback-form-state';
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

const info = {};
form.addEventListener('input', throttle(onLocalStorageSet, 500));
form.addEventListener('submit', onCleanLocalStorage);
let storageData = getStorageData(LOCAL_KEY) || {};

if (storageData.imail || storageData.message) {
  input.value = storageData.imail || '';
  text.value = storageData.message || '';
}

function onLocalStorageSet() {
  info.imail = input.value;
  info.message = text.value;
  setStorageData(LOCAL_KEY, info);
}

function onCleanLocalStorage(evt) {
  evt.preventDefault();
  console.log(storageData);
  localStorage.clear();
  input.value = '';
  text.value = '';
}
