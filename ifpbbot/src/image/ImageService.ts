import { RequestHandler } from "express";
import ChartAnswer from "../models/ChartAnswerModel";

class ImageService {
    renderImage: RequestHandler = async (req, res) => {
        const _id = req.params.id;
        const flowChart = await ChartAnswer.findOne({ _id });
        
        if (!flowChart) return res.status(404).json({ message: "Nenhuma imagem encontrada com esse Id" })

        const buffer = flowChart.data;
            
        res.writeHead(200, {
            'Content-Type': flowChart.contentType,
            'Content-Length': buffer.length
        });
        
        res.end(buffer);
    }
}

export { ImageService }