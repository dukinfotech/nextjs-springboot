import { redirect } from "next/navigation";

const getHeaders = async () => {
  let accessToken = "";
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    accessToken = cookies().get("accessToken")?.value || "";
  } else {
    const { getCookie } = await import("cookies-next");
    accessToken = getCookie("accessToken") as string;
  }

  return {
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };
};

const getUrl = (path: string) => {
  let host = "";
  if (typeof window === "undefined") {
    host = process.env.APP_HOST ?? "http://localhost:8080";
  }
  const url = host + path;
  return url;
};

const get = async (path: string, headers?: Object) => {
  const res = await fetch(getUrl(path), {
    method: "GET",
    cache: "no-store",
    headers: await getHeaders(),
  });
  if (res.status === 401) redirect("/login?isExpired=true");
  return res;
};

const post = async (path: string, body?: Object, headers?: Object) => {
  const res = await fetch(getUrl(path), {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
  if (res.status === 401 && path !== "/api/auth/login") redirect("/login?isExpired=true");
  return res;
};

const put = async (path: string, body?: Object, headers?: Object) => {
  const res = await fetch(getUrl(path), {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
  if (res.status === 401) redirect("/login?isExpired=true");
  return res;
};

const softDelete = async (path: string, body?: Object, headers?: Object) => {
  const res = await fetch(getUrl(path), {
    method: "DELETE",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
  if (res.status === 401) redirect("/login?isExpired=true");
  return res;
};

export const api = {
  get,
  post,
  put,
  softDelete,
};
