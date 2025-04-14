
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, Download, PlusCircle, MoreVertical, Eye, FileText, User } from "lucide-react";
import { Student } from "@/types/class";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudentsTabProps {
  students: Student[];
}

export const StudentsTab = ({ students }: StudentsTabProps) => {
  const [searchStudents, setSearchStudents] = useState("");
  const { toast } = useToast();

  const handleImportStudents = () => {
    toast({
      title: "Import Students",
      description: "Upload attendance sheet or student database"
    });
  };

  const handleExportStudents = () => {
    toast({
      title: "Export Students",
      description: "Downloading student data as CSV"
    });
  };

  const handleAddStudent = () => {
    toast({
      title: "Add Student",
      description: "Opening form to add a new student"
    });
  };

  const handleViewStudent = (id: string) => {
    toast({
      title: "View Student Profile",
      description: `Viewing profile for student ${id}`,
    });
  };
  
  const handleViewAssignments = (id: string) => {
    toast({
      title: "View Student Assignments",
      description: `Viewing assignments for student ${id}`,
    });
  };
  
  const handleEditDetails = (id: string) => {
    toast({
      title: "Edit Student",
      description: `Editing details for student ${id}`,
    });
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchStudents.toLowerCase()) || 
    student.roll.includes(searchStudents) ||
    student.email.toLowerCase().includes(searchStudents.toLowerCase()) ||
    (student.mobile && student.mobile.includes(searchStudents))
  );

  return (
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
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleImportStudents}>
                <Upload size={16} className="mr-2" />
                Import
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Import Students from file</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleExportStudents}>
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export Students as CSV</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleAddStudent}>
                <PlusCircle size={16} className="mr-2" />
                Add
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add New Student</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="border rounded-md bg-white overflow-hidden">
        <div className="overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr className="border-b bg-muted/50">
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Class</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Roll No.</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Mobile</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                <th className="h-10 px-4 text-center align-middle font-medium text-muted-foreground w-[100px]">Actions</th>
              </tr>
            </thead>
            <ScrollArea className="max-h-[400px]">
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">{student.name}</td>
                    <td className="p-4">{student.class}</td>
                    <td className="p-4">{student.roll}</td>
                    <td className="p-4">{student.mobile || "-"}</td>
                    <td className="p-4 truncate max-w-[150px]">{student.email}</td>
                    <td className="p-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewStudent(student.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewAssignments(student.id)}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Assignments
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditDetails(student.id)}>
                            <User className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
            </ScrollArea>
          </table>
        </div>
      </div>
    </div>
  );
};
