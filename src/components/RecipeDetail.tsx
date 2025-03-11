import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4">
          <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
            <div className="fade-bottom absolute left-0 h-24 w-full backdrop-blur-lg"></div>
            <div className="relative mx-auto max-w-container">
              <NavbarComponent>
                <NavbarLeft>
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
                    Logout
                  </Button>
                </NavbarRight>
              </NavbarComponent>
              <div className="flex flex-col justify-between bg-gray-100">
                <div className="flex-grow">
                  <div className="mx-auto">
                    <div className="overflow-hidden rounded-lg border border-border bg-background">
                      <div className="grid grid-cols-2">
                        <div>
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <h1 className="flex justify-center items-center p-4 text-2xl font-bold">
                            {recipe.name}
                          </h1>
                          <Table className="w-full">
                            <TableBody>
                              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                                <TableCell className="bg-muted/50 py-2 font-medium">
                                  Instructions
                                </TableCell>
                                <TableCell className="py-2">
                                  {recipe.instructions}
                                </TableCell>
                              </TableRow>
                              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                                <TableCell className="bg-muted/50 py-2 font-medium">
                                  Ingredients
                                </TableCell>
                                <TableCell className="py-2">
                                  <ul>
                                    {recipe.ingredients.map(
                                      (ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                      )
                                    )}
                                  </ul>
                                </TableCell>
                              </TableRow>
                              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                                <TableCell className="bg-muted/50 py-2 font-medium">
                                  Preparation time
                                </TableCell>
                                <TableCell className="py-2">
                                  {recipe.prepTimeMinutes} min.
                                </TableCell>
                              </TableRow>
                              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                                <TableCell className="bg-muted/50 py-2 font-medium">
                                  Cook time
                                </TableCell>
                                <TableCell className="py-2">
                                  {recipe.cookTimeMinutes} min.
                                </TableCell>
                              </TableRow>
                              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                                <TableCell className="bg-muted/50 py-2 font-medium">
                                  Servings
                                </TableCell>
                                <TableCell className="py-2">
                                  {recipe.servings}
                                </TableCell>
                              </TableRow>
                              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                                <TableCell className="bg-muted/50 py-2 font-medium">
                                  Calories per serving
                                </TableCell>
                                <TableCell className="py-2">
                                  {recipe.caloriesPerServing} kcal
                                </TableCell>
                              </TableRow>
                              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                                <TableCell className="bg-muted/50 py-2 font-medium">
                                  Difficulty
                                </TableCell>
                                <TableCell className="py-2">
                                  {recipe.difficulty}
                                </TableCell>
                              </TableRow>
                              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                                <TableCell className="bg-muted/50 py-2 font-medium">
                                  Cuisine
                                </TableCell>
                                <TableCell className="py-2">
                                  {recipe.cuisine}
                                </TableCell>
                              </TableRow>
                              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                                <TableCell className="bg-muted/50 py-2 font-medium">
                                  Meal type
                                </TableCell>
                                <TableCell className="py-2">
                                  {recipe.mealType}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
