import CouponJs from 'couponjs';

const reference = new CouponJs();

export const generateReference = () => {
  const ref = reference.generate({
    format: 'xxxxxx',
    length: 4,
    prefix: 'KI',
    numberOfCoupons: 1,
    characterSet: {
      builtIn: ['CHARSET_ALPHA', 'CHARSET_DIGIT'],
    },
  });
  return ref;
};
