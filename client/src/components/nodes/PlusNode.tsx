import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Handle, Position } from "@xyflow/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

const PlusNode = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="nodrag">
      <Handle type="target" position={Position.Top} />
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogTrigger>
          <Button>
            <Plus />
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default PlusNode;
