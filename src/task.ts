export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'completed';
    deadline: Date;
    userId: number; //ID of the user who created the task
}