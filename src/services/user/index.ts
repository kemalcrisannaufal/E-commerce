/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/lib/axios/instance";

export const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUser: (id: string, data: any, token: string) =>
    instance.put(
      `/api/user/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteUser: (id: string, token: string) =>
    instance.delete(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProfile: (token: string) =>
    instance.get("/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateProfile: (data: any, token: string) =>
    instance.put(
      `/api/user/profile`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),

  getCart: (token: string) =>
    instance.get("/api/user/cart", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  addToCart: (token: string, data: any) =>
    instance.put(
      "/api/user/cart",
      { data },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
  updateCart: (token: string, data: any) =>
    instance.patch(
      `/api/user/cart`,
      { data },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
};
