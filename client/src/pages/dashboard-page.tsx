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
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

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
            <Dialog>
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
                      id="name"
                      className="col-span-3"
                      placeholder="Ayush's sequence"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      className="col-span-3"
                      placeholder="You can add a small description"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create</Button>
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
