import { NextResponse, NextRequest } from "next/server";
import { emailHtml } from "@/utils/emailhtml";
import { sendEmail } from "@/utils/email";
import { validateEmail } from "@/utils/validateEmail";
export async function POST(req: NextRequest) {
    const { name,
    email,
    address,
    
    npinumber } = await req.json();

    if (!name || !email || !address || !npinumber) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    };
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    };
  
    const userHtml = `<p>Hello ${name},</p>
      <p>Thank you for your submission.  A representative will be back in touch within 24 hours.</p>`;

    const userfullhtml = emailHtml(userHtml);

    const adminhtml = `
        <p
        >Full Name: ${name}</p>
        <p
        >Email: ${email}</p>
        <p
        >Office Address: ${address}</p>
        <p
        >NPI#: ${npinumber}</p>
        `;
    const fullhtml = emailHtml(adminhtml);

    try {
      await sendEmail({
        to: email,
        subject: `Thank you for your message ${name}`,
        html:  userfullhtml
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Error sending email" },
        { status: 500 }
      );
    }
try {
  await sendEmail({
    to: process.env.SMTP_FROM as string,
    subject: `New message from ${name} on ${new Date().toUTCString()}`,
    html:  fullhtml
});
} catch (error) {
  console.error(error);
}

    
    return NextResponse.json({ message: "Email sent" });

}