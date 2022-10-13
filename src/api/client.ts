export const client = async <T>(
  path: string,
  config?: RequestInit
): Promise<T> => {
  return fetch(path, config).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();

      return Promise.reject(new Error(errorMessage));
    }
  });
};
