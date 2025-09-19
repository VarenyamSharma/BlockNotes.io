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
 * Exports a given HTML element to a PDF file, applying temporary styles
 * to ensure compatibility with modern CSS color functions like oklch().
 * @param element The HTML element to capture.
 * @param fileName The desired name for the downloaded PDF file.
 */
export const exportToPdf = async (element: HTMLElement, fileName: string) => {
  const style = document.createElement('style');
  style.id = 'temp-pdf-styles';

  // HSL fallbacks for oklch colors used in globals.css.
  // This ensures html2canvas can render the colors correctly without
  // affecting the live application's styling.
  const cssOverrides = `
    :root {
      --background: hsl(0 0% 100%);
      --foreground: hsl(0 0% 14.5%);
      --card: hsl(0 0% 100%);
      --card-foreground: hsl(0 0% 14.5%);
      --popover: hsl(0 0% 100%);
      --popover-foreground: hsl(0 0% 14.5%);
      --primary: hsl(0 0% 20.5%);
      --primary-foreground: hsl(0 0% 98.5%);
      --secondary: hsl(0 0% 97%);
      --secondary-foreground: hsl(0 0% 20.5%);
      --muted: hsl(0 0% 97%);
      --muted-foreground: hsl(0 0% 55.6%);
      --accent: hsl(0 0% 97%);
      --accent-foreground: hsl(0 0% 20.5%);
      --destructive: hsl(8.6 87.5% 53.9%);
      --border: hsl(0 0% 92.2%);
      --input: hsl(0 0% 92.2%);
      --ring: hsl(0 0% 70.8%);
    }

    .dark {
      --background: hsl(0 0% 14.5%);
      --foreground: hsl(0 0% 98.5%);
      --card: hsl(0 0% 20.5%);
      --card-foreground: hsl(0 0% 98.5%);
      --popover: hsl(0 0% 20.5%);
      --popover-foreground: hsl(0 0% 98.5%);
      --primary: hsl(0 0% 92.2%);
      --primary-foreground: hsl(0 0% 20.5%);
      --secondary: hsl(0 0% 26.9%);
      --secondary-foreground: hsl(0 0% 98.5%);
      --muted: hsl(0 0% 26.9%);
      --muted-foreground: hsl(0 0% 70.8%);
      --accent: hsl(0 0% 26.9%);
      --accent-foreground: hsl(0 0% 98.5%);
      --destructive: hsl(4.6 78.9% 65.5%);
      --border: hsl(0 0% 100% / 0.1);
      --input: hsl(0 0% 100% / 0.15);
      --ring: hsl(0 0% 55.6%);
    }
  `;
  
  style.innerHTML = cssOverrides;
  document.head.appendChild(style);

  try {
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
      backgroundColor: null, // Use the element's background
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName.replace(/ /g, '_')}.pdf`);
  } finally {
    // Ensure temporary styles are always removed after the capture
    const tempStyle = document.getElementById('temp-pdf-styles');
    if (tempStyle) {
      document.head.removeChild(tempStyle);
    }
  }
};

