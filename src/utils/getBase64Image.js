import axios from "axios";

export const getBase64FromUrl = async (url) => {
   const data = await axios.get(url);
   const blob = await data.blob();
   console.log(blob);
   return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
         const base64data = reader.result;
         resolve(base64data);
      };
   });
};
