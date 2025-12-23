import Link from 'next/link';

const AdminDashboardPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/projects" className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
          <h3 className="text-lg font-bold">Manage Projects</h3>
          <p className="text-gray-600">Create, edit, and delete projects.</p>
        </Link>
        <Link href="/admin/skills" className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
          <h3 className="text-lg font-bold">Manage Skills</h3>
          <p className="text-gray-600">Update your list of skills.</p>
        </Link>
        <Link href="/admin/site-config" className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
          <h3 className="text-lg font-bold">Site Configuration</h3>
          <p className="text-gray-600">Manage global site settings.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;