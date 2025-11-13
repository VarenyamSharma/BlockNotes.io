/**
 * Utility functions for working with BlockNote content
 */

type BlockNoteBlock = {
  id: string;
  type: string;
  content?: Array<{
    type: string;
    text?: string;
    [key: string]: any;
  }>;
  children?: BlockNoteBlock[];
  [key: string]: any;
};

/**
 * Extracts plain text from BlockNote JSON content
 * @param content - BlockNote content as JSON string or parsed object
 * @returns Plain text extracted from all blocks
 */
export function extractTextFromBlockNote(content: string | BlockNoteBlock[]): string {
  try {
    const blocks: BlockNoteBlock[] = typeof content === 'string' 
      ? JSON.parse(content) 
      : content;

    if (!Array.isArray(blocks)) {
      return '';
    }

    const extractTextFromBlock = (block: BlockNoteBlock): string => {
      let text = '';

      // Extract text from block content
      if (block.content && Array.isArray(block.content)) {
        block.content.forEach((item) => {
          if (item.text) {
            text += item.text + ' ';
          }
        });
      }

      // Recursively extract text from children
      if (block.children && Array.isArray(block.children)) {
        block.children.forEach((child) => {
          text += extractTextFromBlock(child) + ' ';
        });
      }

      return text.trim();
    };

    // Extract text from all blocks
    const allText = blocks
      .map(extractTextFromBlock)
      .filter(text => text.length > 0)
      .join('\n');

    return allText.trim();
  } catch (error) {
    console.error('Error extracting text from BlockNote content:', error);
    return '';
  }
}


