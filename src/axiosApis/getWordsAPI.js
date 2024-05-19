import httpInstance from "@/utils/http";

export function getWords() {
  return httpInstance({
    url: "/words",
    method: "get"
  });
}
  