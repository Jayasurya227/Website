import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const signature = req.headers.get("x-razorpay-signature");
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

        if (!signature) {
            return NextResponse.json({ error: "No signature" }, { status: 400 });
        }

        // Verify Webhook Signature
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(JSON.stringify(body))
            .digest("hex");

        if (signature !== expectedSignature) {
            console.error("[Webhook] Signature mismatch");
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        const { event, payload } = body;
        console.log(`[Webhook] Received event: ${event}`);

        if (event === "payment.captured") {
            const payment = payload.payment.entity;
            console.log(`[Webhook] Payment successful: ${payment.id} for ₹${payment.amount / 100}`);
            // TODO: Update your database here
        }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("[Webhook Error]:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}
