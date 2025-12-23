"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getAllTechnologiesAdmin,
  deleteTechnologyAdmin,
} from "@/lib/api";
import { Technology } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import TechnologyIcon from "@/components/ui/TechnologyIcon";
import { Code } from "lucide-react";

const AdminTechnologiesPage = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllTechnologiesAdmin()
      .then(setTechnologies)
      .catch(() => setError("Failed to load technologies."));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await deleteTechnologyAdmin(id);
      setTechnologies((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete technology.");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Technologies</h2>
        <Link
          href="/admin/technologies/new"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
        >
          New Technology
        </Link>
      </div>

      {technologies.length === 0 ? (
        <EmptyState
          message="No technologies defined yet."
          icon={<Code className="w-16 h-16 text-gray-400" />}
        />
      ) : (
        <div className="bg-gray-900 rounded-lg shadow-md">
          <ul className="divide-y divide-gray-800">
            {technologies.map((tech) => (
              <li
                key={tech.id}
                className="p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <TechnologyIcon name={tech.icon_url} size={28} />
                  <div>
                    <h3 className="text-lg font-bold">{tech.name}</h3>
                    <p className="text-gray-400">{tech.category}</p>
                  </div>
                </div>

                <div className="space-x-4">
                  <Link
                    href={`/admin/technologies/${tech.id}/edit`}
                    className="text-indigo-400 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(tech.id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminTechnologiesPage;
