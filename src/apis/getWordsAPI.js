import httpInstance from "@/utils/http";

export function getWords() {
  return httpInstance({
    url: "/user/Menu",
    method: "get"
  });
}
  