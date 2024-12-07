import { Request, Response } from "express";
import path from "path";

export const homePage = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'index.htm'));
}