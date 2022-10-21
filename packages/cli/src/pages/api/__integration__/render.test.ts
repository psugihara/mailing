import { apiRender, ApiRenderGet } from "./util/render";

describe("render", () => {
  it("GET should 200", async () => {
    const instance = new ApiRenderGet();
    const { response } = await instance.perform();

    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.html).toBeDefined;
    expect(data.html).toMatch(/Alex, your table awaits/);
  });

  it("POST should 200", async () => {
    const { response } = await apiRender();
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.html).toBeDefined;
    expect(data.html).toMatch(/Alex, your table awaits/);
  });
});
