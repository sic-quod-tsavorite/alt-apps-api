import { test, expect } from "@playwright/test";

export default function health() {
  test("Health check", async ({ request }) => {
    const response = await request.get("/aa-api/");
    const json = await response.json();

    expect(response.status()).toBe(200);
    expect(json).toEqual({ message: "Alt apps API is running!" });
  });
}
