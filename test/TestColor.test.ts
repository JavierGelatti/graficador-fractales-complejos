import {describe, test, expect} from "vitest";
import { Color } from "../js/utilidades/Color";

describe("los colores", () => {
    test("saben expresarse en sintaxis rgb", () => {
        const color = new Color(1, 2, 3);
        expect(color.rgb).toBe("rgb(1, 2, 3)");
    });
});
