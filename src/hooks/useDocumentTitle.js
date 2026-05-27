import { useEffect } from 'react';

/**
 * Custom hook to set the browser document title.
 * Appends the site name automatically.
 * @param {string} title — the page-specific title
 */
const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | ElectroFixers`;
    }, [title]);
};

export default useDocumentTitle;
