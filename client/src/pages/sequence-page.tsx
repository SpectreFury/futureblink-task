import Navbar from "@/components/navbar";
import SequenceEditor from "@/components/sequence-editor";
import { useAuth } from "@clerk/react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const SequencePage = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      navigate("/");
    }
  }, [isSignedIn, isLoaded]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <SequenceEditor />
    </div>
  );
};

export default SequencePage;
