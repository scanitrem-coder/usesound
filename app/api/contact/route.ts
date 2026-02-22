import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: "UseSound <onboarding@resend.dev>",
      to: ["scani_20@ukr.net"],
      subject: "Neue Custom Music Anfrage",
      html: `
        <h2>Neue Anfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Fehler beim Senden" }, { status: 500 });
  }
}
