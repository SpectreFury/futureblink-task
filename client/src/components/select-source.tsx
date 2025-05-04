import { useEffect, useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useNodesState } from "@xyflow/react";

type SourceItem = {
  value: string;
  label: string;
  emails: string[];
};

type SourceListItem = {
  name: string;
  emails: string[];
};

type SelectSourceProps = {
  setCurrentModal: any;
};

const SelectSource = ({ setCurrentModal }: SelectSourceProps) => {
  const [sourceList, setSourceList] = useState<SourceItem[]>([
    { value: "Source List", label: "This is a source list", emails: [] },
  ]);
  const [selectedSourceList, setSelectedSourceList] = useState("");

  const insertSelectedSource = async () => {};

  const fetchSourceLists = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/source-lists`
    );

    if (response.ok) {
      const { sourceLists }: { sourceLists: SourceListItem[] } =
        await response.json();

      const newArray = [];

      for (let item of sourceLists) {
        newArray.push({
          label: item.name,
          value: item.name,
          emails: item.emails,
        });
      }

      setSourceList(newArray);
    }
  };

  useEffect(() => {
    fetchSourceLists();
  }, []);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add a source block</DialogTitle>
        <DialogDescription>
          Pick a block & configure, any new leads that match rules will be added
          to sequence automatically
        </DialogDescription>
      </DialogHeader>
      <h1 className="text-xl font-bold">Source</h1>
      <Select
        value={selectedSourceList}
        onValueChange={(value) => setSelectedSourceList(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Source List" />
        </SelectTrigger>
        <SelectContent>
          {sourceList.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-between gap-2">
        <Button className="grow">Insert</Button>
        <Button
          variant="outline"
          className="grow"
          onClick={() => setCurrentModal("create")}
        >
          Create
        </Button>
      </div>
    </>
  );
};

export default SelectSource;
