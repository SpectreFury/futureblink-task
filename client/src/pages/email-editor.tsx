import Navbar from "@/components/navbar";
import TipTap from "@/components/tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { toast } from "sonner";

const EmailEditor = () => {
  const [templateName, setTemplateName] = useState("");
  const [offerName, setOfferName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState(
    `<p><strong>Hey there,</strong></p>
    <p>This is a dummy email template for FutureBlink</p>
    <p>This email is going to be sent using the power of Nodemailer and Agenda</p>
    <p>Thank you</p>`
  );

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveTemplate = async () => {
    toast.success("Template has been created");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10 flex flex-col gap-2">
        <div className="max-w-xl flex flex-col gap-2">
          <Label className="font-medium">Template Name</Label>
          <Input
            placeholder="Ayush's First Sequence"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>
        <div className="max-w-xl flex flex-col gap-2">
          <Label className="font-medium">
            Business Offer / What are you selling?
          </Label>
          <Input
            placeholder="Your Offer, Ex.SEO services for enterprises in USA"
            value={offerName}
            onChange={(e) => setOfferName(e.target.value)}
          />
        </div>
        <div className="max-w-xl flex flex-col gap-2">
          <Label className="font-medium">Subject Line</Label>
          <Input
            placeholder="Enter Subject Line"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <TipTap email={email} setEmail={setEmail} />

        <div className="flex gap-2 mt-2">
          <Button className="self-start" onClick={saveTemplate}>
            Save Template
          </Button>
          <Button className="self-start" variant="outline">
            Discard Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailEditor;
