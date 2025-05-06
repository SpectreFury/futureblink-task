import { useAuth } from "@clerk/react-router";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Button } from "./ui/button";
import LeadSourceNode from "./nodes/LeadSourceNode";
import LeadNode from "./nodes/LeadNode";
import { useReactFlowStore } from "@/store/useReactFlowStore";
import SequenceStartPointNode from "./nodes/SequenceStartPointNode";
import PlusNode from "./nodes/PlusNode";
import EmailTemplateNode from "./nodes/EmailTemplateNode";
import WaitDelayNode from "./nodes/WaitDelayNode";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";

const nodeTypes = {
  leadSource: LeadSourceNode,
  lead: LeadNode,
  sequenceStartPoint: SequenceStartPointNode,
  plus: PlusNode,
  emailTemplate: EmailTemplateNode,
  waitDelay: WaitDelayNode,
};

const SequenceEditor = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = useAuth();
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onConnect,
    onEdgesChange,
    onNodesChange,
  } = useReactFlowStore();
  const { id } = useParams();
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState<string>(format(new Date(), "kk:mm"));

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const scheduleEmail = async () => {
    setLoading(true);
    // If no lead source node , then return
    const leadNode = nodes.find((node) => node.type === "lead");
    if (!leadNode) {
      toast.error("Need a lead node to schedule email");
      return;
    }

    // If no template node, then return
    const templateNode = nodes.find((node) => node.type === "emailTemplate");
    if (!templateNode) {
      toast.error("Need a template node to schedule emails");
    }

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/schedule`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nodes: nodes,
          edges: edges,
          scheduledTime: time,
          scheduledDate: date,
        }),
      }
    );

    if (response.ok) {
      toast.success("Email has been scheduled");
      setOpen(false);
    }

    setLoading(false);
  };

  const fetchSequence = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/sequence`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sequenceId: id,
          userId: userId,
        }),
      }
    );

    if (response.ok) {
      const { sequence } = await response.json();

      setName(sequence.name);
      setDescription(sequence.description);
    }
    try {
    } catch (error) {}
  };

  useEffect(() => {
    if (userId) {
      fetchSequence();
    }
  }, [userId]);

  useEffect(() => {
    if (reactFlowWrapper.current) {
      const width = reactFlowWrapper.current.offsetWidth;

      const centerX = width / 2 - 75;

      setNodes([
        {
          id: "add-lead-source",
          type: "leadSource",
          position: { x: centerX, y: 100 },
          data: {
            label: "Add lead source",
          },
        },
        {
          id: "sequence-start-point",
          type: "sequenceStartPoint",
          position: { x: centerX, y: 250 },
          data: {
            label: "Sequence Start Point",
          },
        },
        {
          id: "plus",
          type: "plus",
          position: { x: centerX + 125, y: 400 },
          data: {
            label: "Plus Button",
          },
        },
      ]);

      setEdges([
        {
          id: "startPoint-plus",
          source: "sequence-start-point",
          target: "plus",
        },
      ]);
    }
  }, [reactFlowWrapper]);

  return (
    <div className="container mx-auto w-full grow">
      <div className="mt-10 flex items-center justify-between">
        <div>
          <div className="text-2xl font-medium">{name}</div>
          <div className="text-lg text-muted-foreground">{description}</div>
        </div>
        <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
          <DialogTrigger asChild>
            <Button>Save</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sequence Settings</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label>Launch on Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={scheduleEmail} disabled={loading}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
          <Background
            color=""
            variant={BackgroundVariant.Dots}
            gap={12}
            size={1}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default SequenceEditor;
