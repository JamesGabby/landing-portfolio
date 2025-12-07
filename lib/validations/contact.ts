export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
}

export const validateContactForm = (data: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (data.name.trim().length > 100) {
    errors.name = "Name must be less than 100 characters";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Company validation (optional but has max length)
  if (data.company && data.company.length > 100) {
    errors.company = "Company name must be less than 100 characters";
  }

  // Message validation
  if (!data.message || data.message.trim().length === 0) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  } else if (data.message.trim().length > 5000) {
    errors.message = "Message must be less than 5000 characters";
  }

  return errors;
};

export const hasErrors = (errors: ContactFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};