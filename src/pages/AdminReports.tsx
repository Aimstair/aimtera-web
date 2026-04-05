import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import {
  getAdminReports,
  updateAdminDeletionStatus,
  type AdminReportsResponse,
} from "@/lib/backendApi";
import { supabaseClient } from "@/lib/supabaseClient";

const AdminReports = () => {
  const [authEmail, setAuthEmail] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<"idle" | "sending-link" | "ready" | "error">("idle");
  const [authMessage, setAuthMessage] = useState("");

  const [reports, setReports] = useState<AdminReportsResponse | null>(null);
  const [isLoadingReports, setIsLoadingReports] = useState(false);
  const [reportsError, setReportsError] = useState("");

  const [windowHours, setWindowHours] = useState(24);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});
  const [isMutating, setIsMutating] = useState(false);

  const applySession = useCallback(async () => {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    if (session?.access_token) {
      setAccessToken(session.access_token);
      setAuthStatus("ready");
      setAuthMessage(`Signed in as ${session.user.email || "admin user"}.`);
      return;
    }

    setAccessToken(null);
  }, []);

  useEffect(() => {
    void applySession();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session?.access_token) {
        setAccessToken(session.access_token);
        setAuthStatus("ready");
        setAuthMessage(`Signed in as ${session.user.email || "admin user"}.`);
      }

      if (event === "SIGNED_OUT") {
        setAccessToken(null);
        setReports(null);
        setAuthStatus("idle");
        setAuthMessage("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [applySession]);

  const loadReports = useCallback(async () => {
    if (!accessToken) {
      return;
    }

    setIsLoadingReports(true);
    setReportsError("");

    try {
      const response = await getAdminReports(accessToken, windowHours);
      setReports(response);
    } catch (error) {
      setReportsError(
        error instanceof Error ? error.message : "Could not load admin reports.",
      );
    } finally {
      setIsLoadingReports(false);
    }
  }, [accessToken, windowHours]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    void loadReports();
  }, [accessToken, loadReports]);

  const requestMagicLink = async (event: FormEvent) => {
    event.preventDefault();
    if (!authEmail.trim()) {
      return;
    }

    setAuthStatus("sending-link");
    setAuthMessage("");

    const { error } = await supabaseClient.auth.signInWithOtp({
      email: authEmail.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/admin/reports`,
      },
    });

    if (error) {
      setAuthStatus("error");
      setAuthMessage(error.message || "Could not send magic link.");
      return;
    }

    setAuthStatus("idle");
    setAuthMessage("Magic link sent. Open your email to complete sign-in.");
  };

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    setAccessToken(null);
    setReports(null);
    setAuthStatus("idle");
    setAuthMessage("Signed out.");
  };

  const pendingRequests = reports?.pendingDeletionRequests || [];
  const canRenderDashboard = useMemo(() => Boolean(accessToken), [accessToken]);

  const updateStatus = async (
    deletionRequestId: string,
    status: "pending" | "processed" | "rejected",
  ) => {
    if (!accessToken) {
      return;
    }

    setIsMutating(true);
    setReportsError("");

    try {
      await updateAdminDeletionStatus(accessToken, {
        deletionRequestId,
        status,
        adminNotes: adminNotes[deletionRequestId] || "",
      });

      await loadReports();
    } catch (error) {
      setReportsError(
        error instanceof Error ? error.message : "Could not update deletion request.",
      );
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen" style={{ background: "hsl(var(--corp-dark-bg))" }}>
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>
                Admin Reports
              </h1>
              <p className="text-sm mb-8" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                Monitor pending deletion queue, rate-limit incidents, and observability events.
              </p>
            </ScrollReveal>

            {!canRenderDashboard && (
              <ScrollReveal delay={100}>
                <form
                  onSubmit={requestMagicLink}
                  className="rounded-2xl border p-6 space-y-4"
                  style={{
                    background: "hsl(var(--corp-dark-elevated))",
                    borderColor: "hsl(0 0% 100% / 0.08)",
                  }}
                >
                  <h2 className="text-xl font-semibold" style={{ color: "hsl(var(--corp-dark-foreground))" }}>
                    Sign In With Magic Link
                  </h2>
                  <p className="text-sm" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                    Access is restricted to allowlisted admin emails in backend secrets.
                  </p>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(event) => setAuthEmail(event.target.value)}
                    placeholder="admin@aimteralabs.com"
                    className="w-full rounded-lg px-4 py-3 text-sm border focus:outline-none"
                    style={{
                      background: "hsl(var(--corp-dark-bg))",
                      borderColor: "hsl(0 0% 100% / 0.12)",
                      color: "hsl(var(--corp-dark-foreground))",
                    }}
                  />
                  <MagneticButton
                    as="button"
                    disabled={authStatus === "sending-link"}
                    className="px-6 py-3 rounded-full text-sm font-semibold"
                    style={{
                      background: "hsl(var(--corp-dark-foreground))",
                      color: "hsl(var(--corp-dark-bg))",
                    }}
                  >
                    {authStatus === "sending-link" ? "Sending..." : "Send Magic Link"}
                  </MagneticButton>
                  {authMessage && (
                    <p className={`text-sm ${authStatus === "error" ? "text-destructive" : "text-emerald-300"}`}>
                      {authMessage}
                    </p>
                  )}
                </form>
              </ScrollReveal>
            )}

            {canRenderDashboard && (
              <div className="space-y-6">
                <div className="rounded-2xl border p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3" style={{ background: "hsl(var(--corp-dark-elevated))", borderColor: "hsl(0 0% 100% / 0.08)" }}>
                  <div>
                    <p className="text-sm" style={{ color: "hsl(var(--corp-dark-muted))" }}>{authMessage}</p>
                    <label className="text-xs" style={{ color: "hsl(var(--corp-dark-muted) / 0.8)" }}>
                      Window (hours)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={168}
                      value={windowHours}
                      onChange={(event) => setWindowHours(Number(event.target.value) || 24)}
                      className="mt-1 block w-24 rounded-lg px-3 py-2 text-sm border"
                      style={{
                        background: "hsl(var(--corp-dark-bg))",
                        borderColor: "hsl(0 0% 100% / 0.12)",
                        color: "hsl(var(--corp-dark-foreground))",
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <MagneticButton
                      as="button"
                      onClick={() => {
                        void loadReports();
                      }}
                      disabled={isLoadingReports}
                      className="px-5 py-2.5 rounded-full text-sm font-semibold"
                      style={{
                        background: "hsl(var(--corp-dark-foreground))",
                        color: "hsl(var(--corp-dark-bg))",
                      }}
                    >
                      {isLoadingReports ? "Refreshing..." : "Refresh Reports"}
                    </MagneticButton>
                    <MagneticButton
                      as="button"
                      onClick={handleSignOut}
                      className="px-5 py-2.5 rounded-full text-sm font-semibold border"
                      style={{
                        borderColor: "hsl(0 0% 100% / 0.2)",
                        color: "hsl(var(--corp-dark-foreground))",
                      }}
                    >
                      Sign Out
                    </MagneticButton>
                  </div>
                </div>

                {reportsError && <p className="text-sm text-destructive">{reportsError}</p>}

                <section className="grid md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Events",
                      value: reports?.monitoringSummary.totalEvents ?? 0,
                    },
                    {
                      label: "Errors",
                      value:
                        (reports?.monitoringSummary.bySeverity.error || 0) +
                        (reports?.monitoringSummary.bySeverity.critical || 0),
                    },
                    {
                      label: "Pending Deletions",
                      value: pendingRequests.length,
                    },
                    {
                      label: "Rate Keys Triggered",
                      value: reports?.rateLimitSummary.length ?? 0,
                    },
                  ].map((item) => (
                    <article
                      key={item.label}
                      className="rounded-xl border p-4"
                      style={{
                        background: "hsl(var(--corp-dark-elevated))",
                        borderColor: "hsl(0 0% 100% / 0.08)",
                      }}
                    >
                      <p className="text-xs" style={{ color: "hsl(var(--corp-dark-muted))" }}>{item.label}</p>
                      <p className="text-2xl font-semibold" style={{ color: "hsl(var(--corp-dark-foreground))" }}>{item.value}</p>
                    </article>
                  ))}
                </section>

                <section className="rounded-2xl border p-4 md:p-6" style={{ background: "hsl(var(--corp-dark-elevated))", borderColor: "hsl(0 0% 100% / 0.08)" }}>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>
                    Pending Account Deletion Queue
                  </h2>
                  <div className="space-y-4">
                    {pendingRequests.map((requestItem) => (
                      <article
                        key={requestItem.id}
                        className="rounded-xl border p-4"
                        style={{
                          background: "hsl(var(--corp-dark-bg))",
                          borderColor: "hsl(0 0% 100% / 0.08)",
                        }}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold" style={{ color: "hsl(var(--corp-dark-foreground))" }}>
                              {requestItem.email}
                            </p>
                            <p className="text-xs" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                              {requestItem.status} • {new Date(requestItem.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <MagneticButton
                              as="button"
                              disabled={isMutating}
                              onClick={() => {
                                void updateStatus(requestItem.id, "pending");
                              }}
                              className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                              style={{ borderColor: "hsl(0 0% 100% / 0.2)", color: "hsl(var(--corp-dark-foreground))" }}
                            >
                              Mark Pending
                            </MagneticButton>
                            <MagneticButton
                              as="button"
                              disabled={isMutating}
                              onClick={() => {
                                void updateStatus(requestItem.id, "processed");
                              }}
                              className="px-3 py-1.5 rounded-full text-xs font-semibold"
                              style={{ background: "hsl(160 70% 40%)", color: "white" }}
                            >
                              Mark Processed
                            </MagneticButton>
                            <MagneticButton
                              as="button"
                              disabled={isMutating}
                              onClick={() => {
                                void updateStatus(requestItem.id, "rejected");
                              }}
                              className="px-3 py-1.5 rounded-full text-xs font-semibold"
                              style={{ background: "hsl(var(--destructive))", color: "hsl(var(--destructive-foreground))" }}
                            >
                              Mark Rejected
                            </MagneticButton>
                          </div>
                        </div>
                        <p className="text-xs mt-2" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                          Services: {requestItem.services.join(", ")}
                        </p>
                        <textarea
                          value={adminNotes[requestItem.id] || requestItem.admin_notes || ""}
                          onChange={(event) => {
                            setAdminNotes((prev) => ({
                              ...prev,
                              [requestItem.id]: event.target.value,
                            }));
                          }}
                          rows={2}
                          placeholder="Admin notes"
                          className="mt-3 w-full rounded-lg px-3 py-2 text-sm border"
                          style={{
                            background: "hsl(var(--corp-dark-elevated))",
                            borderColor: "hsl(0 0% 100% / 0.1)",
                            color: "hsl(var(--corp-dark-foreground))",
                          }}
                        />
                      </article>
                    ))}
                    {pendingRequests.length === 0 && (
                      <p className="text-sm" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                        No pending deletion requests in this time window.
                      </p>
                    )}
                  </div>
                </section>

                <section className="grid lg:grid-cols-2 gap-6">
                  <article className="rounded-2xl border p-4 md:p-6" style={{ background: "hsl(var(--corp-dark-elevated))", borderColor: "hsl(0 0% 100% / 0.08)" }}>
                    <h2 className="text-lg font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>
                      Rate-Limit Incidents
                    </h2>
                    <div className="space-y-2 max-h-[320px] overflow-auto pr-1">
                      {(reports?.rateLimitSummary || []).map((item) => (
                        <div key={item.rateKey} className="rounded-lg border px-3 py-2 text-xs" style={{ borderColor: "hsl(0 0% 100% / 0.1)", color: "hsl(var(--corp-dark-muted))" }}>
                          <p className="font-semibold" style={{ color: "hsl(var(--corp-dark-foreground))" }}>{item.rateKey}</p>
                          <p>{item.count} hits • latest {new Date(item.latestAt).toLocaleString()}</p>
                        </div>
                      ))}
                      {(reports?.rateLimitSummary || []).length === 0 && (
                        <p className="text-sm" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                          No rate-limit activity in the selected window.
                        </p>
                      )}
                    </div>
                  </article>

                  <article className="rounded-2xl border p-4 md:p-6" style={{ background: "hsl(var(--corp-dark-elevated))", borderColor: "hsl(0 0% 100% / 0.08)" }}>
                    <h2 className="text-lg font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>
                      Recent Audit Logs
                    </h2>
                    <div className="space-y-2 max-h-[320px] overflow-auto pr-1">
                      {(reports?.recentAuditLogs || []).map((item) => (
                        <div key={item.id} className="rounded-lg border px-3 py-2 text-xs" style={{ borderColor: "hsl(0 0% 100% / 0.1)", color: "hsl(var(--corp-dark-muted))" }}>
                          <p className="font-semibold" style={{ color: "hsl(var(--corp-dark-foreground))" }}>{item.action}</p>
                          <p>{new Date(item.created_at).toLocaleString()}</p>
                        </div>
                      ))}
                      {(reports?.recentAuditLogs || []).length === 0 && (
                        <p className="text-sm" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                          No audit records in the selected window.
                        </p>
                      )}
                    </div>
                  </article>
                </section>
              </div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default AdminReports;
