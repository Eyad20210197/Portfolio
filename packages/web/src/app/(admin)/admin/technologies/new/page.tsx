"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTechnologyAdmin } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import TechnologyIcon from "@/components/ui/TechnologyIcon";

const NewTechnologyPage = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const techCategories = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Languages",
    "Tools",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!category) {
      setError("Category is required.");
      return;
    }

    const newTech = {
      name,
      category,
      icon_url: icon || null,
    };

    try {
      await createTechnologyAdmin(newTech);
      router.push("/admin/technologies");
    } catch (err: any) {
      setError(err.message || "Failed to create technology.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">New Technology</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-900 p-6 rounded-lg shadow-md text-white"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            className="bg-gray-800 border-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border-gray-700">
              {techCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Icon name (simple-icons)
          </label>
          <div className="flex items-center gap-4">
            <Input
              className="bg-gray-800 border-gray-700"
              placeholder="react, nodejs, docker..."
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
            <div className="w-8 h-8 flex items-center justify-center">
              <TechnologyIcon name={icon} size={28} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Example: react, typescript, nodejs, docker
          </p>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit">Create Technology</Button>
      </form>
    </div>
  );
};

export default NewTechnologyPage;
