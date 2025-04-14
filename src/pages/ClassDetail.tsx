
import { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft, Upload, Users, Search, Calendar, Download, ChevronRight, ChevronLeft, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AssignmentCard } from "@/components/Dashboard/AssignmentCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClassData, Student, AssignmentSummary } from "@/types/class";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ClassDetail = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("assignments");
  const [searchStudents, setSearchStudents] = useState("");
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  
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
        id: "assign-003",
        title: "Geometry Problems", 
        subject: "Geometry", 
        date: "Mar 28, 2025", 
        status: "draft" as const, 
        completion: 0,
        maxMarks: 25
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
      }
    ]
  };
  
  const handleImportStudents = () => {
    toast({
      title: "Import Students",
      description: "Upload attendance sheet or student database"
    });
  };
  
  const handleViewStudent = (id: string) => {
    toast({
      title: "View Student",
      description: `Viewing student with ID: ${id}`,
    });
  };
  
  const filteredStudents = classData.students.filter(student => 
    student.name.toLowerCase().includes(searchStudents.toLowerCase()) || 
    student.roll.includes(searchStudents) ||
    student.email.toLowerCase().includes(searchStudents.toLowerCase()) ||
    (student.mobile && student.mobile.includes(searchStudents))
  );
  
  const draftAssignments = classData.assignments.filter(a => a.status === "draft");
  const activeAssignments = classData.assignments.filter(a => a.status === "active");
  const completedAssignments = classData.assignments.filter(a => a.status === "completed");
  
  const scroll = (direction: 'left' | 'right') => {
    if (horizontalScrollRef.current) {
      const { current } = horizontalScrollRef;
      const scrollAmount = 300; // adjust as needed
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" asChild className="p-0 h-auto mr-3">
          <Link to="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{classData.name}</h1>
          <p className="text-muted-foreground">Manage class assignments and students</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="students">Students ({classData.students.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assignments" className="space-y-6 mt-4">
          <Button 
            onClick={() => navigate("/create-assignment")}
            className="w-full bg-[#7359F8] hover:bg-[#5e47c9] text-white flex items-center justify-center gap-2"
          >
            <PlusCircle size={18} />
            Create Assignment
          </Button>

          {activeAssignments.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold tracking-tight">Active Assignments</h2>
              <div className="relative">
                <ScrollArea className="w-full whitespace-nowrap pb-2" ref={horizontalScrollRef}>
                  <div className="flex space-x-4 pb-1">
                    {activeAssignments.map((assignment) => (
                      <div key={assignment.id} className="w-[270px] flex-shrink-0">
                        <AssignmentCard
                          id={assignment.id}
                          title={assignment.title}
                          subject={assignment.subject}
                          date={assignment.date}
                          status={assignment.status}
                          completion={assignment.completion}
                          maxMarks={assignment.maxMarks}
                        />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8 rounded-full shadow bg-white"
                    onClick={() => scroll('left')}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                </div>
                
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8 rounded-full shadow bg-white"
                    onClick={() => scroll('right')}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {draftAssignments.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold tracking-tight">Drafts</h2>
              <div className="relative">
                <ScrollArea className="w-full whitespace-nowrap pb-2">
                  <div className="flex space-x-4 pb-1">
                    {draftAssignments.map((assignment) => (
                      <div key={assignment.id} className="w-[270px] flex-shrink-0">
                        <AssignmentCard
                          id={assignment.id}
                          title={assignment.title}
                          subject={assignment.subject}
                          date={assignment.date}
                          status={assignment.status}
                          completion={assignment.completion}
                          maxMarks={assignment.maxMarks}
                        />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          )}
          
          {completedAssignments.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-tight">Completed</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 flex gap-1">
                      <Filter size={14} />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Calendar size={14} className="mr-2" />
                      <span>All</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar size={14} className="mr-2" />
                      <span>April 2025</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar size={14} className="mr-2" />
                      <span>March 2025</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar size={14} className="mr-2" />
                      <span>February 2025</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="relative">
                <ScrollArea className="w-full whitespace-nowrap pb-2">
                  <div className="flex space-x-4 pb-1">
                    {completedAssignments.map((assignment) => (
                      <div key={assignment.id} className="w-[270px] flex-shrink-0">
                        <AssignmentCard
                          id={assignment.id}
                          title={assignment.title}
                          subject={assignment.subject}
                          date={assignment.date}
                          status={assignment.status}
                          completion={assignment.completion}
                          maxMarks={assignment.maxMarks}
                        />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          )}
          
          {classData.assignments.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No assignments yet</h3>
              <p className="text-muted-foreground mb-6">Create your first assignment to get started</p>
              <Button onClick={() => navigate("/create-assignment")}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="students" className="mt-4">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search student..." 
                  className="pl-9"
                  value={searchStudents}
                  onChange={(e) => setSearchStudents(e.target.value)}
                />
              </div>
              
              <Button variant="outline" size="icon" onClick={handleImportStudents}>
                <Upload size={16} />
              </Button>
              
              <Button variant="outline" size="icon">
                <Download size={16} />
              </Button>
              
              <Button variant="outline" size="icon">
                <PlusCircle size={16} />
              </Button>
            </div>
            
            <div className="border rounded-md bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Class</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Roll No.</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Mobile</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                      <th className="h-10 px-4 text-center align-middle font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-4">{student.name}</td>
                        <td className="p-4">{student.class}</td>
                        <td className="p-4">{student.roll}</td>
                        <td className="p-4">{student.mobile || "-"}</td>
                        <td className="p-4 truncate max-w-[150px]">{student.email}</td>
                        <td className="p-4 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewStudent(student.id)}
                          >
                            <ChevronRight size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan={6} className="h-24 text-center text-muted-foreground">
                          No students found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassDetail;
