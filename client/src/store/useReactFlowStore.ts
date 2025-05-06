import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import { create } from "zustand";

import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

interface ReactFlowStoreState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  getLastNode: () => Node | null;
  getLastNonPlusNode: () => Node | null;
}

const useReactFlowStore = create<ReactFlowStoreState>((set, get) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  onConnect: (connection) => {
    set({ edges: addEdge(connection, get().edges) });
  },
  getLastNode: () => {
    if (!get().nodes.length) return null;

    return get().nodes.at(-1) as Node;
  },
  getLastNonPlusNode: () => {
    if (!get().nodes.length) return null;

    return get()
      .nodes.filter((node) => node.id !== "plus")
      .at(-1) as Node;
  },
}));

export { useReactFlowStore };
