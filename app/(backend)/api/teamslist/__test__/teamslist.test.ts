import { api } from "@/app/(backend)/api/utils/axios-external";
import { GET } from "../../teamslist/route";

jest.mock("@/app/utils/axios-utils", () => {
  api: {
    get: jest.fn();
  }
});

describe("GET /standings", () => {
  it("returns data on success", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce({
      data: { table: [] },
    });
  });
});
