import AppApi from "../api/AppApi";
import { act } from "@testing-library/react";

afterEach(() => {
  jest.clearAllMocks();
});

it("Return Rate when API call returns successfully", async () => {
  const spy = jest.spyOn(AppApi, "getCurrency").mockResolvedValueOnce("245");

  const rate = await AppApi.getCurrency();

  expect(spy).toHaveBeenCalledWith(); // Check no arguments
  expect(rate).toEqual("245");
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Thrown Exception when API call fails", async () => {
  const spy = jest
    .spyOn(AppApi, "getCurrency")
    .mockImplementationOnce(() => Promise.reject("API is down"));
  let rate: string;
  await act(async () => {
    try {
      rate = await AppApi.getCurrency().catch();
      expect(spy).toThrowError("API is down");
    } catch (exception) {
      expect(exception).toBe("API is down");
    }
  });

  expect(rate).toEqual(undefined);
  expect(spy).toHaveBeenCalledTimes(1);
});
