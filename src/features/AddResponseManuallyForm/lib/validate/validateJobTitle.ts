export const validateJobTitle = (jobTitle: string): boolean => {
    return jobTitle.trim().length > 4;
};