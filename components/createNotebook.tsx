import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CardWithForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: (title: string) => void;
}) {
  const [notebookTitle, setNotebookTitle] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notebookTitle.trim() === "") {
      alert("Notebook title cannot be empty.");
      return;
    }
    onSubmit(notebookTitle); // Pass the notebook title to the parent
  };

  return (
    <Card className="w-[350px] mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl text-black">Create a Notebook</CardTitle>
          <CardDescription className="text-gray-600">
            Start taking notes in your own personal notebook
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-black">Name</Label>
              <Input
                id="name"
                placeholder="Name of your notebook"
                value={notebookTitle}
                onChange={(e) => setNotebookTitle(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 text-black focus:ring-[#D73F09] focus:border-[#D73F09]"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onCancel} 
            className="text-black border-[#D73F09] border-2 rounded-lg py-2 px-4 hover:bg-[#D73F09] hover:text-white transition-all duration-200"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-[#D73F09] text-white rounded-lg py-2 px-4 hover:bg-[#B53008] transition-all duration-200"
          >
            Deploy
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}