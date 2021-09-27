import axios from "axios";
import { ADDRESS } from "./address";

// 전체 요청 리스트 받기
export const getRequestListApi = async () => {
   try {
      const res = await axios.get(`${ADDRESS}/admin/NotRegistered`);
      return res.data;
   } catch (e) {
      throw e;
   }
};

// 요청 허가
export const approveRequestApi = async (id) => {
   try {
      await axios.post(`${ADDRESS}/product/register/permit`, { productId: id });
   } catch (e) {
      throw e;
   }
};

// 요청 거절
export const declineRequestApi = async () => {
   try {
   } catch (e) {
      throw e;
   }
};
