
import  request  from "@/utils/http";

export const getWordsAPI=()=> {
  return request({
    url: "/user/Menu",
    method: "get"
  });
}

export const changeRememberAPI=()=> {
  return request({
    url: "/user/Menu/recite",
    method: "get"
  });
}