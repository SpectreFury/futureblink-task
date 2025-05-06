import { Handle, Position } from "@xyflow/react";
import { Clock } from "lucide-react";

type WaitDelayNodeProps = {
  data: {
    label: string;
  };
};

const WaitDelayNode = ({ data }: WaitDelayNodeProps) => {
  return (
    <div className="flex flex-col items-center border px-2 py-1 bg-gray-50 rounded cursor-pointer max-w-2xs">
      <Handle type="target" position={Position.Top} />
      <div className="flex gap-2 items-center">
        <div className="p-2 border rounded border-purple-500">
          <Clock className="h-10 w-10 text-purple-500" />
        </div>
        <div>
          <div className="text-lg font-bold">Email Template:</div>
          <div className="text-lg font-medium text-purple-500">
            {data.label}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default WaitDelayNode;
