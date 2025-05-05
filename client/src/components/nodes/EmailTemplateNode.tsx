import { Handle, Position } from "@xyflow/react";

type EmailTemplateNodeProps = {
  data: {
    label: string;
  };
};

const EmailTemplateNode = ({ data }: EmailTemplateNodeProps) => {
  return (
    <div className="flex flex-col items-center border px-2 py-1 bg-gray-50 rounded cursor-pointer">
      <Handle type="target" position={Position.Top} />
      <div className="text-lg font-bold">Leads From</div>
      <div className="text-lg font-medium text-pink-500">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default EmailTemplateNode;
