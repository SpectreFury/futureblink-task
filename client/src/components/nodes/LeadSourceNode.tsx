import { Plus } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useState } from "react";
import SelectSource from "../select-source";
import CreateSource from "../create-source";

const LeadSourceNode = () => {
  const [open, setOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState("select");

  return (
    <div className="w-2xs">
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogContent className="sm:max-w-[425px]">
          {currentModal === "select" && (
            <SelectSource setCurrentModal={setCurrentModal} setOpen={setOpen}/>
          )}
          {currentModal === "create" && (
            <CreateSource setCurrentModal={setCurrentModal} setOpen={setOpen}/>
          )}
        </DialogContent>
      </Dialog>
      <div
        className="nodrag flex flex-col items-center border px-2 py-1 bg-gray-50 rounded cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Plus />
        <div className="text-lg font-bold">Add Lead Source</div>
        <div>Click to add lead source from email</div>
      </div>
    </div>
  );
};

export default LeadSourceNode;
