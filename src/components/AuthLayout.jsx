import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Account } from 'appwrite'; // Import Appwrite Account
import { Client } from 'appwrite'; // Import your Appwrite client

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const [user, setUser] = useState(null); // Store user data

    useEffect(() => {
        const account = new Account(Client);

        async function checkAuth() {
            try {
                const appwriteUser = await account.get(); // Get the current Appwrite user
                setUser(appwriteUser); // Set the user state
                if (authentication && !appwriteUser) { // Check if authentication is required and user is NOT logged in
                    navigate("/login");
                } else if (!authentication && appwriteUser) { // Check if authentication is NOT required and user IS logged in
                    navigate("/");
                }
            } catch (error) {
                console.error("Appwrite auth check error:", error);
                if (authentication) { // If authentication is required, redirect to login on any error
                    navigate("/login");
                }
            } finally {
                setLoader(false);
            }
        }

        checkAuth(); // Call the async function
    }, [navigate, authentication]);

    if (loader) {
        return <h1>Loading...</h1>;
    }

    if (!user && authentication) { // Handle the case where the user is not logged in even after the check
        return null; // or a specific "not logged in" message
    }

    return <>{children}</>;
}