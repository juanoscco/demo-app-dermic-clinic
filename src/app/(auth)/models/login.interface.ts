export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    jwt: string;
}

// Form
export interface LoginFormValues {
    username: string;
    password: string;
    // rememberMe: boolean;
}


export interface FormLoginProps {
    login: (values: LoginFormValues) => void;
    isLoading?: boolean;
    data: { jwt: string } | any;
    error: any;
}

// Hooks
export interface HooksProps {
    login: (values: LoginFormValues) => void;
    data: { jwt: string } | any;
}