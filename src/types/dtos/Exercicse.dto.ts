interface ExerciseDto {
    id: number;
    metadata: {
        created_at: Date;
        updated_at: Date;
    },
    properties: {
        name: string;
        description: string;
        content: string;
    }
}