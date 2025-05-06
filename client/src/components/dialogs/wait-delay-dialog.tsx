import { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useReactFlowStore } from "@/store/useReactFlowStore";
import { v4 as uuidv4 } from "uuid";

type WaitDelayDialogProps = {
  setCurrentDialog: any;
  setOpen: any;
};

const WaitDelayDialog = ({
  setCurrentDialog,
  setOpen,
}: WaitDelayDialogProps) => {
  const [waitInput, setWaitInput] = useState("");
  const [waitType, setWaitType] = useState([
    {
      label: "Days",
      value: "days",
    },
    {
      label: "Minutes",
      value: "minutes",
    },
    {
      label: "Hours",
      value: "hours",
    },
  ]);

  const [selectedWaitType, setSelectedWaitType] = useState("days");
  const { nodes, edges, setNodes, setEdges, getLastNode } = useReactFlowStore();

  const insertDelayNode = () => {
    // Input validations
    if (!selectedWaitType || !waitInput) {
      toast.error("All the inputs are mandatory");
      return;
    }

    const plusNode = nodes.find((node) => node.type === "plus");
    const lastNode = getLastNode()!;

    if (!plusNode) return;
    if (lastNode.type !== "emailTemplate") {
      toast.error("Cannot add delay upon delay node");
      return;
    }

    // New node at the position of plus
    const newNode = {
      id: uuidv4(),
      type: "waitDelay",
      position: { x: plusNode?.position.x - 90, y: plusNode?.position.y },
      data: {
        label: "Delay",
        delay: {
          delayTime: waitInput,
          delayType: selectedWaitType,
        },
      },
    };

    // Make plus node shift
    const newNodes = nodes.map((node) =>
      node.id === "plus"
        ? {
            ...node,
            position: { x: node.position.x, y: node.position.y + 200 },
          }
        : node
    );

    // This removes the connection between sequence start and plus if it exists
    const newEdges = edges.filter((edge) => edge.target !== "plus");

    // Add a connection from last node to delay node
    const connection = {
      id: `${lastNode.id}-${newNode.id}`,
      source: lastNode.id,
      target: newNode.id,
    };

    const newPlusEdge = {
      id: `${newNode.id}-plus`,
      source: newNode.id,
      target: "plus",
    };

    setNodes([...newNodes, newNode]);
    setEdges([...newEdges, connection, newPlusEdge]);

    setCurrentDialog("default");
    setOpen(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">Wait</DialogTitle>
        <DialogDescription>Add a delay between blocks</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Label>Wait For</Label>
          <Input
            type="number"
            value={waitInput}
            onChange={(e) => setWaitInput(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Wait Type</Label>
          <Select
            value={selectedWaitType}
            onValueChange={(value) => setSelectedWaitType(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Source List" />
            </SelectTrigger>
            <SelectContent>
              {waitType.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="self-start mt-2" onClick={insertDelayNode}>
            Insert
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default WaitDelayDialog;
