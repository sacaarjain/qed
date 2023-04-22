import Tesseract from 'tesseract.js';

export const recognize = () => {
    Tesseract.recognize(
        'https://optiic.dev/assets/images/samples/we-love-optiic.png',
        'eng',
      ).then(({ data: { text } }) => {
        console.log(text);
      })
}
