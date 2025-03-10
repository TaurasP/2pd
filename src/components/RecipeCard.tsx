import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RecipeCardProps {
  recipe: {
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
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="">
      <Card className="bg-white shadow-md rounded-lg overflow-hidden py-0">
        <div className="relative">
          <div className="relative group">
            <img src={recipe.image} alt={recipe.name} className="mb-3" />
            {/* <div className="absolute inset-0 bg-white bg-opacity-100 flex justify-center items-center opacity-0 group-hover:opacity-50 transition-opacity duration-300">
              <Button type="submit" className="cursor-pointer">
                Show more
              </Button>
            </div> */}
          </div>
          <div className="">
            <CardHeader>
              <CardTitle className="text-center">{recipe.name}</CardTitle>
              {/* <br />
              <CardDescription>{recipe.instructions}</CardDescription>
              <br /> */}
            </CardHeader>
          </div>
          <div className="">
            <CardContent>
              {/* <p>Preparation time: {recipe.prepTimeMinutes} min.</p>
              <p>Cooking time: {recipe.cookTimeMinutes} min.</p>
              <p>Servings: {recipe.servings}</p>
              <p>Difficulty: {recipe.difficulty}</p>
              <p>Cuisine: {recipe.cuisine}</p>
              <p>Calories per serving: {recipe.caloriesPerServing}</p>
              <p>Servings: {recipe.servings}</p> */}
              <br />
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
            <CardFooter className="flex flex-row justify-center items-center px-6">
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
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RecipeCard;
