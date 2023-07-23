const get = async (url: string, headers?: Object) => {
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const post = async (url: string, body?: Object, headers?: Object) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const put = async (url: string, body?: Object, headers?: Object) => {
  return await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const softDelete = async (
  url: string,
  body?: Object,
  headers?: Object
) => {
  return await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const api = {
  get,
  post,
  put,
  softDelete,
};
