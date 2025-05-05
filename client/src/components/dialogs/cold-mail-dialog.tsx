import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "@clerk/react-router";
import { useReactFlowStore } from "@/store/useReactFlowStore";

import { v4 as uuidv4 } from "uuid";

type ColdMailDialogProps = {
  setCurrentDialog: any;
  setOpen: any;
};

const ColdMailDialog = ({ setCurrentDialog, setOpen }: ColdMailDialogProps) => {
  const { userId } = useAuth();
  const { nodes, edges, setNodes, setEdges } = useReactFlowStore();

  const [emailTemplates, setEmailTemplates] = useState([
    {
      _id: "1",
      templateName: "Sample Template (added by SalesBlink)",
      subject: "fsjkfl;jf;l",
      offerName: "fsdfkl;sjjsflfjl",
      email: "This is an email",
      userId: "1",
    },
  ]);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const insertTemplate = () => {
    if (!selectedEmailTemplate) return;

    const selectedTemplate = emailTemplates.find(
      (item) => item._id === selectedEmailTemplate
    );

    if (!selectedTemplate) return;

    const newNode = {
      id: uuidv4(),
      type: "emailTemplate",
      position: { x: 0, y: 0 },
      data: {
        label: selectedTemplate.templateName,
        template: selectedTemplate,
      },
    };

    // Edge logic

    setNodes([...nodes, newNode]);
    setEdges([...edges]);

    setOpen(false);

    console.log(selectedTemplate);
  };

  const fetchTemplates = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/templates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    if (response.ok) {
      const { templates } = await response.json();

      setEmailTemplates(templates);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTemplates();
    }
  }, [userId]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">Cold Mail</DialogTitle>
        <DialogDescription>Send an email to a lead</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <Label>Email Template</Label>
        <Select
          value={selectedEmailTemplate}
          onValueChange={(value) => setSelectedEmailTemplate(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Search for an email template" />
          </SelectTrigger>
          <SelectContent>
            {emailTemplates.map((template) => (
              <SelectItem value={template._id}>
                {template.templateName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex justify-between gap-2">
          <Button className="grow cursor-pointer" onClick={insertTemplate}>
            Insert
          </Button>
          <Button
            className="grow cursor-pointer"
            variant="outline"
            onClick={() => navigate("/email-editor", { state: params })}
          >
            New Template <PlusCircle />
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ColdMailDialog;
