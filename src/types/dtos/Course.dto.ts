interface Course {
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

// class Course {
//     @ValidateNested()
//     metadata: Metadata
// }

// class Metadata {
//     @isDate()
//     created_at: Date()
    
//     @isDate()
//     updated_at: Date()
// }