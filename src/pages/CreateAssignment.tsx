
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileUp, 
  PlusCircle, 
  Wand2, 
  Trash, 
  Edit,
  CheckSquare,
  Square,
  GripVertical,
  Upload,
  ArrowLeft
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Question {
  id: string;
  questionText: string;
  maxMarks: number;
  order: number;
}

const CreateAssignment = () => {
  const [activeTab, setActiveTab] = useState("questions");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Parse the URL to check if we're editing an existing assignment
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const editId = params.get('edit');
    
    if (editId) {
      setEditingId(editId);
      setIsEditing(true);
      
      // In a real app, we would fetch the assignment data here
      // For now, we'll set some mock data
      setTitle("Linear Equations Test");
      setDueDate("2025-04-25");
      setMaxMarks("50");
      
      // Mock questions for editing
      setQuestions([
        {
          id: "q1",
          questionText: "Solve the quadratic equation: 2x² + 5x - 3 = 0",
          maxMarks: 10,
          order: 1
        },
        {
          id: "q2",
          questionText: "Find the derivative of f(x) = x³ + 2x² - 5x + 7",
          maxMarks: 8,
          order: 2
        }
      ]);
    }
  }, [location]);
  
  const handleAddQuestionPaper = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setQuestions([
        {
          id: "q1",
          questionText: "Solve the quadratic equation: 2x² + 5x - 3 = 0",
          maxMarks: 10,
          order: 1
        },
        {
          id: "q2",
          questionText: "Find the derivative of f(x) = x³ + 2x² - 5x + 7",
          maxMarks: 8,
          order: 2
        },
        {
          id: "q3",
          questionText: "If the probability of an event is 0.4, what is the probability of its complement?",
          maxMarks: 5,
          order: 3
        }
      ]);
      
      setIsProcessing(false);
      
      toast({
        title: "Question Paper Processed",
        description: "3 questions have been extracted from the uploaded paper.",
      });
    }, 2000);
  };
  
  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
    
    if (selectedQuestionId === questionId) {
      setSelectedQuestionId(null);
    }
  };
  
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      questionText: "",
      maxMarks: 0,
      order: questions.length + 1
    };
    
    setQuestions([...questions, newQuestion]);
  };
  
  const handleQuestionChange = (questionId: string, field: keyof Question, value: string | number) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId 
          ? { ...q, [field]: value } 
          : q
      )
    );
  };
  
  const handleGenerateRubric = (questionId: string) => {
    toast({
      title: "Generating Rubric",
      description: "AI is generating a rubric for this question...",
    });
    
    setTimeout(() => {
      toast({
        title: "Rubric Generated",
        description: "The rubric has been generated successfully.",
      });
    }, 1500);
  };
  
  const handleSaveAssignment = () => {
    if (!title) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for the assignment.",
        variant: "destructive",
      });
      return;
    }
    
    if (questions.length === 0) {
      toast({
        title: "Missing Questions",
        description: "Please add at least one question to the assignment.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: isEditing ? "Assignment Updated" : "Assignment Created",
      description: `The assignment has been ${isEditing ? 'updated' : 'saved'} successfully.`,
    });
    
    // Navigate back to the assignment detail or dashboard
    if (isEditing && editingId) {
      navigate(`/assignment/${editingId}`);
    } else {
      navigate('/dashboard');
    }
  };
  
  const handleUploadQuestion = () => {
    toast({
      title: "Upload Question",
      description: "Question uploaded successfully."
    });
    
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      questionText: "Uploaded question",
      maxMarks: 8,
      order: questions.length + 1
    };
    
    setQuestions([...questions, newQuestion]);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {isEditing && (
          <Button variant="ghost" onClick={() => navigate(-1)} className="p-0 h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit Assignment" : "Create Assignment"}
        </h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Assignment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="e.g., Midterm Exam, Quiz 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input 
                id="dueDate" 
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxMarks">Total Marks</Label>
              <Input 
                id="maxMarks" 
                type="number"
                placeholder="e.g., 100"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="rubric">Build Rubric</TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions" className="space-y-4">
          {questions.length === 0 && !isProcessing ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <FileUp size={40} className="mx-auto text-muted-foreground" />
                  <div>
                    <p className="font-medium">Upload the paper to extract questions using AI</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Or add questions manually below
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button onClick={handleAddQuestionPaper}>
                      Upload Question Paper
                    </Button>
                    <Button variant="outline" onClick={handleAddQuestion}>
                      <PlusCircle size={16} className="mr-2" />
                      Add Question
                    </Button>
                    <Button variant="outline" onClick={handleUploadQuestion}>
                      <Upload size={16} className="mr-2" />
                      Upload Question
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : isProcessing ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-10 h-10 border-4 border-t-[#7359F8] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="font-medium">Processing Question Paper...</p>
                  <p className="text-sm text-muted-foreground">
                    Our AI is analyzing and extracting questions
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Questions</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleAddQuestion}>
                    <PlusCircle size={16} className="mr-2" />
                    Add Question
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleUploadQuestion}>
                    <Upload size={16} className="mr-2" />
                    Upload Question
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <Card key={question.id} className="overflow-hidden">
                    <div className="flex items-start p-4">
                      <div className="flex items-center mr-3 text-muted-foreground">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <GripVertical size={20} className="cursor-grab" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Drag to reorder</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div className="flex items-center ml-2">
                          {question.maxMarks > 0 ? (
                            <CheckSquare size={20} className="text-[#7359F8]" />
                          ) : (
                            <Square size={20} />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Question {index + 1}</h4>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              className="w-16 h-8 text-sm"
                              placeholder="Marks"
                              value={question.maxMarks > 0 ? question.maxMarks : ""}
                              onChange={(e) => handleQuestionChange(
                                question.id, 
                                "maxMarks", 
                                parseInt(e.target.value) || 0
                              )}
                            />
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteQuestion(question.id)}>
                              <Trash size={16} />
                            </Button>
                          </div>
                        </div>
                        
                        <Textarea
                          placeholder="Enter question text"
                          value={question.questionText}
                          onChange={(e) => handleQuestionChange(
                            question.id, 
                            "questionText", 
                            e.target.value
                          )}
                          className="resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="rubric" className="space-y-4">
          {questions.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <p className="font-medium">No questions added yet</p>
                <p className="text-sm text-muted-foreground">
                  Add questions first to build rubrics for them
                </p>
                <Button onClick={() => setActiveTab("questions")}>
                  Add Questions
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <h3 className="text-lg font-medium">Build Rubric</h3>
              
              <Accordion type="single" collapsible className="w-full">
                {questions.map((question, index) => (
                  <AccordionItem key={question.id} value={question.id}>
                    <AccordionTrigger className="hover:bg-gray-50 p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Question {index + 1}</span>
                        <span className="font-medium truncate max-w-[200px]">
                          {question.questionText.length > 30 
                            ? `${question.questionText.substring(0, 30)}...` 
                            : question.questionText || "No question text"}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 border-t">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            onClick={() => handleGenerateRubric(question.id)}
                          >
                            <Wand2 size={16} className="mr-2" />
                            Generate with AI
                          </Button>
                          <Button variant="outline">
                            <FileUp size={16} className="mr-2" />
                            Upload Rubric
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`rubric-${question.id}`}>Rubric</Label>
                          <Textarea
                            id={`rubric-${question.id}`}
                            placeholder="Define grading criteria for this question..."
                            className="min-h-[150px]"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="fixed bottom-4 inset-x-4 sm:relative sm:bottom-auto sm:inset-x-auto">
        <Button 
          onClick={handleSaveAssignment} 
          className="w-full bg-[#7359F8] hover:bg-[#5e47c9]"
        >
          {isEditing ? "Update Assignment" : "Save Assignment"}
        </Button>
      </div>
    </div>
  );
};

export default CreateAssignment;
