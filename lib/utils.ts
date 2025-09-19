import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts the raw Convex id from a possibly slugged id like "<id>-title".
 */
export function sanitizeId(value?: string | string[] | null) {
  if (!value) return undefined;
  const id = Array.isArray(value) ? value[0] : value;
  if (typeof id !== 'string') return undefined;
  return id.includes('-') ? id.split('-')[0] : id;
}

/**
 * Exports a given HTML element to a PDF file.
 * @param element The HTML element to capture.
 * @param fileName The desired name for the downloaded PDF file.
 */
export const exportToPdf = async (element: HTMLElement, fileName: string) => {
  try {
    // Use html2canvas to render the element into a canvas.
    // Increasing the scale improves the resolution of the output PDF.
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
    });

    // Get the image data from the canvas in PNG format.
    const imgData = canvas.toDataURL('image/png');

    // Create a new jsPDF instance. The 'p' stands for portrait,
    // 'mm' for millimeters, and 'a4' for the paper size.
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    // Calculate the dimensions of the PDF page.
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the captured image to the PDF document.
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Trigger the download of the PDF file.
    pdf.save(`${fileName.replace(/ /g, '_')}.pdf`);
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    throw new Error("Failed to export note to PDF. Please try again.");
  }
};

