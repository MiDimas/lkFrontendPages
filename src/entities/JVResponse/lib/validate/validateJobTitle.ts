export const validateJobTitle = (jobTitle: string, jobTitleCode: string|null=""): boolean => {
    return jobTitle.trim().length > 4 && !!jobTitleCode;
};