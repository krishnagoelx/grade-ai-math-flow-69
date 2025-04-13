
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, BarChart2, FileText, Layers, Users } from "lucide-react";
import { ClassCard } from "@/components/Dashboard/ClassCard";
import { AssignmentCard } from "@/components/Dashboard/AssignmentCard";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data for classes
  const classes = [
    {
      id: "class-1",
      name: "Algebra",
      studentCount: 28,
      assignments: 5,
      pending: 2,
    },
    {
      id: "class-2",
      name: "Geometry",
      studentCount: 32,
      assignments: 3,
      pending: 1,
    },
    {
      id: "class-3",
      name: "Calculus",
      studentCount: 24,
      assignments: 7,
      pending: 0,
    }
  ];

  // Mock data for recent assignments
  const recentAssignments = [
    {
      id: "assignment-1",
      title: "Linear Equations Quiz",
      subject: "Algebra",
      date: "10 April 2025",
      status: "active",
      completion: 70,
    },
    {
      id: "assignment-2",
      title: "Trigonometry Mid-term",
      subject: "Trigonometry",
      date: "5 April 2025",
      status: "completed",
      completion: 100,
    }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Manage your classes and assignments</p>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="h-16 flex-col space-y-1 shadow-sm border-primary/20 hover:border-primary hover:bg-primary/5"
          onClick={() => navigate("/create-assignment")}
        >
          <Plus size={18} className="text-primary" />
          <span className="text-sm font-medium">Create Class</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex-col space-y-1 shadow-sm border-primary/20 hover:border-primary hover:bg-primary/5"
          onClick={() => navigate("/analytics")}
        >
          <BarChart2 size={18} className="text-primary" />
          <span className="text-sm font-medium">Analytics</span>
        </Button>
      </div>

      {/* Classes Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Classes</h2>
          <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/classes")}>
            View All <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {classes.map((cls) => (
            <ClassCard
              key={cls.id}
              id={cls.id}
              name={cls.name}
              section="" // Removed as per request
              studentCount={cls.studentCount}
              assignments={cls.assignments}
              pending={cls.pending}
              onClick={() => navigate(`/class/${cls.id}`)}
              onImportStudents={() => {}} // Functionality moved elsewhere
            />
          ))}
        </div>
      </section>

      {/* Recent Assignments Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Assignments</h2>
          <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/assignments")}>
            View All <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {recentAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              id={assignment.id}
              title={assignment.title}
              subject={assignment.subject}
              date={assignment.date}
              status={assignment.status}
              completion={assignment.completion}
            />
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between px-4 py-2 z-10">
        <Button variant="ghost" className="flex-1 flex flex-col items-center py-2 h-auto" onClick={() => navigate("/")}>
          <Layers size={20} />
          <span className="text-xs mt-1">Classes</span>
        </Button>
        <Button variant="ghost" className="flex-1 flex flex-col items-center py-2 h-auto" onClick={() => navigate("/create-assignment")}>
          <FileText size={20} />
          <span className="text-xs mt-1">Assignments</span>
        </Button>
        <Button variant="ghost" className="flex-1 flex flex-col items-center py-2 h-auto" onClick={() => navigate("/analytics")}>
          <BarChart2 size={20} />
          <span className="text-xs mt-1">Analytics</span>
        </Button>
        <Button variant="ghost" className="flex-1 flex flex-col items-center py-2 h-auto" onClick={() => navigate("/students")}>
          <Users size={20} />
          <span className="text-xs mt-1">Students</span>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
