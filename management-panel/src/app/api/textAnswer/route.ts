import { ITextAnswer } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";

import connectDb from "@/libs/database";
import TextAnswer from "@/models/TextAnswer";

const GET = async (req: NextRequest) => {
    try {
        await connectDb();
        const answers = await TextAnswer.find({});
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
        const textAnswer: ITextAnswer = await req.json();

        const createdAnswer = await TextAnswer.create(textAnswer);
        
        return NextResponse.json({ data: createdAnswer }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Não foi possível realizar a criação" }, { status: 400 });
        
    }
}

const PATCH = async (req: NextRequest) => {
    try {
        await connectDb();
        const id = req.nextUrl.searchParams.get("id");
        if (!id) throw new Error();
        const textAnswer: ITextAnswer = await req.json();

        const updatedAnswer = await TextAnswer.updateOne({ _id: id }, { $set: textAnswer });
        
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

        const deleteResult = await TextAnswer.deleteOne({ _id: id });
        
        return NextResponse.json({ data: deleteResult }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Não foi possível realizar a criação" }, { status: 400 });
        
    }
}

export { GET, POST, PATCH, DELETE }