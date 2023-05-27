import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../../contexts/auth";

export default function AuthLayout() {
    return (
        <AuthProvider>
            <Stack />
        </AuthProvider>
    );
}