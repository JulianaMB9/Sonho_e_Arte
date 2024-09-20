/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";
import Cookies from "js-cookie";

const getCookie = (key) => {
  const cookie = Cookies.get(key);
  if (cookie) return cookie;
};

const setCookie = (key, value) => {
  const cookie = Cookies.set(key, value);
  if (cookie) return cookie;
};

const deleteCookie = (key, value) => {
  Cookies.remove(key);
  return true;
};

const exportedObject = { getCookie, setCookie, deleteCookie };

export default exportedObject;
