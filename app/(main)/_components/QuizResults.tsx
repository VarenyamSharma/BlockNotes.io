"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface QuizResultsProps {
  formId: Id<"forms">;
  hideTitle?: boolean;
}

export const QuizResults = ({ formId, hideTitle = false }: QuizResultsProps) => {
  const responses = useQuery(api.forms.getQuizResponses, { formId });

  const handleExport = () => {
    if (!responses || responses.length === 0) {
      toast.error("No responses to export.");
      return;
    }

    // Helper function to escape CSV values
    const escapeCsvValue = (value: string | number): string => {
      const str = String(value);
      // If value contains comma, quote, or newline, wrap in quotes and escape quotes
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,Name,Email,Score,Total\n";
    responses.forEach(res => {
      csvContent += `${escapeCsvValue(res.name)},${escapeCsvValue(res.email)},${res.score},${res.total}\n`;
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `quiz_responses_${formId}.csv`);
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);
    
    toast.success("Responses exported to CSV!");
  };

  if (responses === undefined) {
    return (
      <div className="mt-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className={hideTitle ? "text-center" : "mt-8 text-center"}>
        {!hideTitle && <h3 className="text-xl font-bold">Quiz Responses</h3>}
        <p className="text-muted-foreground mt-2">No one has taken your quiz yet.</p>
      </div>
    );
  }

  return (
    <div className={hideTitle ? "" : "mt-12"}>
      <div className="flex justify-between items-center mb-4">
        {!hideTitle && <h3 className="text-xl font-bold">Quiz Responses ({responses.length})</h3>}
        {hideTitle && <div className="text-sm text-muted-foreground">{responses.length} response{responses.length !== 1 ? 's' : ''}</div>}
        <Button variant="outline" size="sm" onClick={handleExport} className={hideTitle ? "ml-auto" : ""}>
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </Button>
      </div>
      
      {/* Responses Table */}
      <div className="rounded-md border">
        <div className="w-full overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Score</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {responses.map(res => (
                <tr key={res._id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{res.name}</td>
                  <td className="p-4 align-middle text-muted-foreground">{res.email}</td>
                  <td className="p-4 align-middle text-muted-foreground">{res.score} / {res.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

