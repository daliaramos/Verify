import { screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("Math.sqrt()", () => {
    expect(Math.sqrt(4)).toBe(2);
    expect(Math.sqrt(144)).toBe(12);
    expect(Math.sqrt(2)).toBe(Math.SQRT2);
});

describe("Renders React components correctly", async () => {
    it("Should render the page correctly", async () => {
        // Setup
        const h1 = await screen.queryByText("Vite + React");

        // Expectations
        expect(h1).not.toBeNull();
        expect(h1).toBeVisible();

    });
});
