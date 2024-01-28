function catApiFetchTemplate(endPoint, inputParams) {
  const CORE_LINK = 'https://api.thecatapi.com';
  const END_POINT = endPoint;

  const params = new URLSearchParams(inputParams);

  return fetch(
    `${CORE_LINK}${END_POINT}?${params}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  })
}

export const fetchBreeds = () => {
  return catApiFetchTemplate('/v1/breeds');
}

export const fetchCatImgByBreed = (breed) => {
  return catApiFetchTemplate(
    '/v1/images/search',
    {
      breed_ids: breed
    });
}

export const fetchCatInfoByBreed = (breed) => {
  return catApiFetchTemplate(
    '/v1/breeds',
    {
      breed_ids: breed
    });
}