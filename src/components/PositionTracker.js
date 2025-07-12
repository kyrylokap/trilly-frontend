import { useEffect } from "react";
import { sendPos } from "../services/positionService";

export const PositionTracker = () => {
    useEffect(() => {
        sendPos();
        const interval = setInterval(sendPos, 120000);
        return() => clearInterval(interval);
    }, []);
    return null;
}