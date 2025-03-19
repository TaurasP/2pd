import React, { useEffect, useState, useContext } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import axios from "axios";
import RecipeCard from "./RecipeCard";

const FavoriteRecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/favorite-recipes"
        );
        setRecipes(
          response.data
            .filter(
              (recipe: { userId: number }) =>
                recipe.userId ===
                JSON.parse(localStorage.getItem("user") || "null")
            )
            .sort((a: { name: string }, b: { name: string }) =>
              a.name.localeCompare(b.name)
            )
        );
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const nextPage = () => {
    if (currentPage < Math.ceil(recipes.length / recipesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
              <div style={{ display: recipes.length === 0 ? "block" : "none" }}>
                No favorite recipes found.
              </div>
              <div
                className="flex flex-col justify-between bg-gray-100"
                style={{ display: recipes.length === 0 ? "none" : "block" }}
              >
                <div className="flex-grow">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentRecipes.map((recipe, index) => (
                      <RecipeCard key={index} recipe={recipe} />
                    ))}
                  </div>
                </div>
                <Pagination className="mt-auto pt-5">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={prevPage} />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" onClick={nextPage} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default FavoriteRecipeList;
