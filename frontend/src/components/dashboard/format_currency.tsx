export const formatCurrency = (value: number) => {
    if (!value && value !== 0) return "$0";

    // If value is 1,000 (1,000k) or more, convert to Millions
    if (value >= 1000) {
        return `$${(value / 1000).toFixed(1)}M`;
    }

    // Otherwise keep it as k
    return `$${value.toLocaleString()}k`;
};