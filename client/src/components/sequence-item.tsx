import { NavLink } from "react-router";

type SequenceItemProps = {
  _id: string;
  name: string;
  description: string;
};

const SequenceItem = ({ name, description, id }: SequenceItemProps) => {
  return (
    <NavLink
      to={`/dashboard/${id}`}
      className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0  hover:bg-gray-200 p-2 rounded cursor-pointer"
    >
      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </NavLink>
  );
};

export default SequenceItem;
