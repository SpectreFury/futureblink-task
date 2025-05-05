import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type WaitDelayDialogProps = {
  setCurrentDialog: any;
};

const WaitDelayDialog = ({ setCurrentDialog }: WaitDelayDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">Wait</DialogTitle>
        <DialogDescription>Add a delay between blocks</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2"></div>
    </DialogContent>
  );
};

export default WaitDelayDialog;
