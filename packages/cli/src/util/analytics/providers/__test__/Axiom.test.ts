import Axiom from "../Axiom";
import fetch from "node-fetch";

jest.mock("node-fetch");

describe("Axiom", () => {
  let axiom: Axiom;
  beforeEach(() => {
    axiom = new Axiom("apiToken", "datasetName");
  });

  describe("#trackMany", () => {
    it("should call fetch with the correct arguments", () => {
      axiom.trackMany([
        { event: "test.event.one", properties: { foo: "bar.one" } },
        { event: "test.event.two", properties: { foo: "bar.two" } },
      ]);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://cloud.axiom.co/api/v1/datasets/datasetName/ingest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer apiToken",
          },
          body: JSON.stringify([
            {
              event: "test.event.one",
              properties: { foo: "bar.one" },
            },
            {
              event: "test.event.two",
              properties: { foo: "bar.two" },
            },
          ]),
        }
      );
    });
  });

  describe("#track", () => {
    it("should call fetch with the correct arguments", () => {
      axiom.track({ event: "test.event", properties: { foo: "bar" } });
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://cloud.axiom.co/api/v1/datasets/datasetName/ingest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer apiToken",
          },
          body: JSON.stringify({
            event: "test.event",
            properties: { foo: "bar" },
          }),
        }
      );
    });
  });
});
