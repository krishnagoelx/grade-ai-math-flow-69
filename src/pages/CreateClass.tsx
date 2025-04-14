
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateClass = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [className, setClassName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!className.trim()) {
      toast({
        title: "Class name required",
        description: "Please enter a name for your class",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the file to a server
    toast({
      title: "Class created",
      description: `${className} has been created${file ? " and student data is being processed" : ""}`,
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" asChild className="p-0 h-auto mr-3">
          <Link to="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create New Class</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Class Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="className">Class Name</Label>
              <Input 
                id="className" 
                placeholder="e.g., 10 A, 11 B, 12 C" 
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Student Data (Optional)</Label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <File className="h-8 w-8 text-primary" />
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="mb-1 font-medium">Drag and drop your file here</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload a CSV, Excel, or PDF file with student information
                    </p>
                    <div>
                      <label htmlFor="file-upload">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="relative"
                          onClick={() => document.getElementById("file-upload")?.click()}
                        >
                          Browse Files
                          <input
                            id="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".csv,.xlsx,.xls,.pdf"
                            onChange={handleFileChange}
                          />
                        </Button>
                      </label>
                    </div>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Our system will automatically extract student information from your uploaded file.
              </p>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-[#7359F8] hover:bg-[#5e47c9]"
            >
              Create Class
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateClass;
