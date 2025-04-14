
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Calendar, Filter } from "lucide-react";
import { AssignmentCard } from "@/components/Dashboard/AssignmentCard";
import { AssignmentSummary } from "@/types/class";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssignmentsTabProps {
  classId: string;
  assignments: AssignmentSummary[];
}

export const AssignmentsTab = ({ classId, assignments }: AssignmentsTabProps) => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  
  const draftAssignments = assignments.filter(a => a.status === "draft");
  const activeAssignments = assignments.filter(a => a.status === "active");
  const completedAssignments = assignments.filter(a => a.status === "completed");
  
  // Filter completed assignments by month if a specific month is selected
  const filteredCompletedAssignments = selectedMonth === "all" 
    ? completedAssignments 
    : completedAssignments.filter(a => {
        const assignmentDate = new Date(a.date);
        return assignmentDate.toLocaleString('default', { month: 'long' }) === selectedMonth;
      });
  
  // Generate an array of months from the completed assignments
  const months = Array.from(
    new Set(
      completedAssignments.map(a => {
        const date = new Date(a.date);
        return date.toLocaleString('default', { month: 'long' });
      })
    )
  );

  return (
    <div className="space-y-6">
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
          <ScrollArea className="w-full pb-2 -mx-1 px-1">
            <div className="flex space-x-4 pb-4">
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
          </ScrollArea>
        </div>
      )}
      
      {draftAssignments.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Drafts</h2>
          <ScrollArea className="w-full pb-2 -mx-1 px-1">
            <div className="flex space-x-4 pb-4">
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
          </ScrollArea>
        </div>
      )}
      
      {completedAssignments.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Completed</h2>
            <Select
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            >
              <SelectTrigger className="w-[140px] h-8 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <ScrollArea className="w-full pb-2 -mx-1 px-1">
            <div className="flex space-x-4 pb-4">
              {filteredCompletedAssignments.map((assignment) => (
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
              {filteredCompletedAssignments.length === 0 && (
                <Card className="w-full p-6 text-center text-muted-foreground">
                  No assignments found for the selected month
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
      
      {assignments.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No assignments yet</h3>
          <p className="text-muted-foreground mb-6">Create your first assignment to get started</p>
          <Button onClick={() => navigate("/create-assignment")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        </div>
      )}
    </div>
  );
};
