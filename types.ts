
export type ModuleId = 'intro-c' | 'cpu-arch' | 'assembly' | 'compiler-project';

export interface Module {
  id: ModuleId;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
