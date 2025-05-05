import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Handle, Position } from "@xyflow/react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

type DialogTypes = "default" | "cold-mail" | "wait-delay" | "create-template";

import { useState } from "react";
import DefaultDialog from "../dialogs/default-dialog";
import ColdMailDialog from "../dialogs/cold-mail-dialog";
import WaitDelayDialog from "../dialogs/wait-delay-dialog";
import CreateTemplateDialog from "../dialogs/create-template-dialog";

const PlusNode = () => {
  const [open, setOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState<DialogTypes>("default");

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      setCurrentDialog("default");
    }

    setOpen(isOpen);
  };

  return (
    <div className="nodrag">
      <Handle type="target" position={Position.Top} />
      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogTrigger>
          <Button>
            <Plus />
          </Button>
        </DialogTrigger>
        {currentDialog === "default" && (
          <DefaultDialog setCurrentDialog={setCurrentDialog} />
        )}
        {currentDialog === "cold-mail" && (
          <ColdMailDialog setCurrentDialog={setCurrentDialog} />
        )}
        {currentDialog === "wait-delay" && (
          <WaitDelayDialog setCurrentDialog={setCurrentDialog} />
        )}
        {currentDialog === "create-template" && (
          <CreateTemplateDialog setCurrentDialog={setCurrentDialog} />
        )}
      </Dialog>
    </div>
  );
};

export default PlusNode;
