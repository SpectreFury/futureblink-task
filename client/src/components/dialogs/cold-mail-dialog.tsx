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
import { useState } from "react";

type ColdMailDialogProps = {
  setCurrentDialog: any;
};

const ColdMailDialog = ({ setCurrentDialog }: ColdMailDialogProps) => {
  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: "1",
      name: "Sample Template (added by SalesBlink)",
    },
  ]);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState("");

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
              <SelectItem value={template.id}>{template.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex justify-between gap-2">
          <Button className="grow cursor-pointer">Insert</Button>
          <Button
            className="grow cursor-pointer"
            variant="outline"
            onClick={() => setCurrentDialog("create-template")}
          >
            New Template <PlusCircle />
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ColdMailDialog;
