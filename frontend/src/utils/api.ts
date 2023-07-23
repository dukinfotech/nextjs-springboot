import { store } from "@/states/store";

const getHeaders = () => {
  const authState = store.getState().auth;
  return {
    "Content-Type": "application/json",
    "Authorization": authState.accessToken ? `Bearer ${authState.accessToken}` : "",
  };
};

const get = async (url: string, headers?: Object) => {
  return await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });
};

const post = async (url: string, body?: Object, headers?: Object) => {
  return await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
};

const put = async (url: string, body?: Object, headers?: Object) => {
  return await fetch(url, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
};

const softDelete = async (url: string, body?: Object, headers?: Object) => {
  return await fetch(url, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
};

export const api = {
  get,
  post,
  put,
  softDelete,
};
