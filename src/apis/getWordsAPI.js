import httpInstance from "@/utils/http";

export function getWords() {
  return httpInstance({
    url: "/Menu",
    method: "get"
  });
}
  