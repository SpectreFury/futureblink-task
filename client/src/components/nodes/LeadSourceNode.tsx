import { Cat, Dog, Fish, Plus, Rabbit, Turtle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { MultiSelect } from "../ui/multi-select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type SourceItem = {
  value: string;
  label: string;
};

const LeadSourceNode = () => {
  const [open, setOpen] = useState(false);
  const [sourceList, setSourceList] = useState<SourceItem[]>([
    { value: "Source List", label: "This is a source list" },
  ]);
  const [selectedSourceList, setSelectedSourceList] = useState<string[]>([]);

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a source block</DialogTitle>
            <DialogDescription>
              Pick a block & configure, any new leads that match rules will be
              added to sequence automatically
            </DialogDescription>
          </DialogHeader>
          <h1 className="text-xl font-bold">Source</h1>
          <MultiSelect
            options={sourceList}
            onValueChange={setSelectedSourceList}
            placeholder="Source List"
          />
          <Button>Insert</Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase text-muted-foreground px-2">
              OR ADD YOUR OWN LIST
            </div>
          </div>
          <form>
            <div className="grid gap-2">
              <div className="grid w-full gap-1.5">
                <Label>List Name</Label>
                <Input placeholder="FutureBlink List" />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Emails</Label>
                <Textarea
                  placeholder="test@gmail.com, test@outlook.com"
                  id="message"
                />
              </div>
              <Button type="submit">Create</Button>
            </div>
          </form>
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
    </>
  );
};

export default LeadSourceNode;
