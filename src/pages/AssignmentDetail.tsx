
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Share2, 
  BarChart, 
  FileText, 
  FileUp, 
  Download, 
  Settings, 
  Eye, 
  Edit, 
  CheckCircle, 
  Loader2, 
  RotateCcw
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AssignmentDetail, StudentAssignment } from "@/types/class";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Checkbox
} from "@/components/ui/checkbox";

const AssignmentDetailPage = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("results");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  
  // Mock assignment data
  const assignment: AssignmentDetail = {
    id: assignmentId || "assign-001",
    title: "Linear Equations Test",
    subject: "",
    date: "Apr 10, 2023",
    status: "active",
    completion: 68,
    maxMarks: 50,
    description: "End of chapter test on linear equations and their applications",
    rubric: "Rubric document uploaded",
    questionPaper: "Question paper uploaded",
    markingScheme: "Marking scheme uploaded",
    students: [
      {
        studentId: "ST001",
        studentName: "John Doe",
        status: "graded",
        score: 42,
        submissionUrl: "#",
        feedbackUrl: "#",
        isShared: true,
        sharedUrl: "https://example.com/results/st001"
      },
      {
        studentId: "ST002",
        studentName: "Jane Smith",
        status: "processing",
        submissionUrl: "#",
        isShared: false
      },
      {
        studentId: "ST003",
        studentName: "Robert Johnson",
        status: "failed",
        submissionUrl: "#",
        isShared: false
      },
      {
        studentId: "ST004",
        studentName: "Emily Williams",
        status: "pending",
        isShared: false
      }
    ]
  };

  // Mock available students for grading
  const availableStudents = [
    { id: "ST005", name: "Alex Brown" },
    { id: "ST006", name: "Sarah Miller" },
    { id: "ST007", name: "David Jones" }
  ];
  
  const handleUploadSheets = () => {
    toast({
      title: "Upload Student Sheets",
      description: "This would open a file upload dialog"
    });
  };
  
  const handleShareResults = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "No Students Selected",
        description: "Please select students to share results with",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Results Shared",
      description: `Results shared with ${selectedStudents.length} student(s)`
    });
    setSelectedStudents([]);
  };
  
  const handleEditAssignment = () => {
    navigate(`/assignment/${assignmentId}/edit`);
  };
  
  const handleRetryGrading = (studentId: string) => {
    toast({
      title: "Retry Grading",
      description: `Retrying grading for student ${studentId}`
    });
  };
  
  const handleShareWithStudent = (studentId: string) => {
    toast({
      title: "Results Shared",
      description: `Results have been shared with student ${studentId}`
    });
  };
  
  const handleViewFeedback = (studentId: string) => {
    navigate(`/student/${studentId}/feedback`);
  };
  
  const handleSearchStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleAssignStudent = (studentId: string, studentName: string) => {
    toast({
      title: "Student Assigned",
      description: `${studentName} has been assigned to this assignment`
    });
  };
  
  const toggleStudentSelection = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };
  
  const selectAllStudents = () => {
    if (selectedStudents.length === assignment.students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(assignment.students.map(s => s.studentId));
    }
  };
  
  const filteredStudents = availableStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const pendingCount = assignment.students.filter(s => s.status === "pending").length;
  const processingCount = assignment.students.filter(s => s.status === "processing").length;
  const gradedCount = assignment.students.filter(s => s.status === "graded").length;
  const failedCount = assignment.students.filter(s => s.status === "failed").length;
  
  const totalStudents = assignment.students.length;
  const gradedPercentage = totalStudents > 0 ? (gradedCount / totalStudents) * 100 : 0;
  
  return (
    <div className="container mx-auto px-4 space-y-6 pb-8 max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{assignment.title}</h1>
          
          <div className="flex items-center flex-wrap gap-2 mt-1">
            <Badge 
              variant="outline" 
              className={
                assignment.status === "draft" ? "bg-gray-100 text-gray-800" :
                assignment.status === "active" ? "bg-blue-100 text-blue-800" :
                "bg-green-100 text-green-800"
              }
            >
              {assignment.status === "draft" ? "Draft" : 
               assignment.status === "active" ? "Active" : "Completed"}
            </Badge>
            <p className="text-sm text-muted-foreground">{assignment.maxMarks} marks</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleEditAssignment}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" onClick={handleShareResults}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/assignment/${assignmentId}/analytics`}>
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </Button>
          <Button onClick={handleUploadSheets}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>
      
      {assignment.status === "active" && (
        <Card className="mb-2">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  {gradedCount} of {totalStudents} graded
                </span>
                <span className="text-sm font-medium">{Math.round(gradedPercentage)}%</span>
              </div>
              <Progress value={gradedPercentage} className="h-1.5" />
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="grade">Grade</TabsTrigger>
        </TabsList>
        
        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Student Results</CardTitle>
                <div className="flex gap-2">
                  <Checkbox 
                    id="select-all" 
                    checked={selectedStudents.length === assignment.students.length && assignment.students.length > 0}
                    onCheckedChange={selectAllStudents}
                  />
                  <label htmlFor="select-all" className="text-sm">Select All</label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">
                        <span className="sr-only">Select</span>
                      </TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="text-right">Feedback</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignment.students.map((student) => (
                      <TableRow key={student.studentId}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedStudents.includes(student.studentId)} 
                            onCheckedChange={() => toggleStudentSelection(student.studentId)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{student.studentName}</TableCell>
                        <TableCell>
                          {student.status === "graded" && (
                            <CheckCircle size={18} className="text-green-500" />
                          )}
                          {student.status === "processing" && (
                            <Loader2 size={18} className="text-blue-500 animate-spin" />
                          )}
                          {student.status === "failed" && (
                            <Button variant="ghost" size="sm" onClick={() => handleRetryGrading(student.studentId)}>
                              <RotateCcw size={16} className="text-red-500 mr-1" />
                              <span className="sr-only sm:not-sr-only sm:text-xs">Retry</span>
                            </Button>
                          )}
                          {student.status === "pending" && (
                            <span className="text-gray-500 text-sm">Pending</span>
                          )}
                        </TableCell>
                        <TableCell>{student.score !== undefined ? `${student.score}/${assignment.maxMarks}` : '-'}</TableCell>
                        <TableCell className="text-right">
                          {student.status === "graded" && (
                            <Button variant="ghost" size="sm" onClick={() => handleViewFeedback(student.studentId)}>
                              <Eye size={16} className="mr-1" />
                              <span className="sr-only sm:not-sr-only sm:text-xs">View</span>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="grade" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Grade Student Submissions</CardTitle>
              <CardDescription>
                Upload student submissions or assign to available students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input 
                  placeholder="Search students..." 
                  value={searchQuery}
                  onChange={handleSearchStudent}
                  className="mb-4"
                />
                
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map(student => (
                        <div key={student.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="font-medium">{student.name}</div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAssignStudent(student.id, student.name)}
                            >
                              Assign
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No matching students found</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-lg">
                <FileUp size={40} className="text-muted-foreground mb-4" />
                <p className="text-sm text-center text-muted-foreground mb-6 max-w-md">
                  Upload student answer sheets to be automatically graded
                </p>
                <Button onClick={handleUploadSheets}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Answer Sheets
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentDetailPage;
