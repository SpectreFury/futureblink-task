import { useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type CreateSourceProps = {
  setCurrentModal: any;
};

const CreateSource = ({ setCurrentModal }: CreateSourceProps) => {
  const [sourceListName, setSourceListName] = useState("");
  const [emails, setEmails] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSourceLists = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (!sourceListName || !emails) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/create/source-list`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceListName,
          emails,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      console.log(data);
    }

    setLoading(false);
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create a source list</DialogTitle>
        <DialogDescription>
          Pick a block & configure, any new leads that match rules will be added
          to sequence automatically
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={createSourceLists}>
        <div className="grid gap-2">
          <div className="grid w-full gap-1.5">
            <Label>List Name</Label>
            <Input
              placeholder="FutureBlink List"
              value={sourceListName}
              onChange={(e) => setSourceListName(e.target.value)}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Emails</Label>
            <Textarea
              placeholder="test@gmail.com, test@outlook.com"
              id="message"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between gap-2">
            <Button type="submit" className="grow" disabled={loading}>
              Create
            </Button>
            <Button
              type="button"
              onClick={() => setCurrentModal("select")}
              className="grow"
              variant="outline"
            >
              Select
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateSource;
