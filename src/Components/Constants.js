export const BASE_URL = "https://crmapi.sarvadhi.work/api/v1/"

export const getPriorityColor = (priority) => {
    switch (priority) {
        case 'low':
            return 'bg-green-100 text-green-600';
        case 'medium':
            return 'bg-orange-100 text-orange-600';
        case 'high':
            return 'bg-red-100 text-red-600';
        case 'none':
            return 'bg-gray-100 text-gray-600';
        default:
            return '';
    }
};