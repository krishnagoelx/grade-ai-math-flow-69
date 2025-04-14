
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassData } from "@/types/class";
import { ClassSummary } from "@/components/Class/ClassSummary";
import { AssignmentsTab } from "@/components/Class/AssignmentsTab";
import { StudentsTab } from "@/components/Class/StudentsTab";

const ClassDetail = () => {
  const { classId } = useParams<{ classId: string }>();
  const [activeTab, setActiveTab] = useState("assignments");
  
  // Mock data - ensuring consistency with dashboard
  const getClassData = (): ClassData => {
    switch(classId) {
      case "class-1":
        return {
          id: "class-1",
          name: "10 A",
          section: "",
          studentCount: 12,
          students: Array(12).fill(null).map((_, index) => ({ 
            id: `ST${String(index + 1).padStart(3, '0')}`, 
            name: getRandomName(), 
            email: `student${index + 1}@example.com`, 
            class: "10 A", 
            roll: String(index + 1).padStart(2, '0'),
            mobile: getRandomPhone()
          })),
          assignments: generateAssignments(10, 2) // 10 total, 2 active
        };
      case "class-3":
        return {
          id: "class-3",
          name: "12 C",
          section: "",
          studentCount: 24,
          students: Array(24).fill(null).map((_, index) => ({ 
            id: `ST${String(index + 1).padStart(3, '0')}`, 
            name: getRandomName(), 
            email: `student${index + 1}@example.com`, 
            class: "12 C", 
            roll: String(index + 1).padStart(2, '0'),
            mobile: getRandomPhone()
          })),
          assignments: generateAssignments(7, 0) // 7 total, 0 active
        };
      default:
        return {
          id: classId || "class-001",
          name: "10 A",
          section: "",
          studentCount: 12,
          students: Array(12).fill(null).map((_, index) => ({ 
            id: `ST${String(index + 1).padStart(3, '0')}`, 
            name: getRandomName(), 
            email: `student${index + 1}@example.com`, 
            class: "10 A", 
            roll: String(index + 1).padStart(2, '0'),
            mobile: getRandomPhone()
          })),
          assignments: generateAssignments(10, 2) // 10 total, 2 active
        };
    }
  };
  
  const classData = getClassData();
  
  return (
    <div className="space-y-6">
      <ClassSummary classData={classData} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="students">Students ({classData.students.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assignments" className="space-y-6 mt-4">
          <AssignmentsTab 
            classId={classData.id} 
            assignments={classData.assignments} 
          />
        </TabsContent>
        
        <TabsContent value="students" className="mt-4">
          <StudentsTab students={classData.students} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper functions to generate consistent data
function getRandomName() {
  const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Lisa", "Thomas", "Jennifer", "James", "Emma"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function getRandomPhone() {
  return `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function generateAssignments(total, active) {
  const subjects = ["Algebra", "Geometry", "Statistics", "Calculus", "Trigonometry"];
  const statuses = ["active", "completed"];
  
  // Generate active assignments first
  const assignments = Array(active).fill(null).map((_, i) => ({
    id: `assign-${String(i + 1).padStart(3, '0')}`,
    title: `${subjects[i % subjects.length]} Assignment ${i + 1}`, 
    subject: subjects[i % subjects.length], 
    date: getRandomFutureDate(), 
    status: "active" as const, 
    completion: Math.floor(Math.random() * 70) + 20, // 20-90%
    maxMarks: (Math.floor(Math.random() * 5) + 2) * 10 // 20, 30, 40, 50, 60, 70
  }));
  
  // Generate completed assignments to reach total
  const completed = total - active;
  for (let i = 0; i < completed; i++) {
    assignments.push({
      id: `assign-${String(i + active + 1).padStart(3, '0')}`,
      title: `${subjects[i % subjects.length]} Assignment ${i + active + 1}`, 
      subject: subjects[i % subjects.length], 
      date: getRandomPastDate(), 
      status: "completed" as const, 
      completion: 100,
      maxMarks: (Math.floor(Math.random() * 5) + 2) * 10 // 20, 30, 40, 50, 60, 70
    });
  }
  
  return assignments;
}

function getRandomFutureDate() {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 14) + 1); // 1-14 days in future
  return formatDate(futureDate);
}

function getRandomPastDate() {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - Math.floor(Math.random() * 120) - 1); // 1-120 days in past
  return formatDate(pastDate);
}

function formatDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default ClassDetail;
