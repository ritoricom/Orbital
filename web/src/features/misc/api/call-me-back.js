import { API_URL } from "@/config/api";
export const callMeBack = async (payload) => {
  await fetch(`${API_URL}/api/call-me-back`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
