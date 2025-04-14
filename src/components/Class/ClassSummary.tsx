
import { Card, CardContent } from "@/components/ui/card";
import { ClassData } from "@/types/class";
import { Users, FileText, AlertCircle } from "lucide-react";

interface ClassSummaryProps {
  classData: ClassData;
}

export const ClassSummary = ({ classData }: ClassSummaryProps) => {
  const activeAssignments = classData.assignments.filter(a => a.status === "active").length;
  
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{classData.name}</h1>
            <div className="flex flex-wrap gap-x-4 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users size={16} />
                <span>{classData.students.length} Students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText size={16} />
                <span>{classData.assignments.length} Assignments</span>
              </div>
              {activeAssignments > 0 && (
                <div className="flex items-center gap-1.5 text-amber-600">
                  <AlertCircle size={16} />
                  <span>{activeAssignments} Active</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
