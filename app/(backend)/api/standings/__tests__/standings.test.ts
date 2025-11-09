import { GET } from "../../standings/route";
import { externalAPI } from "../../../api/utils/axios-external";

jest.mock("../../../utils/axios-external", () => ({
  api: {
    get: jest.fn(),
  },
}));

describe("GET /standings", () => {
  it("returns data on success", async () => {
    (externalAPI.get as unknown as jest.Mock).mockResolvedValueOnce({
      data: { table: [] },
    });

    const res = await GET();
    const json = await res.json();

    expect(externalAPI.get).toHaveBeenCalledWith("/standings", {
      params: { year: "2020", group: "league" },
    });
    expect(json).toEqual({ table: [] });
  });

  it("handles error", async () => {
    (externalAPI.get as unknown as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );

    const res = await GET();
    const json = await res.json();

    expect(json).toEqual({
      error: "fail",
      status: undefined,
    });
  });
});
