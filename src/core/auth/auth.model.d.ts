export interface claim{
    name: string;
    value: string;
}

export interface credentialsUser{
    username: string;
    password: string;
}

export interface responseAuth{
    token: string;
    expiration: Date;
}