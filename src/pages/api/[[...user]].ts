/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          const users = await retrieveData("users");
          const data = users.map((user: any) => {
            delete user.password;
            return user;
          });

          return res.status(200).json({
            status: true,
            statusCode: 200,
            message: "success",
            data: data,
          });
        } else {
          return res
            .status(403)
            .json({ status: false, statusCode: 403, message: "unauthorized" });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { data }: any = req.body;
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("users", user[1], data, (result: boolean) => {
            if (result) {
              return res
                .status(200)
                .json({ status: true, statusCode: 200, message: "success" });
            } else {
              return res
                .status(400)
                .json({ status: false, statusCode: 400, message: "failed" });
            }
          });
        } else {
          return res
            .status(403)
            .json({ status: false, statusCode: 400, message: "unauthorized" });
        }
      }
    );
  } else if (req.method === "DELETE") {
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteData("users", user[1], (result: boolean) => {
            if (result) {
              res
                .status(200)
                .json({ status: true, statusCode: 200, message: "success" });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, message: "failed" });
            }
          });
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, message: "unauthorized" });
        }
      }
    );
  } else {
    return res
      .status(405)
      .json({ status: true, statusCode: 405, message: "method not allowed" });
  }
}
