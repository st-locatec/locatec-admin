import axios from "axios";
import { ADDRESS } from "./address";

// 전체 리스트 받기
export const getWholeListApi = async () => {
   try {
      const res = await axios.get(`${ADDRESS}/admin/registered`);
      return res.data;
   } catch (e) {
      throw e;
   }
};

// 리스트 아이템 삭제
export const removeWholeListItemApi = async () => {
   try {
   } catch (e) {
      throw e;
   }
};

// 리스트 아이템 수정
export const updateWholeListItemApi = async (item) => {
   try {
     await axios.post(`${ADDRESS}/product/change`, item);
   } catch (e) {
      throw e;
   }
};

// 리스트 아이템 생성
export const createWholeListItemApi = async () => {
   try {
   } catch (e) {
      throw e;
   }
};
