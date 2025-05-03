import { Button } from "./ui/button";
import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
} from "@clerk/react-router";

const Navbar = () => {
  return (
    <header className="bg-background border-b border-border flex items-center justify-center">
      <nav className="container flex items-center justify-between h-16">
        <a href="/" className="font-bold text-xl">
          FutureBlink Task
        </a>
        <SignedOut>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Navbar;
