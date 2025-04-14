
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Calendar, ChevronDown } from "lucide-react";
import { AssignmentCard } from "@/components/Dashboard/AssignmentCard";
import { AssignmentSummary } from "@/types/class";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

interface AssignmentsTabProps {
  classId: string;
  assignments: AssignmentSummary[];
}

export const AssignmentsTab = ({ classId, assignments }: AssignmentsTabProps) => {
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  
  const activeAssignments = assignments.filter(a => a.status === "active");
  const completedAssignments = assignments.filter(a => a.status === "completed");
  
  // Filter completed assignments by date range if dates are selected
  const filteredCompletedAssignments = completedAssignments.filter(a => {
    if (!dateFrom && !dateTo) return true;
    
    const assignmentDate = new Date(a.date);
    
    if (dateFrom && dateTo) {
      return assignmentDate >= dateFrom && assignmentDate <= dateTo;
    }
    
    if (dateFrom && !dateTo) {
      return assignmentDate >= dateFrom;
    }
    
    if (!dateFrom && dateTo) {
      return assignmentDate <= dateTo;
    }
    
    return true;
  });
  
  const clearDateFilter = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
  };

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
          <ScrollArea className="w-full">
            <div className="pb-2 flex space-x-4" style={{ minWidth: "100%", overflowX: "auto" }}>
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
      
      {completedAssignments.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Completed</h2>
            <Popover>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        <Calendar className="h-4 w-4 mr-2" />
                        {dateFrom && dateTo 
                          ? `${format(dateFrom, "MMM d")} - ${format(dateTo, "MMM d")}` 
                          : dateFrom 
                            ? `From ${format(dateFrom, "MMM d")}` 
                            : dateTo 
                              ? `Until ${format(dateTo, "MMM d")}`
                              : "Filter by Date"}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filter assignments by date range</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="p-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">From Date</h4>
                    <CalendarComponent
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </div>
                  <div className="space-y-2 mt-4">
                    <h4 className="font-medium text-sm">To Date</h4>
                    <CalendarComponent
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button size="sm" variant="outline" onClick={clearDateFilter}>
                      Clear
                    </Button>
                    <Button size="sm" onClick={() => {}}>
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <ScrollArea className="w-full">
            <div className="pb-2 flex space-x-4" style={{ minWidth: "100%", overflowX: "auto" }}>
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
                  No assignments found for the selected date range
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
