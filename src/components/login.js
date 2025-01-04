import React from "react";
import {Card, CardContent, CardFooter, CardHeader} from "./ui/card";
import {Button} from "./ui/button";
import {LogIn} from "lucide-react";

function Login() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Welcome</h2>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            Please sign in to access your account
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="default" asChild>
            <a href="/api/auth/login" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" /> Sign In
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
