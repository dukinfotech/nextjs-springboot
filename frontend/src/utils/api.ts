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

const getUrl = (path: string) => {
  let host = "";
  if (typeof window === "undefined") {
    host = process.env.APP_HOST ?? "http://localhost:8080";
  }
  const url = host + path;
  return url;
}

const get = async (path: string, headers?: Object) => {
  return await fetch(getUrl(path), {
    method: "GET",
    cache: "no-store",
    headers: await getHeaders(),
  });
};

const post = async (path: string, body?: Object, headers?: Object) => {
  return await fetch(getUrl(path), {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
};

const put = async (path: string, body?: Object, headers?: Object) => {
  return await fetch(getUrl(path), {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
};

const softDelete = async (path: string, body?: Object, headers?: Object) => {
  return await fetch(getUrl(path), {
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
