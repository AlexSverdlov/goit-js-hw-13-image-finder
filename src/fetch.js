import refs from './refs.js';
import template from './temlates/item.hbs';

export default {
  query: '',
  page: 1,
  perPage: 12,
  baseUrl: `https://pixabay.com/api/`,

  get queryValue() {
    return this.query;
  },
  set queryValue(val) {
    return (this.query = val);
  },
  getFetch(val = this.query, place) {
    this.queryValue = val;
    let key = `19640403-30f621284d90658aa34214f88`;
    let params = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=`;
    let url = this.baseUrl + params + key;
    return fetch(url)
      .then(respose => {
        return respose.json();
      })
      .then(data => {
        return data.hits;
      })
      .then(data => {
        const items = template(data);
        // Координаты кнопки до вставки новых изображений
        const koordBtn = document.querySelector('.loadmore').offsetTop;
        place.insertAdjacentHTML('beforeend', items);
        if (this.page > 1) {
          setTimeout(() => {
            window.scrollTo({
              top: koordBtn,
              behavior: 'smooth',
            });
          }, 500);
        }
      });
  },
  setPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
