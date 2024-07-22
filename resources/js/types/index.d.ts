

export type User = {
    id: string;
    name: string;
    email: string;
    // add other properties as needed
  };

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
