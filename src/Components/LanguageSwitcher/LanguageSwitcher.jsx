import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation(); // Destructure both i18n and t
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
        setDropdownVisible(false); // Hide dropdown after selection
    };

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className="language-switcher">
            <button onClick={toggleDropdown} className="language-button">
                {t('language.switch')}
            </button>
            {isDropdownVisible && (
                <select id="language-select" onChange={handleLanguageChange} defaultValue={i18n.language}>
                    <option value="en">{t('language.english')}</option>
                    <option value="es">{t('language.spanish')}</option>
                </select>
            )}
        </div>
    );
};

export default LanguageSwitcher;
