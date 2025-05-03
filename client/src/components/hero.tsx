import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
} from "@clerk/react-router";
import { ArrowRight, Rocket } from "lucide-react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";

const Hero = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, isLoaded]);

  return (
    <div
      className={cn(
        "py-12 md:py-16",
        "flex flex-col items-center justify-center text-center",
        "bg-background",
        "text-foreground",
        "w-full"
      )}
    >
      <h1
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold",
          "mb-4 md:mb-6",
          "drop-shadow-lg"
        )}
      >
        FutureBlink Task For MERN Stack
      </h1>
      <p
        className={cn(
          "text-lg sm:text-xl",
          "max-w-3xl mx-auto",
          "mb-8 md:mb-10",
          "text-muted-foreground",
          "leading-relaxed"
        )}
      >
        This page is just to demonstrate the authentication, login to go to the
        sequencer
      </p>
      <SignedIn>
        <NavLink to="/dashboard">
          <Button>
            Go to Dashboard <ArrowRight />
          </Button>
        </NavLink>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button
            className={cn(
              "bg-primary", // Use primary button color
              "text-primary-foreground", // Use primary foreground color
              "px-6 py-3 sm:px-8 sm:py-4",
              "rounded-full",
              "hover:bg-primary/90", // Slightly darker hover
              "transition-colors duration-200",
              "font-semibold text-lg",
              "flex items-center gap-2"
            )}
          >
            <Rocket className="w-5 h-5" />
            Get Started
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default Hero;
