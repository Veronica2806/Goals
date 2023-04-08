const defaultOptions: Intl.DateTimeFormatOptions = { hour12: false, year: "2-digit", month: "short", day: "numeric", hour: "numeric", minute: "numeric" };

export default function convertDate(dateString: string, options: Intl.DateTimeFormatOptions = defaultOptions) {
    try {
        const date = new Date(dateString);
        const convertedDate = date.toLocaleString('en-US', options);

        return convertedDate;
    }
    catch (error) {
        throw new Error(error);
    }
}