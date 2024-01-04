export interface Translation {
    frenchTranslation: string;
    englishTranslation: string;
  }
  
  class Word implements Translation {
    frenchTranslation: string;
    englishTranslation: string;
  
    constructor(frenchTranslation: string, englishTranslation: string) {
      this.frenchTranslation = frenchTranslation;
      this.englishTranslation = englishTranslation;
    }
  
    verify(answer: string): boolean {
      return answer.toLowerCase() === this.englishTranslation.toLowerCase();
    }
  }
  
 
  export default Word;
  