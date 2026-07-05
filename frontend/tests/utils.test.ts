import { describe, it, expect } from "vitest";
import { insertServiceSchema, insertConsultationSchema } from "@/shared/schema";
import { cn } from "@/lib/utils";
import { ok, fail } from "@/lib/api-response";

describe("Classname merger utility (cn)", () => {
  it("should merge basic classnames", () => {
    expect(cn("bg-red-500", "p-4")).toBe("bg-red-500 p-4");
  });

  it("should merge overlapping Tailwind classes", () => {
    expect(cn("p-4", "p-6")).toBe("p-6");
  });
});

describe("Zod validation schemas", () => {
  describe("insertServiceSchema", () => {
    it("should validate a correct service body", () => {
      const valid = {
        order: 1,
        titleEn: "Custom Software",
        titleAr: "برمجيات مخصصة",
        descriptionEn: "We build custom software.",
        descriptionAr: "نحن نبني برمجيات مخصصة.",
        published: true,
      };
      const result = insertServiceSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should fail validation if fields are missing", () => {
      const invalid = {
        order: 1,
      };
      const result = insertServiceSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("insertConsultationSchema", () => {
    it("should validate correct email addresses", () => {
      const valid = {
        name: "Test User",
        email: "test@sehle.site",
        message: "Hello world!",
      };
      const result = insertConsultationSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should block invalid email formats", () => {
      const invalid = {
        name: "Test User",
        email: "invalid-email",
        message: "Hello world!",
      };
      const result = insertConsultationSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });
});

describe("API Response Utilities", () => {
  it("should format success envelopes correctly", async () => {
    const data = { id: 1, name: "Item" };
    const meta = { page: 1, limit: 10 };
    const response = ok(data, meta);
    
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data).toEqual(data);
    expect(body.meta).toEqual(meta);
  });

  it("should format fail envelopes correctly", async () => {
    const response = fail("ERROR_CODE", "Something went wrong", { field: "email" }, 400);
    
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("ERROR_CODE");
    expect(body.error.message).toBe("Something went wrong");
    expect(body.error.details).toEqual({ field: "email" });
  });
});
