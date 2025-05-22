import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "../toogle-theme";
import { Button } from "../ui/button";
import Modal from "../modal";
import SignIn from "../authentication-ui/auth";
import { SignOutUser } from "../../services/api-services/user-auth";
import { LogOut } from "lucide-react";
import { useSupabaseUser } from "../../hooks/useSupabaseUser";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useSupabaseUser();

  return (
    <section className=" w-[80%] mx-auto flex content-center justify-between  ">
      <div className="font-semibold text-2xl">
        Leet<span className="text-primary">Coach</span>{" "}
      </div>
      <div className="flex content-center justify-end gap-4 ">
        <ModeToggle />
        {loading ? (
          <div className="animate-pulse w-8 h-8 rounded-full bg-gray-200"></div>
        ) : (
          !user && <Button onClick={() => setIsModalOpen(true)}>Sign in</Button>
        )}

        {user && !loading ? (
          <Avatar>
            <AvatarImage
              src={user.user_metadata?.avatar_url}
              className="hover:cursor-pointer"
            />
            <AvatarFallback>{user.email?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        ) : null}

        {user ? (
          <Button
            variant="outline"
            className="bg-red-400 text-white hover:bg-primary hover:text-white hover:cursor-pointer"
            onClick={() => {
              SignOutUser();
            }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        ) : null}

        <Modal
          title="Sign in to your leetCoach Account"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <SignIn />
        </Modal>
      </div>
    </section>
  );
}

export default Header;
