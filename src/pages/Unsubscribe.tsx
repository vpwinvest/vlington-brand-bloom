import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "valid" | "already" | "invalid" | "success" | "error">("loading");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    const validate = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
        );
        const data = await res.json();
        if (res.ok && data.valid === true) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        setStatus("invalid");
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setProcessing(true);
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (data?.success) setStatus("success");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <SEO path="/unsubscribe" titlePt="Cancelar subscrição" titleEn="Unsubscribe" noindex />
      <div className="max-w-md w-full text-center">
        {status === "loading" && <p className="text-muted-foreground">A verificar...</p>}
        {status === "valid" && (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-4">Cancelar subscrição</h1>
            <p className="text-muted-foreground mb-8">Tem a certeza que deseja cancelar a subscrição de emails?</p>
            <button
              onClick={handleUnsubscribe}
              disabled={processing}
              className="px-8 py-3 bg-dark text-primary-foreground text-sm tracking-widest uppercase hover:bg-gold hover:text-dark-deep transition-all duration-500 disabled:opacity-50"
            >
              {processing ? "A processar..." : "Confirmar"}
            </button>
          </>
        )}
        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-4">Subscrição cancelada</h1>
            <p className="text-muted-foreground">Não receberá mais emails nossos.</p>
          </>
        )}
        {status === "already" && (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-4">Já cancelada</h1>
            <p className="text-muted-foreground">Esta subscrição já foi cancelada anteriormente.</p>
          </>
        )}
        {status === "invalid" && (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-4">Link inválido</h1>
            <p className="text-muted-foreground">Este link de cancelamento é inválido ou expirou.</p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-4">Erro</h1>
            <p className="text-muted-foreground">Ocorreu um erro. Tente novamente mais tarde.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
