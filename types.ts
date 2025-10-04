
export interface Course {
  id: number;
  title: string;
  description: string;
  author: string;
  price: number;
  lessons: number;
  level: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Moderado';
  imageUrl: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
}

export interface AppInfo {
  id: number;
  name: string;
  category: string;
  description: string;
  logo: React.ReactNode;
  website: string;
}