import { useAuth } from "@clerk/react-router";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const SequenceEditor = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = useAuth();

  const [nodes, setNodes] = useState([
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: {
        label: "Add lead source",
      },
    },
  ]);

  const [edges, setEdges] = useState([]);

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

  return (
    <div className="container mx-auto w-full grow">
      <div className="mt-10">
        <div className="text-2xl font-medium">{name}</div>
        <div className="text-lg text-muted-foreground">{description}</div>
      </div>
      <div className="w-full h-full">
        <ReactFlow nodes={nodes} edges={edges}>
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
