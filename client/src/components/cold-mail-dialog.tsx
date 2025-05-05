import { Clock, Mail } from "lucide-react";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type ColdMailDialogProps = {
  setCurrentDialog: any;
};

const ColdMailDialog = ({ setCurrentDialog }: ColdMailDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">Cold Mail</DialogTitle>
        <DialogDescription>Send an email to a lead</DialogDescription>
      </DialogHeader>
      <div>
        <h1 className="text-2xl font-medium">Email Template</h1>
      </div>
    </DialogContent>
  );
};

export default ColdMailDialog;
