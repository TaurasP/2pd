import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RecipeCardProps {
  recipe: {
    id: number;
    name: string;
    tags: string[];
    image: string;
    rating: number;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleShowMore = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleMouseEnter = () => {
    const heartSvg = document.getElementById(`heart-svg-${recipe.id}`);
    if (heartSvg) {
      heartSvg.setAttribute(
        "d",
        "M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
      );
    }
  };

  const handleMouseLeave = () => {
    const heartSvg = document.getElementById(`heart-svg-${recipe.id}`);
    if (heartSvg) {
      heartSvg.setAttribute(
        "d",
        "M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"
      );
    }
  };

  const handleCardMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFavoriteRecipe = async () => {
    try {
      const favoriteRecipesResponse = await fetch(
        "http://localhost:3000/favorite-recipes"
      );
      const favoriteRecipes = await favoriteRecipesResponse.json();

      if (favoriteRecipes.some((favRecipe: any) => favRecipe.id != recipe.id)) {
        const response = await fetch("http://localhost:3000/favorite-recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        });

        if (response.ok) {
          alert("Recipe was saved to favorites successfully!");
          // navigate("/login");
        } else {
          alert("Recipe was not saved to favorites.");
        }
      } else {
        alert("Recipe is already in favorites.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving recipe to favorites.");
    }
  };

  return (
    <Card
      id={`card-block-${recipe.id}`}
      className="bg-white shadow-md rounded-lg overflow-hidden py-0 h-135 group"
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      <div className="relative">
        <div className="relative">
          <img src={recipe.image} alt={recipe.name} className="mb-3" />
          <button
            id={`heart-btn-${recipe.id}`}
            className="absolute top-2 right-2 cursor-pointer bg-[#ffffffb3] p-3 rounded-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleFavoriteRecipe}
          >
            <svg
              className="text-black-400 w-6 h-auto fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                id={`heart-svg-${recipe.id}`}
                d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"
              />
            </svg>
          </button>
        </div>
        <CardHeader>
          <CardTitle className="text-center min-h-13 pt-2">
            {recipe.name}
          </CardTitle>
        </CardHeader>
        <div className="">
          <CardContent>
            <div className="flex justify-center items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(recipe.rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
              ))}
            </div>
            <br />
          </CardContent>
          {isHovered ? (
            <div className="flex justify-center items-center py-2">
              <Button onClick={handleShowMore} className="cursor-pointer">
                Show more
              </Button>
            </div>
          ) : (
            <CardFooter
              id={`tag-block-${recipe.id}`}
              className="flex flex-row justify-center items-center px-6"
            >
              <div className="px-0 pb-2 flex flex-wrap justify-center items-center">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardFooter>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RecipeCard;
