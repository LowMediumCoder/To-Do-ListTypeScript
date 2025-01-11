export interface Task {
    title: string;
    description: string;
    status: 'pending' | 'completed';
    deadline: Date;
    userId: string;
}