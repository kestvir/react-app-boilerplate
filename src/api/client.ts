export const client = async <T>(
  path: string,
  config?: RequestInit
): Promise<T> => {
  const request = new Request(path, config);
  const response = await fetch(request);

  if (response.ok) return await response.json();

  const errorMessage = await response.text();

  return Promise.reject(new Error(errorMessage));
};
