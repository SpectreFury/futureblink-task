import { useState } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();

  const createSequence = async () => {
    setError("");

    if (!name || !description) {
      setError("All the fields are required");
      return;
    }

    setLoading(true);
    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      if (!serverUrl) {
        throw new Error("There is no server");
      }

      const response = await fetch(`${serverUrl}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name,
          description,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        navigate(`/dashboard/${data.sequenceId}`);
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      navigate("/");
    }
  }, [isSignedIn, isLoaded]);
  return (
    <>
      <Navbar />
      <div className="container mx-auto flex flex-col items-center justify-center">
        <Card className="max-w-100 w-full mt-[200px]">
          <CardHeader>
            <CardTitle className="text-lg">Sequences</CardTitle>
            <CardDescription>These are all the users sequences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0  hover:bg-gray-200 p-2 rounded cursor-pointer">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Ayush's Sequence
                </p>
                <p className="text-sm text-muted-foreground">
                  A email marketing application
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
              <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  Create new
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create a new sequence</DialogTitle>
                  <DialogDescription>
                    Create a new sequence for email or other type of marketing
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      minLength={6}
                      maxLength={50}
                      id="name"
                      className="col-span-3"
                      placeholder="Ayush's sequence"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      minLength={10}
                      maxLength={100}
                      id="description"
                      className="col-span-3"
                      placeholder="You can add a small description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={createSequence}
                    disabled={loading}
                  >
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default DashboardPage;
