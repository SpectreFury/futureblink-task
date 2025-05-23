import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "@clerk/react-router";
import { useReactFlowStore } from "@/store/useReactFlowStore";

import { v4 as uuidv4 } from "uuid";

interface Delay {
  delayTime: any; // Or a more specific type like number or string
  delayType: any; // Or a more specific type like 'fixed' | 'variable'
}

type ColdMailDialogProps = {
  setCurrentDialog: any;
  setOpen: any;
};

const ColdMailDialog = ({ setCurrentDialog, setOpen }: ColdMailDialogProps) => {
  const { userId } = useAuth();
  const { nodes, edges, setNodes, setEdges, getLastNode } = useReactFlowStore();

  const [emailTemplates, setEmailTemplates] = useState([
    {
      _id: "1",
      templateName: "Sample Template (added by SalesBlink)",
      subject: "fsjkfl;jf;l",
      offerName: "fsdfkl;sjjsflfjl",
      email: "This is an email",
      userId: "1",
    },
  ]);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const insertTemplate = () => {
    if (!selectedEmailTemplate) return;

    const selectedTemplate = emailTemplates.find(
      (item) => item._id === selectedEmailTemplate
    );

    if (!selectedTemplate) return;

    const plusNode = nodes.find((node) => node.id === "plus");

    if (!plusNode) return;

    // New node to insert at plus node position
    let newNode: any = {
      id: uuidv4(),
      type: "emailTemplate",
      position: { x: plusNode?.position.x - 150, y: plusNode?.position.y },
      data: {
        label: selectedTemplate.templateName,
        template: selectedTemplate,
        delay: {
          delayValue: null,
          delayType: null,
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

    // Add a connection from startPoint to newNode
    let connection;
    const lastNode = getLastNode()!;

    if (lastNode.type === "emailTemplate") {
      // Make the connection to be from previous node to new node

      connection = {
        id: `${lastNode.id}-${newNode.id}`,
        source: lastNode.id,
        target: newNode.id,
      };
    } else if (lastNode.type === "waitDelay") {
      newNode = {
        ...newNode,
        data: {
          ...newNode.data,
          delay: {
            ...newNode.data.delay,
            delayValue: (lastNode.data.delay as Delay).delayTime,
            delayType: (lastNode.data.delay as Delay).delayType,
          },
        },
      };

      connection = {
        id: `${lastNode.id}-${newNode.id}`,
        source: lastNode.id,
        target: newNode.id,
      };
    } else {
      // Connection to be from start point to new node
      connection = {
        id: `startPoint-${newNode.id}`,
        source: "sequence-start-point",
        target: newNode.id,
      };
    }

    const newEdge = {
      id: `${newNode.id}-plus`,
      source: newNode.id,
      target: "plus",
    };

    setNodes([...newNodes, newNode]);
    setEdges([...newEdges, connection, newEdge]);

    setCurrentDialog("default");
    setOpen(false);
  };

  const fetchTemplates = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/templates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    if (response.ok) {
      const { templates } = await response.json();

      setEmailTemplates(templates);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTemplates();
    }
  }, [userId]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">Cold Mail</DialogTitle>
        <DialogDescription>Send an email to a lead</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <Label>Email Template</Label>
        <Select
          value={selectedEmailTemplate}
          onValueChange={(value) => setSelectedEmailTemplate(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Search for an email template" />
          </SelectTrigger>
          <SelectContent>
            {emailTemplates.map((template) => (
              <SelectItem value={template._id}>
                {template.templateName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex justify-between gap-2">
          <Button className="grow cursor-pointer" onClick={insertTemplate}>
            Insert
          </Button>
          <Button
            className="grow cursor-pointer"
            variant="outline"
            onClick={() => navigate("/email-editor", { state: params })}
          >
            New Template <PlusCircle />
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ColdMailDialog;
