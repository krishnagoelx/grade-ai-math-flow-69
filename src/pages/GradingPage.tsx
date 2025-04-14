
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Send } from "lucide-react";
import { UploadSubmissions } from "@/components/Grading/UploadSubmissions";
import { GradingInterface } from "@/components/Grading/GradingInterface";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const GradingPage = () => {
  const [activeTab, setActiveTab] = useState("submissions");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [gradingProgress, setGradingProgress] = useState(0);
  const [isGradingComplete, setIsGradingComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Mock available students for grading
  const availableStudents = [
    { id: "ST005", name: "Alex Brown" },
    { id: "ST006", name: "Sarah Miller" },
    { id: "ST007", name: "David Jones" },
    { id: "ST008", name: "Emily Clark" },
    { id: "ST009", name: "Michael Wilson" }
  ];
  
  // Filter students based on search query
  const filteredStudents = availableStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Mock data for a sample student submission
  const mockStudentData = {
    submissionId: "sub-123",
    studentName: "Michael Brown",
    questionNumber: currentQuestion,
    questionText: currentQuestion === 1 
      ? "Solve the quadratic equation: 2x² + 5x - 3 = 0" 
      : currentQuestion === 2 
        ? "Find the derivative of f(x) = x³ + 2x² - 5x + 7" 
        : "If the probability of an event is 0.4, what is the probability of its complement?",
    maxMarks: currentQuestion === 1 ? 10 : currentQuestion === 2 ? 8 : 5,
    criteria: [
      {
        id: "crit-1",
        title: "Mathematical Approach",
        description: "Student demonstrates a clear understanding of the mathematical concepts",
        maxPoints: 4,
        points: 0,
        feedback: ""
      },
      {
        id: "crit-2",
        title: "Logical Reasoning",
        description: "Student shows step-by-step reasoning with clear explanations",
        maxPoints: 3,
        points: 0,
        feedback: ""
      },
      {
        id: "crit-3",
        title: "Accuracy of Calculations",
        description: "All calculations are performed correctly without arithmetic errors",
        maxPoints: currentQuestion === 1 ? 3 : currentQuestion === 2 ? 1 : 2,
        points: 0,
        feedback: ""
      }
    ]
  };
  
  const totalQuestions = 3;
  
  const handleNextQuestion = () => {
    // In a real app, we would save the current grades before moving on
    if (currentQuestion < totalQuestions) {
      // Simulate saving progress
      toast({
        title: "Progress Saved",
        description: `Question ${currentQuestion} grades saved.`,
      });
      
      setCurrentQuestion(currentQuestion + 1);
      setGradingProgress(Math.round((currentQuestion / totalQuestions) * 100));
    } else {
      setIsGradingComplete(true);
      setGradingProgress(100);
      
      toast({
        title: "Grading Complete",
        description: "All questions have been graded.",
      });
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleFinishGrading = () => {
    toast({
      title: "Assignment Graded",
      description: "Grades have been submitted and shared with students.",
    });
  };
  
  const handleAssignStudent = (studentId: string, studentName: string) => {
    toast({
      title: "Student Assigned",
      description: `${studentName} has been assigned to this assignment`
    });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="container mx-auto px-4 space-y-4 pb-8 max-w-5xl">
      <h1 className="text-2xl font-bold tracking-tight">Midterm Exam</h1>
      <p className="text-muted-foreground">Grade 10A</p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submissions">Upload Submissions</TabsTrigger>
          <TabsTrigger value="grading">Grading</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submissions" className="py-4">
          <UploadSubmissions />
          
          <div className="flex justify-end mt-4">
            <Button onClick={() => setActiveTab("grading")}>
              Start Grading
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="grading" className="py-4">
          <Card className="mb-4">
            <CardContent className="p-2">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <div className="text-sm font-medium">
                    {isGradingComplete 
                      ? "All questions graded" 
                      : `Question ${currentQuestion} of ${totalQuestions}`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Michael Brown • Student ID: ST005
                  </div>
                </div>
                
                <div className="w-full sm:w-1/2">
                  <Progress value={gradingProgress} className="h-1 mb-1" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Q1</span>
                    <span>Q2</span>
                    <span>Q3</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <GradingInterface {...mockStudentData} />
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Assign Students</CardTitle>
                  <CardDescription>
                    Find and assign students to grade
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input 
                    placeholder="Search students..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  
                  <ScrollArea className="h-[350px] overflow-x-auto">
                    <div className="min-w-[200px] space-y-3">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                          <div key={student.id} className="flex items-center justify-between p-3 border rounded-md">
                            <div className="font-medium">{student.name}</div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAssignStudent(student.id, student.name)}
                            >
                              Assign
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No matching students</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  <Button className="w-full">
                    Submit Assignments
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 1}
            >
              Previous Question
            </Button>
            
            {isGradingComplete ? (
              <div className="flex gap-2">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button onClick={handleFinishGrading}>
                  <Send className="mr-2 h-4 w-4" />
                  Finish & Share
                </Button>
              </div>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestion < totalQuestions ? "Next Question" : "Complete Grading"}
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GradingPage;
