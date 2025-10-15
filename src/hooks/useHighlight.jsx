import React from 'react';

/**
 * Custom hook để highlight text dựa trên keyword
 * Không phân biệt chữ hoa/thường và dấu tiếng Việt
 */
export const useHighlight = () => {
    // Hàm loại bỏ dấu tiếng Việt
    const removeVietnameseTones = (str) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    };

    /**
     * Hàm highlight text dựa trên keyword
     * @param {string} text - Text cần highlight
     * @param {string} keyword - Từ khóa để tìm và highlight
     * @param {string} highlightClass - CSS class cho phần highlight (optional)
     * @returns {React.ReactNode} - Text đã được highlight
     */
    const highlightText = (text, keyword, highlightClass = '') => {
        if (!text || !keyword || keyword.trim() === '') {
            return text || '';
        }

        const normalizedKeyword = removeVietnameseTones(keyword.toLowerCase());
        const normalizedText = removeVietnameseTones(String(text).toLowerCase());

        // Tìm tất cả vị trí match trong text đã normalize
        const matches = [];
        let startIndex = 0;

        while (startIndex < normalizedText.length) {
            const matchIndex = normalizedText.indexOf(normalizedKeyword, startIndex);
            if (matchIndex === -1) break;

            matches.push({
                start: matchIndex,
                end: matchIndex + normalizedKeyword.length
            });

            startIndex = matchIndex + 1;
        }

        if (matches.length === 0) {
            return text;
        }

        // Tạo các phần từ text gốc dựa trên vị trí match
        const result = [];
        let lastIndex = 0;

        matches.forEach((match, index) => {
            // Thêm phần text trước match
            if (match.start > lastIndex) {
                result.push(String(text).substring(lastIndex, match.start));
            }

            // Thêm phần match với highlight
            result.push(
                <mark key={index} className={highlightClass}>
                    {String(text).substring(match.start, match.end)}
                </mark>
            );

            lastIndex = match.end;
        });

        // Thêm phần text còn lại
        if (lastIndex < text.length) {
            result.push(String(text).substring(lastIndex));
        }

        return result;
    };

    return {
        highlightText,
        removeVietnameseTones
    };
};
