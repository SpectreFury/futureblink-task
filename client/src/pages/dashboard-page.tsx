import Navbar from "@/components/navbar";
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
    </>
  );
};

export default DashboardPage;
