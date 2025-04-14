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
  
  // Mock data for demonstration - in a real app this would be fetched based on classId
  const classData: ClassData = {
    id: classId || "class-001",
    name: "10 A",
    section: "",
    studentCount: 32,
    students: [
      { id: "ST001", name: "John Doe", email: "john.doe@example.com", class: "10 A", roll: "01", mobile: "123-456-7890" },
      { id: "ST002", name: "Jane Smith", email: "jane.smith@example.com", class: "10 A", roll: "02", mobile: "234-567-8901" },
      { id: "ST003", name: "Robert Johnson", email: "robert.j@example.com", class: "10 A", roll: "03", mobile: "345-678-9012" },
      { id: "ST004", name: "Emily Davis", email: "emily.d@example.com", class: "10 A", roll: "04", mobile: "456-789-0123" },
      { id: "ST005", name: "Michael Brown", email: "michael.b@example.com", class: "10 A", roll: "05", mobile: "567-890-1234" },
      { id: "ST006", name: "Sarah Wilson", email: "sarah.w@example.com", class: "10 A", roll: "06", mobile: "678-901-2345" },
      { id: "ST007", name: "David Taylor", email: "david.t@example.com", class: "10 A", roll: "07", mobile: "789-012-3456" },
      { id: "ST008", name: "Jessica Martin", email: "jessica.m@example.com", class: "10 A", roll: "08", mobile: "890-123-4567" },
      { id: "ST009", name: "Thomas Clark", email: "thomas.c@example.com", class: "10 A", roll: "09", mobile: "901-234-5678" },
      { id: "ST010", name: "Lisa Rodriguez", email: "lisa.r@example.com", class: "10 A", roll: "10", mobile: "012-345-6789" },
      { id: "ST011", name: "Daniel Lewis", email: "daniel.l@example.com", class: "10 A", roll: "11", mobile: "987-654-3210" },
      { id: "ST012", name: "Jennifer Lee", email: "jennifer.l@example.com", class: "10 A", roll: "12", mobile: "876-543-2109" },
    ],
    assignments: [
      { 
        id: "assign-001",
        title: "Linear Equations Test", 
        subject: "Algebra", 
        date: "Apr 10, 2025", 
        status: "completed" as const, 
        completion: 100,
        maxMarks: 50
      },
      { 
        id: "assign-002",
        title: "Probability Quiz", 
        subject: "Statistics", 
        date: "Apr 5, 2025", 
        status: "active" as const, 
        completion: 68,
        maxMarks: 30 
      },
      { 
        id: "assign-004",
        title: "Calculus Basics", 
        subject: "Calculus", 
        date: "Mar 15, 2025", 
        status: "completed" as const, 
        completion: 100,
        maxMarks: 40
      },
      { 
        id: "assign-005",
        title: "Statistics Mid-term", 
        subject: "Statistics", 
        date: "Feb 28, 2025", 
        status: "completed" as const, 
        completion: 100,
        maxMarks: 75
      },
      { 
        id: "assign-006",
        title: "Trigonometry Quiz", 
        subject: "Trigonometry", 
        date: "Feb 15, 2025", 
        status: "completed" as const, 
        completion: 100,
        maxMarks: 30
      },
      { 
        id: "assign-007",
        title: "Calculus Derivatives", 
        subject: "Calculus", 
        date: "Apr 15, 2025", 
        status: "active" as const, 
        completion: 25,
        maxMarks: 45
      },
      { 
        id: "assign-009",
        title: "Geometry Vectors", 
        subject: "Geometry", 
        date: "Jan 10, 2025", 
        status: "completed" as const, 
        completion: 100,
        maxMarks: 40
      },
      { 
        id: "assign-010",
        title: "Statistics Probability", 
        subject: "Statistics", 
        date: "Jan 25, 2025", 
        status: "completed" as const, 
        completion: 100,
        maxMarks: 50
      }
    ]
  };
  
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

export default ClassDetail;
