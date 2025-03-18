export const registerApi = async (data, apiName) => {
  let url = `http://localhost:3000/api/${apiName}`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const updateApi = async (data, apiName, idData) => {
  let url = `http://localhost:3000/api/${apiName}/${idData}`;
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const deleteApi = async (data, apiName, idData) => {
  let url = `http://localhost:3000/api/${apiName}/${idData}`;
  const res = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
