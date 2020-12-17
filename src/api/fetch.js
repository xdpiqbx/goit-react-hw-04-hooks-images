const API_KEY = '18591857-af67bc0007236afb4a9ddb74e';
const BASE_URL = 'https://pixabay.com/api/';

export default function mainFetch(query, page) {
  const queryString = [
    `q=${query}`,
    `page=${page}`,
    `key=${API_KEY}`,
    `image_type=photo`,
    `orientation=horizontal`,
    `per_page=12`,
  ];

  return fetch(`${BASE_URL}?${queryString.join('&')}`).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Нет таких картинок ${query}`));
  });
}
