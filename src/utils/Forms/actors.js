export const registerActor = async (data) => {
  let url = `http://localhost:3000/api/actors`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const updateActor = async (data) => {
  let url = `http://localhost:3000/api/actors/${data.actor_id}`;
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const delActor = async (data) => {
  let url = `http://localhost:3000/api/actors/${data.actor_id}`;
  const res = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
