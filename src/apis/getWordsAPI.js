
import  request  from "@/utils/http";

export const getWordsAPI=()=> {
  return request({
    url: "/Menu",
    method: "get"
  });
}

export const changeRememberAPI=()=> {
  return request({
    url: "/Menu/recite",
    method: "get"
  });
}