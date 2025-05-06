import { Clock, Mail } from "lucide-react";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useReactFlowStore } from "@/store/useReactFlowStore";
import { toast } from "sonner";

type DefaultDialogProps = {
  setCurrentDialog: any;
};

const DefaultDialog = ({ setCurrentDialog }: DefaultDialogProps) => {
  const { nodes } = useReactFlowStore();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">Add Block</DialogTitle>
        <DialogDescription>
          Click on a block to configure and add it in sequence
        </DialogDescription>
      </DialogHeader>
      <div>
        <h1 className="text-2xl font-medium">Outreach</h1>
        <div className="flex gap-2 mt-5 justify-between">
          <Button
            className="grow h-25 text-lg cursor-pointer"
            onClick={() => setCurrentDialog("cold-mail")}
          >
            <Mail />
            Cold Mail
          </Button>
          <Button
            className="grow h-25 text-lg cursor-pointer"
            onClick={() => {
              if (!nodes.find((node) => node.type === "emailTemplate")) {
                toast.error("Insert a template node to use Wait/Delay");
                return;
              }

              setCurrentDialog("wait-delay");
            }}
          >
            <Clock />
            Wait/Delay
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default DefaultDialog;
