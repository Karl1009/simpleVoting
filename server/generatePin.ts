export function generatePin () {
   const min = 0;
   const max = 9999;
   return ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);
 }
 