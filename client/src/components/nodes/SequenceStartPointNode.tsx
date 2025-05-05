import { Handle, Position } from "@xyflow/react";

type SequenceStartPointNodeProps = {
  data: {
    label: string;
  };
};

const SequenceStartPointNode = ({ data }: SequenceStartPointNodeProps) => {
  return (
    <div className="nodrag w-2xs flex flex-col items-center border px-2 py-1 bg-gray-50 rounded cursor-pointer">
      <Handle type="target" position={Position.Top} />
      <div className="text-lg font-bold">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
export default SequenceStartPointNode;
