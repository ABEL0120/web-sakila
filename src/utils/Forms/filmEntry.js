export const registerFilm = async (data) => {
  let url = `http://localhost:3000/api/films`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const updateFilm = async (data) => {
  let url = `http://localhost:3000/api/films/${data.film_id}`;
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const delFilm = async (data) => {
  let url = `http://localhost:3000/api/films/${data.film_id}`;
  const res = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
