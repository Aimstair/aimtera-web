import {
  confirmAccountDeletionRequest,
  getAdminReports,
  getWaitlistCount,
  submitAccountDeletionRequest,
  submitWaitlist,
  updateAdminDeletionStatus,
} from "@/lib/backendApi";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const createJsonResponse = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });

describe("backendApi", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "anon-key");
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("submits waitlist and handles duplicates", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        createJsonResponse(200, {
          ok: true,
          duplicate: false,
          message: "Joined",
          requestId: "req-1",
        }),
      )
      .mockResolvedValueOnce(
        createJsonResponse(200, {
          ok: true,
          duplicate: true,
          message: "Already joined",
          requestId: "req-2",
        }),
      );

    const first = await submitWaitlist({
      product: "lume",
      email: "hello@example.com",
      captchaToken: "captcha-token",
    });
    const second = await submitWaitlist({
      product: "lume",
      email: "hello@example.com",
      captchaToken: "captcha-token",
    });

    expect(first.duplicate).toBe(false);
    expect(second.duplicate).toBe(true);

    expect(fetch).toHaveBeenCalledWith(
      "https://example.supabase.co/functions/v1/submit-waitlist",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("fetches waitlist counts", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      createJsonResponse(200, {
        ok: true,
        message: "Waitlist count fetched",
        requestId: "req-3",
        product: "symmetryai",
        count: 37,
      }),
    );

    const result = await getWaitlistCount("symmetryai");
    expect(result.count).toBe(37);
    expect(result.product).toBe("symmetryai");
  });

  it("submits account deletion requests", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      createJsonResponse(200, {
        ok: true,
        message: "Please verify from your email.",
        requestId: "req-4",
        deletionRequestId: "del-1",
      }),
    );

    const result = await submitAccountDeletionRequest({
      email: "person@example.com",
      services: ["Lume"],
      reason: "No longer needed",
      captchaToken: "captcha-token",
    });

    expect(result.deletionRequestId).toBe("del-1");
  });

  it("confirms account deletion token", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      createJsonResponse(200, {
        ok: true,
        message: "Verified",
        requestId: "req-5",
        deletionRequestId: "del-2",
        alreadyVerified: false,
      }),
    );

    const result = await confirmAccountDeletionRequest("token-123");

    expect(result.deletionRequestId).toBe("del-2");
    expect(result.alreadyVerified).toBe(false);
    expect(fetch).toHaveBeenCalledWith(
      "https://example.supabase.co/functions/v1/confirm-account-deletion",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("throws edge-function error messages", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      createJsonResponse(429, {
        ok: false,
        error: "Too many requests",
        requestId: "req-6",
      }),
    );

    await expect(
      submitWaitlist({
        product: "lume",
        email: "blocked@example.com",
        captchaToken: "captcha-token",
      }),
    ).rejects.toThrow("Too many requests");
  });

  it("calls admin reports with access token", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      createJsonResponse(200, {
        ok: true,
        message: "Admin reports loaded",
        requestId: "admin-1",
        generatedAt: new Date().toISOString(),
        windowHours: 24,
        pendingDeletionRequests: [],
        rateLimitSummary: [],
        monitoringSummary: {
          totalEvents: 0,
          bySeverity: {
            info: 0,
            warning: 0,
            error: 0,
            critical: 0,
          },
        },
        recentAuditLogs: [],
      }),
    );

    await getAdminReports("admin-token");

    expect(fetch).toHaveBeenCalledWith(
      "https://example.supabase.co/functions/v1/admin-reports",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer admin-token",
        }),
      }),
    );
  });

  it("updates deletion status with access token", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      createJsonResponse(200, {
        ok: true,
        message: "Deletion request updated",
        requestId: "admin-2",
        deletionRequest: {
          id: "del-200",
          email: "person@example.com",
          services: ["Lume"],
          status: "processed",
          created_at: new Date().toISOString(),
          verified_at: new Date().toISOString(),
          reviewed_at: new Date().toISOString(),
          reviewed_by: "admin@aimteralabs.com",
          admin_notes: "handled",
        },
      }),
    );

    const result = await updateAdminDeletionStatus("admin-token", {
      deletionRequestId: "del-200",
      status: "processed",
      adminNotes: "handled",
    });

    expect(result.deletionRequest.status).toBe("processed");
  });
});
