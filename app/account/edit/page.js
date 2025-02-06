"use client"

export default function Page({dataType}) {
    return <section className="container m-auto min-h-[75svh]">
        <h1 className="heading">Edit {dataType[0].toUpperCase() + dataType.substring(1, dataType.length)}</h1>
    </section>
}