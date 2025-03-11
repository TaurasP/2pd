// import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
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

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
  mealType: string;
}

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.logout();
    navigate("/login");
  };

  useEffect(() => {
    // Fetch the recipe details using the ID
    // Replace the URL with your actual API endpoint
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 h-dvh">
      <div className="container mx-auto px-4">
        <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
          <div className="fade-bottom absolute left-0 h-24 w-full backdrop-blur-lg"></div>
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
                {/* <ModeToggle /> */}
                <Button
                  variant="default"
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Logout
                </Button>
              </NavbarRight>
            </NavbarComponent>
            <div>
              <h1>{recipe.name}</h1>
              <p>{recipe.prepTimeMinutes}</p>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default RecipeDetail;
