import { Handle, Position } from "@xyflow/react";
import { Clock } from "lucide-react";

type WaitDelayNodeProps = {
  data: {
    label: string;
    delay: {
      delayTime: string;
      delayType: string;
    };
  };
};

const WaitDelayNode = ({ data }: WaitDelayNodeProps) => {
  return (
    <div className="flex flex-col items-center border px-4 py-2 bg-gray-50 rounded cursor-pointer max-w-2xs">
      <Handle type="target" position={Position.Top} />
      <div className="flex gap-2 items-center">
        <div className="p-2 border rounded border-blue-500">
          <Clock className="h-10 w-10 text-blue-500" />
        </div>
        <div>
          <div className="text-lg font-bold">{data.label}</div>
          <div className="text-lg font-medium text-blue-500">
            <span>
              Wait {data.delay.delayTime + " " + data.delay.delayType}
            </span>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default WaitDelayNode;
