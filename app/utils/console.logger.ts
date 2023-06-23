export const logger = {
  log: (obj: any) => {
    console.log(JSON.stringify(obj, null, 2));
  },
};
