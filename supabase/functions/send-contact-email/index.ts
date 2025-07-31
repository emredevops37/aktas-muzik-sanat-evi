import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { name, phone, email, subject, message }: ContactRequest = await req.json();

    // Supabase'e mesajı kaydet
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        name,
        phone,
        email,
        subject,
        message
      }]);

    if (error) {
      console.error("Error saving contact message:", error);
      throw error;
    }

    console.log("Contact message saved successfully:", data);

    // Email gönderme burada Resend API ile yapılabilir
    // Şimdilik sadece database'e kaydetme

    return new Response(JSON.stringify({ 
      success: true,
      message: "Mesajınız başarıyla kaydedildi"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);