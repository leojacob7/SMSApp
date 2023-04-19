interface authType {
  email: string;
  password: string;
  confirm_password?: string;
}

export function validateSignInForm({
  email,
  password,
  confirm_password,
}: authType) {
  if (!email) {
    return 'Email is required';
  }

  if (email.length < 4) {
    return 'Email must be at least 4 characters long';
  }

  if (!password) {
    return 'Password is required';
  }

  if (confirm_password && confirm_password !== password) {
    return 'Passwords donot match';
  }

  if (password.length < 4) {
    return 'Password must be at least 4 characters long';
  }

  return '';
}
