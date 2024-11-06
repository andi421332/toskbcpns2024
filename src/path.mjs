import timers from 'node:timers/promises'

 
 console.info(new Date());
 await  timers.setTimeout(5000);
 console.info(new Date());