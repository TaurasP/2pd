import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const usersResponse = await fetch("http://localhost:3000/users");
      const users = await usersResponse.json();
      const nextId =
        users.length > 0
          ? Math.max(...users.map((user: any) => user.id)) + 1
          : 1;

      const user = { id: nextId, email, password };

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Naudotojas užregistruotas!");
        setEmail("");
        setPassword("");
        navigate("/login");
      } else {
        alert("Nepavyko užregistruoti naudotojo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Klaida registruojant naudotoją.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <Card className="mx-auto max-w-sm min-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Registracija</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">El. paštas</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="el@pastas.lt"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Slaptažodis</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Pakartoti slaptažodį</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="********"
                required
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Registruotis
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
