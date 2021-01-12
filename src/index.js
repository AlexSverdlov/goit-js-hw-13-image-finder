import './styles.css';
import fetchObject from './fetch.js';
import x from './refs.js';
const { form, input, searchBtn, gallery, loadmoreBtn } = x;
form.addEventListener('submit', e => {
  e.preventDefault();
  gallery.innerHTML = '';
  const inputValue = e.target.elements.query.value;
  fetchObject.resetPage();
  fetchObject.getFetch(inputValue, gallery);
  input.value = '';
  loadmoreBtn.classList.remove('isHiden');
});

loadmoreBtn.addEventListener('click', () => {
  fetchObject.setPage();
  fetchObject.getFetch(undefined, gallery);
});
