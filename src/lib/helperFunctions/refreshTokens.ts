/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { updateToken } from "./fetcher";
import { getUserToken, setUserToken } from "./tokenValidation";

let refreshTokenCountDown: NodeJS.Timer | null = null;

export function stopRefreshTokens() {
  if (!refreshTokenCountDown) return;
  clearInterval(refreshTokenCountDown);
}

export function refreshTokens() {
  console.warn(getUserToken());
  const user = getUserToken();
  if (!user) {
    stopRefreshTokens();
    return;
  }
  const expiry = user.refreshTokenExpiresIn - 2;
  refreshTokenCountDown = setInterval(() => {
    console.warn("set Interval");
    updateToken()
      .then((res) => {
        console.warn(res);
        setUserToken(res);
      })
      .catch(() => {
        stopRefreshTokens();
        // localStorage.clear();
        // location.reload();
      });
  }, (expiry - 2) * 1000);
}
