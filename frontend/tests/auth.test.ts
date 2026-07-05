import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { verifyAdminCredentials, generateSessionToken, verifySessionToken, checkLoginRateLimit, recordFailedLogin } from "@/lib/auth";

describe("Authentication Utilities", () => {
  const originalEnv = process.env;

  beforeAll(() => {
    process.env = {
      ...originalEnv,
      ADMIN_USERNAME: "testadmin",
      ADMIN_PASSWORD: "testpassword",
      ADMIN_SESSION_SECRET: "my-super-secret-session-key-minimum-32-chars-long",
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("verifyAdminCredentials", () => {
    it("should return true for correct credentials", () => {
      expect(verifyAdminCredentials("testadmin", "testpassword")).toBe(true);
    });

    it("should return false for incorrect username", () => {
      expect(verifyAdminCredentials("wrong", "testpassword")).toBe(false);
    });

    it("should return false for incorrect password", () => {
      expect(verifyAdminCredentials("testadmin", "wrong")).toBe(false);
    });
  });

  describe("Session Tokens", () => {
    it("should generate and verify a valid session token", () => {
      const token = generateSessionToken();
      expect(token).toContain(".");
      expect(verifySessionToken(token)).toBe(true);
    });

    it("should reject an invalid token format", () => {
      expect(verifySessionToken("invalidtoken")).toBe(false);
      expect(verifySessionToken("123456789.invalidsig")).toBe(false);
    });

    it("should reject expired tokens", () => {
      // 25 hours ago
      const expiredIat = Date.now() - 25 * 60 * 60 * 1000;
      const expiredToken = `${expiredIat}.somesig`;
      expect(verifySessionToken(expiredToken)).toBe(false);
    });
  });

  describe("Login Rate Limiting", () => {
    it("should allow initial attempts but lockout after max limits", async () => {
      const testIp = "192.168.1.100";
      
      // We perform 5 fast failed attempts
      for (let i = 0; i < 5; i++) {
        const check = await checkLoginRateLimit(testIp);
        expect(check.allowed).toBe(true);
        await recordFailedLogin(testIp);
      }

      // 6th attempt should block
      const blockedCheck = await checkLoginRateLimit(testIp);
      expect(blockedCheck.allowed).toBe(false);
      expect(blockedCheck.retryAfterMs).toBeGreaterThan(0);
    });
  });
});
