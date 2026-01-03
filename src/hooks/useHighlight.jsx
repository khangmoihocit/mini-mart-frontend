import React from 'react';

export const useHighlight = () => {
    const removeVietnameseTones = (str) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    };

   
    const highlightText = (text, keyword, highlightClass = '') => {
        if (!text || !keyword || keyword.trim() === '') {
            return text || '';
        }

        const normalizedKeyword = removeVietnameseTones(keyword.toLowerCase());
        const normalizedText = removeVietnameseTones(String(text).toLowerCase());

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

        const result = [];
        let lastIndex = 0;

        matches.forEach((match, index) => {
            if (match.start > lastIndex) {
                result.push(String(text).substring(lastIndex, match.start));
            }
            result.push(
                <mark key={index} className={highlightClass}>
                    {String(text).substring(match.start, match.end)}
                </mark>
            );

            lastIndex = match.end;
        });

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
