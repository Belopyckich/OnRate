/* eslint-disable no-useless-escape */
export const CONTENT_DISPOSITION_FILE_NAME_REGEXP =
    /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/;

export const EMAIL_VALIDATION_REGEXP =
    /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,10}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

export const EMAIL_VALIDATION_LEGAL_ENTITIES =
    /^(?!-)(?!.*-$)(?!_)[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,10}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

export const DECIMAL_VALIDATION_WITH_ONE_DECIMAL_PLACE_REGEXP =
    /^[0-9]{1,}(?:[.,][0-9])?\r?$/;

export const NUMBER_VALIDATION_REGEXP = /^[0-9]*[.,]?[0-9]+$/;

export const NO_TYPOGRAPHICAL_SYMBOLS_REGEXP =
    /^[^\\\!\@\#\№\$\;\%\:\^\?\&\*\=\+\{\}\[\]\/\_\.\,\>\<\~]*$/;

export const CHECK_IS_FLOAT_NUMBER =
    /([.]\w*?){2,}|^[.]|[\sa-zA-Zа-яА-яёЁ]|[\\\!\@\#\№\$\;\%\=\:\^\?\&\'\*\+\{\}\[\]\/\,\_\>\<\~\)\(\"\|\`\-]/;
