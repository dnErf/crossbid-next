"use client";

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { createAuctionAction } from "./actions";

export default CreatePage

function CreatePage() {
    let [date, setDate] = useState<Date|undefined>()
 
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <Input 
                    required
                    name="name"
                    placeholder="name your item"
                />
                <Input 
                    required
                    name="startingPrice"
                    type="number"
                    step="0.01"
                    placeholder="price to start your auction at"
                />
                <Input type="file" name="image" />
                <DatePicker date={date} setDate={setDate} />
                <Button type="submit">
                    post item
                </Button>
            </form>
        </main>
    )

    async function handleSubmit(ev) {
        ev.preventDefault()

        if (!date) return;

        let form = ev.currentTarget as HTMLFormElement
        let formData = new FormData(form)

        await createAuctionAction(formData)
    }
}