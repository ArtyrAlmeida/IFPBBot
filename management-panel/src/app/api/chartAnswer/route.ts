import { IChartAnswer } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";

import connectDb from "@/libs/database";
import ChartAnswer from "@/models/ChartAnswer";

const MEGABYTE_SIZE = 1024 * 1024;

const GET = async (req: NextRequest) => {
    try {
        await connectDb();
        const answers = await ChartAnswer.find({});
        console.log(answers);
        
        return NextResponse.json(answers, { status: 200 });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ message: "Não foi possível obter os dados" }, { status: 400 });
    }
}

const POST = async (req: NextRequest) => {
    try {
        await connectDb();
        const chartAnswer: FormData = await req.formData();
        const name =  await chartAnswer.get("name")
        const file: File | null = chartAnswer.get("data") as unknown as File;
        
        if (!file) return NextResponse.json({ message: "É necessário anexar uma imagem" }, { status: 400 });
        const contentType = file.type
        console.log(file.size)
        if (file.size >= (16 * MEGABYTE_SIZE)) return NextResponse.json({ message: "Imagem excede o limite de 16 megas" }, { status: 400 });
        if (!file.type.includes("image/"))     return NextResponse.json({ message: "O arquivo deve ser uma imagem" }, { status: 400 });
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const createdAnswer = await ChartAnswer.create({ name, data: buffer, contentType });
        
        return NextResponse.json({ data: createdAnswer }, { status: 201 });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ message: "Não foi possível realizar a criação" }, { status: 500 });
        
    }
}

const PATCH = async (req: NextRequest) => {
    try {
        await connectDb();
        const id = req.nextUrl.searchParams.get("id");
        if (!id) throw new Error();
        const chartAnswer: IChartAnswer = await req.json();

        const updatedAnswer = await ChartAnswer.updateOne({ _id: id }, { $set: chartAnswer });
        
        return NextResponse.json({ data: updatedAnswer }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Não foi possível realizar a criação" }, { status: 400 });
        
    }
}

const DELETE = async (req: NextRequest) => {
    try {
        await connectDb();
        const id = req.nextUrl.searchParams.get("id");
        if (!id) throw new Error();

        const deleteResult = await ChartAnswer.deleteOne({ _id: id });
        
        return NextResponse.json({ data: deleteResult }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Não foi possível realizar a criação" }, { status: 400 });
        
    }
}

export { GET, POST, PATCH, DELETE }