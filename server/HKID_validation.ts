
export function isHKID_valid(HKID: string) {
   if (HKID.length === 8) {
        if(!isNaN(parseInt(HKID[0]))){   // when digit 1 is not a-Z
           return false;
        }else {
           let num = 0;
            for(let i = 1; i < HKID.length - 1; i++) {
               if(isNaN(parseInt(HKID[i]))){ // when digit 2 - 7 is not number
                  return false;
               }else{  
                  num += parseInt(HKID[i])*(8-i)
               }
            }
            const numsum = 36 * 9 + (HKID[0].toUpperCase().charCodeAt(0) - 55)* 8 + num
            if (11 - numsum % 11 === parseInt(HKID[7]) || 
               (numsum % 11 === 0 && 0 === parseInt(HKID[7]))||
               (numsum % 11 === 1 && "A" === HKID[7])){
               return true;
            }
            return false;
        }
   
   } else if (HKID.length === 9) {
      if(!isNaN(parseInt(HKID[0])) && !isNaN(parseInt(HKID[1]))){ // when digit 1 & 2 is not a-Z
         return false;
      }else {
         let num = 0;
         for(let i = 2; i < HKID.length -1; i ++) {
            if(isNaN(parseInt(HKID[i]))){ // when digit 3 - 8 is not number
               return false;
            }else{  
               num += parseInt(HKID[i])*(9-i)
            }
         }
         const numsum = (HKID[0].toUpperCase().charCodeAt(0) - 55)* 9 + (HKID[1].toUpperCase().charCodeAt(0) - 55)* 8 + num
            if (11 - numsum % 11 === parseInt(HKID[8]) || 
               (numsum % 11 === 0 && 0 === parseInt(HKID[8]))||
               (numsum % 11 === 1 && "A" === HKID[8])){
               return true;
            }
            return false;
      }
   }else {

      return false;
   }
 }

