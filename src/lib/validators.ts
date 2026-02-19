// ==============================
// Campus Home — Field Validators
// ==============================

/** Returns an error string or null if valid */

export function validateEmail(email: string): string | null {
    if (!email.trim()) return "Email is required";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return "Enter a valid email address";
    return null;
}

export function validatePassword(password: string): string | null {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/\d/.test(password)) return "Password must contain at least one number";
    return null;
}

export function validateConfirmPassword(
    password: string,
    confirm: string,
): string | null {
    if (!confirm) return "Please confirm your password";
    if (password !== confirm) return "Passwords do not match";
    return null;
}

export function validateName(name: string, label = "Name"): string | null {
    if (!name.trim()) return `${label} is required`;
    if (name.trim().length < 2)
        return `${label} must be at least 2 characters`;
    return null;
}

/** Nigerian phone numbers: starts with 07x, 08x, or 09x — 11 digits */
export function validatePhone(phone: string): string | null {
    if (!phone.trim()) return "Phone number is required";
    const re = /^(07|08|09)\d{9}$/;
    if (!re.test(phone.replace(/\s+/g, "")))
        return "Enter a valid Nigerian phone number (e.g. 08012345678)";
    return null;
}
