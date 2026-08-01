import React, { createContext, useContext } from "react";
import baseUrl from "../../utils";
const SendEmailContext = createContext();
export const useSendEmail = () => useContext(SendEmailContext);
export function SendEmailProvider({ children }) {
  const request = async (path, body) => { const response = await fetch(`${baseUrl}${path}`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || data.errors?.[0]?.msg || "Request failed"); return data; };
  return <SendEmailContext.Provider value={{ sendEmail: email => request("/api/auth/userverification", {email}), updatePassword: (email,password,code) => request("/api/auth/updatepassword", {email,password,code}) }}>{children}</SendEmailContext.Provider>;
}
