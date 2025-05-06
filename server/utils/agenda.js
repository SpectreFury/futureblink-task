import { config } from "dotenv";
config();

import { Agenda } from "@hokify/agenda";

const mongoConnectionString = process.env.MONGODB_AGENDA;

const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define("send email", async () => {
  console.log("Email sent");
});

export { agenda };
