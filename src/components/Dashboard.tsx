import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/navbar";
import chefIcon from "@/assets/chef.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <div className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>
      <div className="relative mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            {/* <a href="/" className="flex items-center gap-2 text-xl font-bold"> */}
            <a className="flex items-center gap-2 text-xl font-bold">
              <img src={chefIcon} alt="Chef Icon" className="h-6 w-6" />{" "}
            </a>
            <Navigation />
          </NavbarLeft>
          <NavbarRight>
            <Button
              variant="default"
              onClick={handleLogout}
              className="cursor-pointer"
            >
              Atsijungti
              {/* <a href="/">Atsijungti</a> */}
            </Button>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
