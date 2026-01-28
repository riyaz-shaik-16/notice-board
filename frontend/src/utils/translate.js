import axiosInstance from "@/api/axios";

export async function translateToTelugu(text) {
  const res = await axiosInstance.post("/api/translate/te", {
    text,
  });

  return res.data.translatedText;
}
