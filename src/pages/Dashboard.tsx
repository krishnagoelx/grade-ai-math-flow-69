
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Users, FileText } from "lucide-react";
import { ClassCard } from "@/components/Dashboard/ClassCard";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for classes
  const classes = [
    {
      id: "class-1",
      name: "10 A",
      studentCount: 28,
      assignments: 5,
      pending: 2,
    },
    {
      id: "class-2",
      name: "11 B",
      studentCount: 32,
      assignments: 3,
      pending: 1,
    },
    {
      id: "class-3",
      name: "12 C",
      studentCount: 24,
      assignments: 7,
      pending: 0,
    },
    {
      id: "class-4",
      name: "9 D",
      studentCount: 30,
      assignments: 4,
      pending: 3,
    },
    {
      id: "class-5",
      name: "8 E",
      studentCount: 35,
      assignments: 6,
      pending: 2,
    }
  ];

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-left">Dashboard</h1>
          <p className="text-muted-foreground text-left">Manage your classes</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search class..."
          className="pl-9 bg-white rounded-lg border-muted"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Create Class Button */}
      <Button 
        className="w-full bg-[#7359F8] hover:bg-[#5e47c9] text-white rounded-lg h-12 shadow-sm"
        onClick={() => navigate("/create-class")}
      >
        <Plus size={18} className="mr-2" />
        Create New Class
      </Button>

      {/* Classes Section */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-left">Your Classes</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredClasses.map((cls) => (
            <ClassCard
              key={cls.id}
              id={cls.id}
              name={cls.name}
              section=""
              studentCount={cls.studentCount}
              assignments={cls.assignments}
              pending={cls.pending}
              onClick={() => navigate(`/class/${cls.id}`)}
              onImportStudents={() => {}}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
