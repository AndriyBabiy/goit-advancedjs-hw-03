import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_93kzxPqZS9E6ojCL8XkLA4w6GnhQGrGXpUQVK67EZJHlYyynejv0lm0RzZHOnfPA";

export const fetchBreeds = () => {
  return catApiFetchTemplate('/v1/breeds');
}

export const fetchCatByBreed = (breed) => {
  return catApiFetchTemplate(
    '/v1/images/search',
    {
      api_key: 'live_93kzxPqZS9E6ojCL8XkLA4w6GnhQGrGXpUQVK67EZJHlYyynejv0lm0RzZHOnfPA',
      breed_ids: breed
    });
}

function catApiFetchTemplate(endPoint, inputParams) {
  const CORE_LINK = 'https://api.thecatapi.com';
  const END_POINT = endPoint;

  const params = new URLSearchParams(inputParams);

  return fetch(
    `${CORE_LINK}${END_POINT}?${params}`,
    {
      headers: {

      }
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  })
}