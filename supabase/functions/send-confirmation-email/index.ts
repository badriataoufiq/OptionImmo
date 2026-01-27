import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData = await req.formData();

    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const assetType = formData.get("asset_type") as string;
    const assetLocation = formData.get("asset_location") as string;
    const assetValue = formData.get("asset_value") as string;
    const deadline = formData.get("deadline") as string;
    const message = formData.get("message") as string;
    const photos = formData.getAll("photos") as File[];

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const assetTypeTranslations: Record<string, string> = {
      maison: "Maison",
      appartement: "Appartement",
      immeuble: "Immeuble",
      commerce: "Commerce",
      terrain: "Terrain",
      garage: "Garage",
    };

    const translatedAssetType = assetTypeTranslations[assetType] || assetType;

    const attachments = [];
    for (const photo of photos) {
      const arrayBuffer = await photo.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      attachments.push({
        filename: photo.name,
        content: base64,
      });
    }

    const clientEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation de votre demande</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Option Immo</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="margin: 0 0 20px 0; color: #0f172a; font-size: 24px;">Confirmation de votre demande</h2>
                      <p style="margin: 0 0 15px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                        Bonjour ${firstName} ${lastName},
                      </p>
                      <p style="margin: 0 0 15px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                        Nous avons bien reçu votre demande concernant votre bien immobilier.
                      </p>
                      <div style="margin: 30px 0; padding: 20px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #3b82f6;">
                        <p style="margin: 0 0 10px 0; color: #0f172a; font-weight: bold;">Détails de votre demande :</p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                          <strong>Type de bien :</strong> ${translatedAssetType}
                        </p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                          <strong>Localisation :</strong> ${assetLocation}
                        </p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                          <strong>Valeur estimée :</strong> ${assetValue}
                        </p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                          <strong>Délai souhaité :</strong> ${deadline}
                        </p>
                      </div>
                      <p style="margin: 0 0 15px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                        Notre équipe va étudier votre dossier et vous contactera dans les plus brefs délais pour discuter de votre projet.
                      </p>
                      <p style="margin: 0 0 15px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                        Si vous avez des questions urgentes, n'hésitez pas à nous contacter directement au ${phone}.
                      </p>
                      <p style="margin: 30px 0 0 0; color: #475569; font-size: 16px; line-height: 1.6;">
                        Cordialement,<br>
                        <strong style="color: #0f172a;">L'équipe Option Immo</strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 30px; text-align: center; background-color: #f8fafc; border-radius: 0 0 8px 8px;">
                      <p style="margin: 0; color: #64748b; font-size: 12px;">
                        Ceci est un email automatique, merci de ne pas y répondre.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const adminEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle demande de contact</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Option Immo</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="margin: 0 0 20px 0; color: #0f172a; font-size: 24px;">Nouvelle demande de contact</h2>
                      <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #3b82f6;">
                        <p style="margin: 0 0 10px 0; color: #0f172a; font-weight: bold;">Informations du client :</p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                          <strong>Nom :</strong> ${firstName} ${lastName}
                        </p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                          <strong>Email :</strong> ${email}
                        </p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                          <strong>Téléphone :</strong> ${phone}
                        </p>
                      </div>
                      <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #10b981;">
                        <p style="margin: 0 0 10px 0; color: #0f172a; font-weight: bold;">Détails du bien :</p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                          <strong>Type de bien :</strong> ${translatedAssetType}
                        </p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                          <strong>Localisation :</strong> ${assetLocation}
                        </p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                          <strong>Valeur estimée :</strong> ${assetValue}
                        </p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                          <strong>Délai souhaité :</strong> ${deadline}
                        </p>
                      </div>
                      <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 6px;">
                        <p style="margin: 0 0 10px 0; color: #0f172a; font-weight: bold;">Message :</p>
                        <p style="margin: 5px 0; color: #475569; font-size: 14px; white-space: pre-wrap;">
                          ${message}
                        </p>
                      </div>
                      ${photos.length > 0 ? `<p style="margin: 20px 0 0 0; color: #475569; font-size: 14px;">
                        <strong>Nombre de photos jointes :</strong> ${photos.length}
                      </p>` : ''}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const clientEmailPayload = {
      from: "Option Immo <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmation de votre demande - Option Immo",
      html: clientEmailContent,
      attachments: attachments,
    };

    const adminEmailPayload = {
      from: "Option Immo <onboarding@resend.dev>",
      to: ["contact@optionimmo.be"],
      subject: `Nouvelle demande - ${firstName} ${lastName} - ${translatedAssetType}`,
      html: adminEmailContent,
      attachments: attachments,
    };

    const clientEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(clientEmailPayload),
    });

    if (!clientEmailRes.ok) {
      const error = await clientEmailRes.text();
      throw new Error(`Failed to send client email: ${error}`);
    }

    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(adminEmailPayload),
    });

    if (!adminEmailRes.ok) {
      const error = await adminEmailRes.text();
      console.error("Failed to send admin email:", error);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending emails:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
