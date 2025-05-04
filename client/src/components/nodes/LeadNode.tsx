const LeadNode = (props: any) => {
  console.log(props);

  return (
    <>
      <div className="flex flex-col items-center border px-2 py-1 bg-gray-50 rounded cursor-pointer">
        <div className="text-lg font-bold">Leads From</div>
        <div></div>
      </div>
    </>
  );
};

export default LeadNode;
