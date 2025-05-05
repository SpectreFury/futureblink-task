import { Handle, Position } from "@xyflow/react";

type LeadSource = {
  id: string;
  label: string;
  value: string;
  emails: string[];
};

type Data = {
  label: string;
  leadSource: LeadSource;
};

type LeadNodeProps = {
  data: Data;
};

const LeadNode = ({ data }: LeadNodeProps) => {
  return (
    <div className="flex flex-col items-center border px-2 py-1 bg-gray-50 rounded cursor-pointer">
      <div className="text-lg font-bold">Leads From</div>
      <div className="text-lg font-medium text-pink-500">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default LeadNode;
