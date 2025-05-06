import { config } from "dotenv";
config();

import { Agenda } from "@hokify/agenda";
import { transporter } from "./nodemailer.js";

const MONGODB_URI = process.env.MONGODB_URI;

const agenda = new Agenda({ db: { address: MONGODB_URI } });

agenda.define("send email", async (job) => {
  try {
    const { emails, template } = job.attrs.data;
    console.log(emails, template);

    const info = await transporter.sendMail({
      from: "Ayush Soni soni.ayush.2212@gmail.com",
      to: emails,
      subject: template.subject,
      text: "Hello",
      html: template.email,
    });

    console.log("Message sent: ", info.messageId);
  } catch (error) {
    console.log(error);
  }
});

export { agenda };
