export const registerFilm = async (data) => {
  let url = `${process.env.DOMAIN_API}/api/films`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resJson = await res.json();
  return resJson;
}