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
import { useReactFlowStore } from "@/store/useReactFlowStore";
import { v4 as uuidv4 } from "uuid";

type SourceItem = {
  id: string;
  value: string;
  label: string;
  emails: string[];
};

type SourceListItem = {
  _id: string;
  name: string;
  emails: string[];
};

type SelectSourceProps = {
  setCurrentModal: any;
  setOpen: any;
};

const SelectSource = ({ setCurrentModal, setOpen }: SelectSourceProps) => {
  const [sourceList, setSourceList] = useState<SourceItem[]>([]);
  const [selectedSourceList, setSelectedSourceList] = useState("");

  const { nodes, edges, setNodes, setEdges } = useReactFlowStore();

  const insertSelectedSource = async () => {
    // Make sure there is a selected node before making a new node
    if (!selectedSourceList) {
      return;
    }

    // Add a new node to the state
    const selectedList = sourceList.find(
      (item) => item.id === selectedSourceList
    );

    if (!selectedList) return;

    const newNode = {
      id: uuidv4(),
      type: "lead",
      position: { x: 0, y: 0 },
      data: {
        label: selectedList.label,
        leadSource: selectedList,
      },
    };

    const newEdge = {
      id: `${newNode.id}-startPoint`,
      source: newNode.id,
      target: "sequence-start-point",
    };

    setNodes([...nodes, newNode]);
    setEdges([...edges, newEdge]);
    setOpen(false);
  };

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
          id: item._id,
          label: item.name,
          value: item._id,
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
        <Button className="grow" onClick={insertSelectedSource}>
          Insert
        </Button>
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
