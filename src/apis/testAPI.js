import  request  from "@/utils/http";

export const giveWordsListAPI=()=> {
    return request({
      url: "/user/Menu",
      method: "Post"
    });
  }