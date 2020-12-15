interface RegisterRequestBody {
  mobileNumber: number;
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  mobileNumber: number;
  password: string;
}
