// Mapping of month numbers to Bengali month names
const bengaliMonths = [
    "জানুয়ারি",  // January
    "ফেব্রুয়ারি", // February
    "মার্চ",      // March
    "এপ্রিল",     // April
    "মে",         // May
    "জুন",        // June
    "জুলাই",      // July
    "অগাস্ট",     // August
    "সেপ্টেম্বর", // September
    "অক্টোবর",    // October
    "নভেম্বর",    // November
    "ডিসেম্বর"    // December
  ];

// Mapping of digits to Bengali numerals
const bengaliDigits = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};


// Function to convert English numerals to Bengali numerals
export function convertToBengaliNumerals(number) {
    return number.toString().split('').map(digit => bengaliDigits[digit]).join('');
}

// Function to convert date to Bengali format
export function convertToBengaliDate(dateStr) {
    // Parse the date string
    const date = new Date(dateStr);
    // // Extract year, month, and day
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // getMonth() returns month index (0-11), so we add 1
    const day = ('0' + date.getDate()).slice(-2); // getDate() returns the day of the month


    
    // Convert year, month, and day to Bengali numerals
    const bengaliYear = convertToBengaliNumerals(year);
    const bengaliDay = convertToBengaliNumerals(day);
    const bengaliMonth = bengaliMonths[month - 1];
    
    // Form the final date string
    const bengaliDateStr = `${bengaliDay} ${bengaliMonth}, ${bengaliYear}`;
    
    return bengaliDateStr;
}


export function convertToBanglaPhoneNumber(engNumber){
    if(engNumber){
        let enumber =  engNumber
        if(engNumber[0] !== '8'){
            enumber = '88'+engNumber;
        }
        return enumber.split('').map(digit => bengaliDigits[digit] || digit).join('');

    }
   

}
