import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <Card className="mx-auto max-w-sm min-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Prisijungimas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">El. paštas</Label>
            <Input
              id="email"
              type="email"
              placeholder="el@pastas.lt"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Slaptažodis</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              required
            />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Prisijungti
          </Button>
          <Button variant="outline" className="w-full cursor-pointer">
            Registruotis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
