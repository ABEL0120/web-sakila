export const registrarse = async (data) => {
  let url = `${process.env.DOMAIN_API}/api/auth/register`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      // Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const resJson = await res.json();
  return resJson;
};
