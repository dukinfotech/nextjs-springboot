import { AuthType } from "@/states/authAtom";

const getHeaders = async () => {
  let accessToken = "";
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    try {
      const authCookie = cookies().get("auth")?.value || "";
      const authObj = JSON.parse(authCookie) as AuthType;
      accessToken = authObj.accessToken;
    } catch (error) {}
  } else {
    const { getCookie } = await import("cookies-next");
    try {
      const authCookie = getCookie("auth") as string;
      const authObj = JSON.parse(authCookie) as AuthType;
      accessToken = authObj.accessToken;
    } catch (error) {}
  }

  return {
    "Content-Type": "application/json",
    "Authorization": accessToken ? `Bearer ${accessToken}` : "",
  };
};

const get = async (url: string, headers?: Object) => {
  if (typeof window === "undefined") url = "http://localhost:8080" + url;
  return await fetch(url, {
    method: "GET",
    headers: await getHeaders(),
  });
};

const post = async (url: string, body?: Object, headers?: Object) => {
  if (typeof window === "undefined") url = "http://localhost:8080" + url;
  return await fetch(url, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
};

const put = async (url: string, body?: Object, headers?: Object) => {
  if (typeof window === "undefined") url = "http://localhost:8080" + url;
  return await fetch(url, {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
};

const softDelete = async (url: string, body?: Object, headers?: Object) => {
  if (typeof window === "undefined") url = "http://localhost:8080" + url;
  return await fetch(url, {
    method: "DELETE",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
};

export const api = {
  get,
  post,
  put,
  softDelete,
};
