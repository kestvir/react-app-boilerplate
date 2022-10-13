import * as Client from "../client";

describe("client", () => {
  it("handles success responses", async () => {
    const mockResponse = {
      data: "fake data",
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };

    const mock = jest
      .spyOn(Client, "client")
      .mockImplementation(() => Promise.resolve(mockResponse));
    const response = await Client.client("/test");

    expect(response).toEqual(mockResponse);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith("/test");

    mock.mockRestore();
  });

  it("handles error responses", async () => {
    const mock = jest
      .spyOn(Client, "client")
      .mockImplementation(() => Promise.reject({ statusCode: 404 }));

    await expect(Client.client("/test")).rejects.toMatchObject({
      statusCode: 404,
    });

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith("/test");

    mock.mockRestore();
  });
});
