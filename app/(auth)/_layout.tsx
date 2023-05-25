import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "../../contexts/auth";

export default function Root() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}