import { useAuth } from "@clerk/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router";
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

const nodeTypes = {
  leadSource: LeadSourceNode,
  lead: LeadNode,
  sequenceStartPoint: SequenceStartPointNode,
  plus: PlusNode,
  emailTemplate: EmailTemplateNode,
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
        <Button>Save</Button>
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
