import axios from "axios";
import { ADDRESS } from "./address";

// 전체 리스트 받기
export const getWholeListApi = async () => {
   try {
      const res = await axios.get(`${ADDRESS}/product/find/registered`);
      return res.data;
   } catch (e) {
      throw e;
   }
};

// 리스트 아이템 삭제
export const removeWholeListItemApi = async (id) => {
   try {
      await axios.post(`${ADDRESS}/admin/delete`, { productId: id });
   } catch (e) {
      throw e;
   }
};

// 리스트 아이템 수정
export const updateWholeListItemApi = async (item) => {
   try {
      await axios.post(`${ADDRESS}/admin/change`, item);
   } catch (e) {
      throw e;
   }
};

// 리스트 아이템 생성
export const createWholeListItemApi = async (item) => {
   try {
      await axios.post(`${ADDRESS}/admin/register`, item);
   } catch (e) {
      throw e;
   }
};
