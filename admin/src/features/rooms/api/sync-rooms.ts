import { API_URL } from "@/config/api";
import { getBearerAuthHeader, checkSuccess } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";

export const syncRooms = (): Promise<void> =>
  fetch(`${API_URL}/api/admin/rooms/sync`, {
    method: "POST",
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при синхронизации номеров"));
