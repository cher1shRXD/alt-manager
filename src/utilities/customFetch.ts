import { ErrorResponse } from "@/types/ErrorResponse";

const request = async <T>(url: string, options: any = {}) => {
  try {
    let fetchOptions = { ...options };
    if (fetchOptions.body instanceof FormData) {
      fetchOptions.headers = fetchOptions.headers ? { ...fetchOptions.headers } : {};
    } else {
      fetchOptions.headers = fetchOptions.headers ? { ...fetchOptions.headers, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
    }
    const response = await fetch(`${url}`, fetchOptions);
    if (!response.ok) {
      const error = await response.json() as ErrorResponse;
      throw new Error(error.message);
    }
    return await response.json() as T;
  } catch (e) {
    console.log();
    return Promise.reject(e);
  }
}

export const customFetch = {
  get: <T>(url: string) => request<T>(url),

  post: <T>(url: string, body: object) =>
    request<T>(url, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(url: string, body: object) =>
    request<T>(url, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(url: string) =>
    request<T>(url, {
      method: 'DELETE',
    }),
};